import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import banner from "../../assets/banner.png";
import profile from "../../assets/profile-2.png";
import { useAuthedProfile } from "../../context/UserContext";
import Link from "next/link";
import axios from "axios";
import Username from "./Username";
import Bio from "./Bio";
import Router from "next/router";
import router from "next/router";
import AdminLoginButton from "./AdminLoginButton";
import Banner from "./Banner";
import AcceptOfferModal from "./AcceptOfferModal";
import ButtonSpinner from "../LoadingSkeletons/ButtonSpinner";
import { ethers } from "ethers";
import { ContractAbi, ContractAddress } from "../utils/constants";
import ipfs from "../utils/Ipfs";
import SavedNfts from "./SavedNfts";
import ProfileImage from "./ProfileImage";
import NFTCardSkeleton from "../LoadingSkeletons/NFTCardSkeleton";
import { list } from "@material-tailwind/react";
import Countdown from "react-countdown";
import EnlargeCollectedNft from "./EnlargeCollectedNft";

type Props = {
  cropperOpen: boolean;
  img: any;
  croppedImg: string | StaticImageData;
};

const ProfileComponent = ({
  user,
  collectedNfts,
  listedNfts,
  soldNfts,
  offers,
  users,
  listings,
  isLoading,
}: any) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingOffer, setLoadingOffer] = React.useState<boolean>(false);
  const [editor, setEditor] = React.useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalNftIndex, setModalNftIndex] = useState<number>(0);
  const [authedProfile, setAuthedProfile] = useState<any>(user);
  const [modalOpenEnlargeNFT, setModalOpenEnlargeNFT] = useState(false);
  // const { setAuthedProfile } = useAuthedProfile();

  let { isArtist } = authedProfile;

  // Rehydrate data from server
  const refreshData = () => {
    router.replace(router.asPath);
    setLoading(false);
  };

  useEffect(() => {
    const { savedNfts } = authedProfile;
    function findObjectsNotInBoth(arr1: any, arr2: any): void {
      const idsArr1 = arr1.map((obj: any) => obj.title);
      const idsArr2 = arr2.map((obj: any) => obj.title);

      // const idsNotInArr1 = idsArr2.filter(
      //   (title: any) => !idsArr1.includes(title)
      // );

      const idsNotInArr2 = idsArr1.filter(
        (title: any) => !idsArr2.includes(title)
      );

      const objectsNotInArr2 = arr1.filter((obj: any) =>
        idsNotInArr2.includes(obj.title)
      );

      return objectsNotInArr2;
    }
    if (isLoading || !savedNfts || !listings) {
      return;
    } else {
      const objectsNotInBoth: any = findObjectsNotInBoth(savedNfts, listings);
      if (objectsNotInBoth.length) {
        // console.log(objectsNotInBoth);

        const data = {
          nft: objectsNotInBoth[0],
          address: authedProfile.address,
        };
        console.log(data.nft);
        console.log(listings);
        console.log(savedNfts);

        axios
          .put("/api/saveNft", data)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [isLoading]);
  const deleteSavedNft = (nft: any) => {
    const data = {
      nft: nft,
      address: authedProfile.address,
    };
    axios.put("/api/saveNft", data).then((res) => {
      console.log(res.data);
      setAuthedProfile(res.data);
      // refreshData();
    });
  };

  const [picture, setPicture] = useState<Props>({
    cropperOpen: false,
    img: null,
    croppedImg: profile,
  });
  const [bannerPicture, setBannerPicture] = useState<Props>({
    cropperOpen: false,
    img: null,
    croppedImg: banner,
  });
  const [file, setFile] = useState<any>(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);

      setPicture({
        ...picture,
        img: url,
      });
      setFile(file);
    }
  };
  const handleOpenCropper = () => {
    setPicture({
      ...picture,

      cropperOpen: true,
    });
  };

  const uploadToIpfs = async (image: any) => {
    setLoading(true);
    if (image == picture) {
      const { cid } = await ipfs.add(file);
      const uploadUrl = `https://ipfs.io/ipfs/${cid.toString()}`;

      if (uploadUrl) {
        axios
          .post("/api/updateProfile", {
            address: authedProfile.address,
            imgUrl: uploadUrl,
          })
          .then(async (response) => {
            setAuthedProfile(response.data);
            refreshData();
          })
          .catch((err: any) => {
            console.log(err);
          })
          .finally(() => setLoading(false));
      }
    } else if (image == bannerPicture) {
      const { cid } = await ipfs.add(file);
      const bannerUploadUrl = `https://ipfs.io/ipfs/${cid.toString()}`;

      if (bannerUploadUrl) {
        axios
          .post("/api/updateProfile", {
            address: authedProfile.address,
            bannerImgUrl: bannerUploadUrl,
          })
          .then((response) => {
            setAuthedProfile(response.data);
            refreshData();
          })
          .catch((err: any) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  const accept = async (nftId: number, highestBidder: any) => {
    setLoadingOffer(true);
    try {
      if (typeof window !== "undefined") {
        const provider = new ethers.providers.Web3Provider(
          (window as CustomWindow).ethereum as any
        );
        await (window as CustomWindow)?.ethereum?.request({
          method: "eth_requestAccounts",
        });
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          ContractAddress,
          ContractAbi,
          signer
        );
        // Call the contract method with value
        const listingTx = await contract.acceptOffer(nftId, highestBidder);
        console.log("listingTx", listingTx);
        await listingTx.wait();

        setLoadingOffer(false);
        isModalClosed();
      }
    } catch (error) {
      console.error(error);
      alert(error);
      setLoadingOffer(false);
    }
  };

  const hasOfferForNft = (nftId: any) => {
    let hasOffer = false;
    offers.forEach((offer: any) => {
      offer.forEach((nftInfo: any) => {
        if (nftInfo.nftId === nftId) {
          hasOffer = true;
        }
      });
    });
    return hasOffer;
  };
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a complete state
      return null;
    } else {
      // Render a countdown
      return (
        <span>
          Ends In <span className="mr-4" /> {hours < 10 ? "0" + hours : hours}H{" "}
          {minutes < 10 ? "0" + minutes : minutes}M{" "}
          {seconds < 10 ? "0" + seconds : seconds}S
        </span>
      );
    }
  };

  const isModalClosed = () => {
    setModalOpen(false);
  };
  const isModalOpen = (index: number) => {
    setModalNftIndex(index);
    setModalOpen(true);
  };

  // Modal Enlarge NFT
  const isModalOpenEnlargeNFT = (index: number) => {
    setModalOpenEnlargeNFT(true);
    setModalNftIndex(index);
  };
  const isModalClosedEnlargeNFT = () => {
    setModalOpenEnlargeNFT(false);
  };

  return (
    <>
      <div
        className={`flex flex-col w-full max-w-[1590px]  px-4 md:px-3 lg:px-6 mt-20 md:mt-24  bg-black overflow-hidden ${
          loading && `cursor-progress`
        }`}
      >
        <div className="flex flex-col w-full overflow-hidden font-ibmPlex ">
          <Banner
            authedProfile={authedProfile}
            setBannerPicture={setBannerPicture}
            bannerPicture={bannerPicture}
            handleFileChange={handleFileChange}
            setEditor={setEditor}
            setFile={setFile}
            uploadToIpfs={uploadToIpfs}
          />
          <ProfileImage
            authedProfile={authedProfile}
            picture={picture}
            setPicture={setPicture}
            handleFileChange={handleFileChange}
            setEditor={setEditor}
            setFile={setFile}
            uploadToIpfs={uploadToIpfs}
            handleOpenCropper={handleOpenCropper}
            isArtist={isArtist}
          />
          {/* <UploadComponent /> */}
          <div className="flex flex-col w-full mt-4 text-left text-xs">
            {/* Username */}
            <Username
              authedProfile={authedProfile}
              loading={loading}
              setLoading={setLoading}
            />
            <Bio
              authedProfile={authedProfile}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
          {authedProfile?.admin ? (
            <AdminLoginButton authedProfile={authedProfile} />
          ) : null}
          {isArtist ? ( // if artist
            isLoading ? (
              <>
                <div className="flex  flex-col-reverse md:flex-col">
                  <div className="flex md:mt-5 h-full flex-wrap">
                    <ButtonSpinner />
                  </div>
                </div>
                <div className="flex overflow-hidden md:w-[60%]">
                  <Link
                    href="/profile/mint"
                    className=" text-green font-xCompressed w-full  font-bold border border-green tracking-[10px] md:tracking-[12px] lg:w-[40%] mt-8 mb-5 md:my-10 bg-white bg-opacity-20 hover:bg-opacity-40 py-1 lg:py-[1.2vh] text-2xl  "
                  >
                    LIST NEW
                  </Link>
                </div>{" "}
              </>
            ) : (
              <div className="flex  flex-col-reverse md:flex-col">
                <div className="flex md:mt-5 h-full flex-wrap">
                  <div className="flex flex-col mr-10 w-16">
                    <h1 className="text-green font-xxCompressed -mb-2 text-8xl  lg:text-9xl text-center">
                      {listedNfts?.length}
                    </h1>
                    <p className="text-xs">
                      TOTAL
                      <br /> LISTED
                    </p>
                  </div>
                  <div className="flex flex-col mr-10 w-16">
                    <h1 className="text-green font-xxCompressed -mb-2 text-8xl lg:text-9xl text-center">
                      {soldNfts?.length}
                    </h1>
                    <p className="text-xs">
                      TOTAL
                      <br /> SOLD
                    </p>
                  </div>
                  <div className="flex grow md:hidden"></div>

                  <div className="flex flex-col items-end md:items-center mr-2 md:mr-10 w-16">
                    <h1 className="text-green font-xxCompressed -mb-2 text-8xl lg:text-9xl text-center">
                      0.0
                    </h1>
                    <p className="text-xs">
                      PROFIT
                      <br /> IN ETH
                    </p>
                  </div>
                  <div className="basis-full h-0"></div>
                  <div className="flex flex-col mr-10 w-16">
                    <h1 className="text-green font-xxCompressed -mb-2 text-8xl lg:text-9xl text-center">
                      {collectedNfts?.length}
                    </h1>

                    <p className="text-xs">
                      TOTAL
                      <br /> COLLECTED
                    </p>
                  </div>
                  <div className="flex flex-col mr-10 w-16">
                    <h1 className="text-green font-xxCompressed -mb-2 text-8xl lg:text-9xl text-center">
                      0
                    </h1>
                    <p className="text-xs">
                      TOTAL
                      <br /> FLIPPED
                    </p>
                  </div>
                  <div className="flex grow md:hidden"></div>
                  <div className="flex flex-col mr-2 md:mr-10 w-16 items-end md:items-center">
                    <h1 className="text-green font-xxCompressed -mb-2 text-8xl lg:text-9xl text-center">
                      0.0
                    </h1>
                    <p className="text-xs">
                      P/L
                      <br /> IN ETH
                    </p>
                  </div>
                </div>
                <div className="flex overflow-hidden md:w-[60%]">
                  <Link
                    href="/profile/mint"
                    className=" text-green font-xCompressed w-full  font-bold border border-green tracking-[10px] md:tracking-[12px] lg:w-[40%] mt-8 mb-5 md:my-10 bg-white bg-opacity-20 hover:bg-opacity-40 py-1 lg:py-[1.2vh] text-2xl  "
                  >
                    LIST NEW
                  </Link>
                </div>{" "}
              </div>
            )
          ) : null}
          {isLoading || !listings ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:mx-5 mb-10">
              <NFTCardSkeleton />

              <NFTCardSkeleton />

              <NFTCardSkeleton />
            </div>
          ) : (
            <div className="flex flex-col font-ibmPlex mt-10 md:mt-4 text-left">
              {isArtist ? (
                <>
                  <h3 className="font-bold">LISTED</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4  items-stretch gap-10 md:gap-4 mb-10 mt-4">
                    {/* Listed  */}
                    {listedNfts?.length ? (
                      listedNfts.map(
                        (nft: any, index: React.Key | null | undefined) => (
                          <div
                            className="flex md: flex-col h-full items-start w-max "
                            key={index}
                          >
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                Router.push({
                                  pathname: `/listing/${nft.id}`,
                                });
                              }}
                            >
                              <Image
                                src={nft.image}
                                alt="nft7"
                                width={150}
                                height={200}
                                className="max-h-[220px] md:max-h-[300px] w-[41vw] md:w-full md:min-w-[230px] mb-2 object-cover"
                              />{" "}
                            </div>
                            <div className="flex flex-col w-full md:min-w-[230px] font-ibmPlex mb-4 uppercase text-xs text-[#e4e8eb] ">
                              <div className=" flex ">
                                <div className=" flex font-bold text-green font-ibmPlex justify-center uppercase">
                                  {nft.timeElapse ? (
                                    <>
                                      <p>Auction ended claim your eth</p>
                                    </>
                                  ) : (
                                    <>
                                      {nft.endTime != 0 || nft.endTime != "" ? (
                                        <Countdown
                                          date={Date.now() + nft.endTime * 1000}
                                          renderer={renderer}
                                        />
                                      ) : nft.bid ? (
                                        <p>Auction in progress</p>
                                      ) : (
                                        <p>Reserve NOt met</p>
                                      )}
                                    </>
                                  )}
                                </div>{" "}
                                <div className=" flex w-full"> </div>
                              </div>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <p className="text-red-600 text-xs">
                        You currently have no listed items
                      </p>
                    )}
                  </div>
                  {/* SOLD */}
                  <div className="flex flex-col">
                    <h3 className="font-bold">SOLD</h3>

                    <div className="grid grid-cols-2 lg:grid-cols-4 items-stretch gap-4 mb-10 mt-4">
                      {/* nft 1 */}
                      {soldNfts?.length ? (
                        soldNfts?.map(
                          (nft: any, index: React.Key | null | undefined) => (
                            <div
                              className="grid grid-cols-2 lg:grid-cols-4 items-stretch gap-4 mb-10 mt-4"
                              key={index}
                            >
                              <div className="flex  flex-col h-full items-start w-auto ">
                                <div
                                  className="cursor-pointer"
                                  // onClick={() => {
                                  //   Router.push({
                                  //     pathname: `/user/${router.query.slug}/${nft.id}`,
                                  //   });
                                  // }}
                                >
                                  <Image
                                    src={nft.image}
                                    alt="nft7"
                                    width={150}
                                    height={200}
                                    className="max-h-[220px] md:max-h-[300px] w-[41vw] md:w-full md:min-w-[230px] mb-2 object-cover"
                                  />{" "}
                                </div>
                                <div className="flex flex-col w-full md:min-w-[230px] font-ibmPlex mb-4 uppercase text-xs text-[#e4e8eb] ">
                                  <div className=" flex ">
                                    <div className=" flex w-full">
                                      {" "}
                                      <p className="pr-6 ">
                                        Sold <br /> For
                                      </p>
                                      <div className="flex grow"></div>
                                      <p className="font-bold text-green">
                                        {nft.price} <br /> ETH
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <p className="text-red-600 text-xs">
                          You currently have no saved items
                        </p>
                      )}
                    </div>
                  </div>
                </>
              ) : null}
              {/* COLLECTION */}
              <div className="flex flex-col">
                <h3 className="font-bold">COLLECTION</h3>

                <div className="grid grid-cols-2 lg:grid-cols-4 items-stretch gap-4 mb-10 mt-4">
                  {collectedNfts?.length ? (
                    collectedNfts.map((nft: any, index: number) => (
                      <div key={nft.id}>
                        <div
                          className="grid grid-cols-2 lg:grid-cols-4 items-stretch gap-4 mb-10 mt-4"
                          key={index}
                        >
                          <div className="flex  flex-col h-full items-start w-auto ">
                            <div
                              className="cursor-pointer"
                              onClick={() => isModalOpenEnlargeNFT(index)}
                            >
                              <Image
                                src={nft.image}
                                alt="nft7"
                                width={150}
                                height={200}
                                className="max-h-[220px] md:max-h-[300px] w-[41vw] md:w-full md:min-w-[230px] mb-2 object-cover"
                              />{" "}
                            </div>
                            <div className="flex flex-col w-full md:min-w-[230px] font-ibmPlex mb-4 uppercase text-xs text-[#e4e8eb] ">
                              <div className=" flex ">
                                <div className=" flex w-full">
                                  {" "}
                                  <p className="pr-6 ">
                                    Bought <br /> For
                                  </p>
                                  <div className="flex grow"></div>
                                  <p className="font-bold text-green">
                                    {nft.price} <br /> ETH
                                  </p>
                                </div>
                              </div>
                              {hasOfferForNft(nft.id) ? (
                                <button
                                  className="text-green font-compressed uppercase  tracking-[4px] w-[100%] my-2 bg-white bg-opacity-0 hover:bg-opacity-20 font-semibold text-xl"
                                  onClick={() => isModalOpen(index)}
                                >
                                  New offer
                                </button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-red-600 text-xs">
                      You currently have no collected items
                    </p>
                  )}
                </div>
              </div>

              {/* SAVED */}

              <div className="flex flex-col">
                <h3 className="font-bold">SAVED</h3>

                <div className="grid grid-cols-2 lg:grid-cols-4 items-stretch gap-4 mb-10 mt-4">
                  {authedProfile?.savedNfts.length ? (
                    authedProfile?.savedNfts.map((nft: any) => (
                      <div
                        key={nft.id}
                        className="flex  flex-col h-full items-start w-max "
                      >
                        <SavedNfts
                          nft={nft}
                          users={users}
                          deleteSavedNft={deleteSavedNft}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-red-600 text-xs">
                      You currently have no saved items
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isLoading ? null : (
        <AcceptOfferModal
          modalOpen={modalOpen}
          isModalClosed={isModalClosed}
          collectedNfts={collectedNfts}
          accept={accept}
          nftModalIndex={modalNftIndex}
          offers={offers}
          loadingOffer={loadingOffer}
        />
      )}
      <EnlargeCollectedNft
        isModalClosedEnlargeNFT={isModalClosedEnlargeNFT}
        modalOpenEnlargeNFT={modalOpenEnlargeNFT}
        collectedNfts={collectedNfts}
        nftModalIndex={modalNftIndex}
      />
    </>
  );
};

export default ProfileComponent;
