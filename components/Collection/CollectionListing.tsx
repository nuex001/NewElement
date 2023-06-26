import {
  MediaRenderer,
  useNetwork,
  useNetworkMismatch,
  useListing,
  useContract,
  useActiveListings,
} from "@thirdweb-dev/react";
import {
  ChainId,
  ListingType,
  Marketplace,
  NATIVE_TOKENS,
} from "@thirdweb-dev/sdk";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState ,useEffect} from "react";
import { marketplaceContractAddress } from "../../addresses";
import Router from "next/router";
import profile from "../../assets/PROFILE.png";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { ethers } from "ethers"
import { ContractAbi, ContractAddress } from "../utils/constants";
import { fetchListing } from "../utils/utils";

import Link from "next/link";
import CollectionListingCard from "./CollectionListingCard";
import CollPlaceBidModal from "./CollPlaceBidModal";
import CollEnlargeNFTModal from "./CollEnlargeNFTModal";

type Props = {
  listing: any;
};

const CollectionListing = (props: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOpenEnlargeNFT, setModalOpenEnlargeNFT] =
    useState<boolean>(false);
  const [bidAmount, setBidAmount] = useState<string>("");
  // Hooks to detect user is on the right network and switch them if they are not
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();


  const [listings, setListings] = useState(null);

  const router = useRouter();
  const { collectionId } = router.query as { collectionId: string };
  const listing = {
    metadata: {
      name: "Summer",
      description: "Summer",
      image:
        "https://ipfs-2.thirdwebcdn.com/ipfs/QmUa1iYsovhEPscsx79zWNK9bH7GBH61H2rbhpv9zKeHNC/collection1.png",
      external_url: "",
      background_color: "",
    },
    assetContractAddress: "0x8a4b29d9921C5Da3C737e63a6B334C4867BfF31E",
    currencyContractAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    id: "0",

    sellerAddress: "0x2E1b9630fB5b099625d45d8f7f4B382e49393394",

    type: 0,
  };
  // Modal Place Bid
  const isModalOpen = () => {
    setModalOpen(true);
  };
  const isModalClosed = () => {
    setModalOpen(false);
  };

  // Modal Enlarge NFT
  const isModalOpenEnlargeNFT = () => {
    setModalOpenEnlargeNFT(true);
  };
  const isModalClosedEnlargeNFT = () => {
    setModalOpenEnlargeNFT(false);
  };

  const fetchlisting = async () => {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum as any
    );

    if (collectionId) {
      await window?.ethereum?.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();

      const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);
      const id = Number(collectionId);
      const listingTx = await contract.fetchNFT(id);
      // console.log(listingTx)
      const res = await contract.fetchCollection(id);
      console.log(res);
      // making a function to get both the collection data and nfts

      // setListings(res);
      // setloadingListing(false);
      //  setLoadingListings(false);
      //  console.log(res);
      //  setMenuItems(res);
    }
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchlisting();
    }
  }, []);
  //  if (loadingListing) {
  //    return (
  //      <div className={`font-ibmPlex ${styles.loadingOrError}`}>Loading...</div>
  //    );
  //  }

  //  if (!listing) {
  //    return (
  //      <div className={`font-ibmPlex ${styles.loadingOrError}`}>
  //        Listing not found
  //      </div>
  //    );
  //  }
  return (
    <>
      <div className="flex flex-col realtive h-full items-center container lg:w-[98dvw]  mt-[6.5rem]  overflow-x-hidden justify-between">
        <div className="flex justify-center realtive w-full md:w-3/4">
          {/* <div className="absolute translate-x-[100%] lg:translate-x-1 lg:right-[70%] xl:translate-x-0 xl:right-1/2  left-0 hidden md:block ">
            <Link
              href="/"
              className="font-ibmPlex cursor-pointer uppercase font-bold text-green text-xs z-1 absolute translate-x-[100%] lg:translate-x-1 lg:right-[70%] xl:translate-x-0 xl:right-1/2  left-0 hidden md:block -z-10"
            >
              {"<<<"} Back
            </Link>
          </div> */}
          <div className="flex flex-col h-full items-center justify-center">
            <div className="flex flex-col h-full items-center justify-center font-ibmPlex">
              <Image
                src={listing?.metadata.image as string}
                alt={listing?.metadata.name as string}
                width={400}
                height={600}
                className="w-full max-w-[250px] mt-4 object-contain cursor-pointer rounded-[200px]"
                // onClick={isModalOpenEnlargeNFT}
              />{" "}
              <h1 className="italic mt-2 text-xl">SUMMER</h1>
              <div className="flex text-xs mt-2">
                COLLECTION BY{" "}
                <div
                  onClick={() => {
                    Router.push({
                      pathname: `/user/1`,
                    });
                  }}
                  className="font-bold pl-2 flex cursor-pointer"
                >
                  <p> @RODRI</p>
                  <Image
                    className="ml-3 h-5"
                    src={profile}
                    height={10}
                    width={20}
                    alt={""}
                  />
                </div>
              </div>
            </div>
            <div className="font-ibmPlex bold text-center w-full   mt-10 pb-10  leading-5 text-xs">
              <p className="mx-4 md:mx-0">
                I painted The Red Man at what I like to think was perhaps the
                end of an artistic era, and the beginning of a new one--one that
                I had no idea was even emerging. For years, I had held my idols
                close to my heart, painting step by step after them. The Red Man
                was the first time I let go, and held on to myself instead. This
                was a painting of grace. One that it felt the universe helped me
                make. I had just turned 20, my life a blur (I had no money), but
                the day I posted this on Twitter, the painting garnering
                millions of views and my life changed forever. People ask me a
                lot, &apos;What inspired the painting?&apos; and I smile and
                respond, &apos;Life.&apos; This was a distillation of everything
                I had known and learnt in these years. All my pain, my tears, my
                laughs and my joys. It&apos;s a painting I&apos;m very proud of.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-14 sm:mx-8 mb-10">
              <CollectionListingCard
                isModalOpenEnlargeNFT={isModalOpenEnlargeNFT}
                isModalOpen={isModalOpen}
                listing={listing}
              />
              <CollectionListingCard
                isModalOpenEnlargeNFT={isModalOpenEnlargeNFT}
                isModalOpen={isModalOpen}
                listing={listing}
              />
            </div>
            <div className="flex w-full mt-6 mb-10 font-ibmPlex border-t pt-5 text-xs px-4 pd:mx-0">
              <div className="flex flex-1/2 flex-col w-1/2 items-start">
                <button className="text-green mb-4">
                  SHARE AND EARN 1% {">>"}
                </button>
                <button className="mb-4">VIEW ON ETHERSCAN {">"}</button>
                <button className="mb-4">VIEW METADATA {">"}</button>
                <button className="mb-4">VIEW ON IPFS {">"}</button>
              </div>
              <div className="flex-1/2  w-1/2">
                <p className="text-left mb-2">HISTORY</p>
                <div className="flex  justify-between text-left">
                  <Image
                    src={profile}
                    width={30}
                    height={10}
                    alt="profile picture"
                    className="hidden md:block h-fit"
                  />
                  <p className="md:pl-4 w-1/2 md:w-full">
                    Bid placed by <span className="font-bold"> @Josh90</span>{" "}
                    <br /> Jan 15, 2023 at 7.31pm
                  </p>
                  <div className="flex flex-grow"></div>
                  <p className="font-bold text-green">
                    2.5 <br /> ETH
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CollPlaceBidModal
        bidAmount={bidAmount}
        setBidAmount={setBidAmount}
        listing={listing}
        isModalClosed={isModalClosed}
        modalOpen={modalOpen}
      />
      <CollEnlargeNFTModal
        isModalClosedEnlargeNFT={isModalClosedEnlargeNFT}
        modalOpenEnlargeNFT={modalOpenEnlargeNFT}
        listing={listing}
      />
    </>
  );
};

export default CollectionListing;
