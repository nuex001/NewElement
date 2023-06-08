import React, { use, useEffect, useState } from "react";
import ButtonSpinner from "../LoadingSkeletons/ButtonSpinner";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import {
  useStorageUpload,
  useNFTBalance,
  useContract,
  useTotalCount,
  useAddress,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import SingleNFT from "./SingleNFT";
import Collection from "./Collection";
import axios from "axios";
import { Alchemy, Network } from "alchemy-sdk";
import MintModal from "./MintModal";
import { useAuthedProfile } from "../../context/UserContext";

type Props = {};

const MintComponent = (props: Props) => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState<string>("");
  const [imageCollection, setImageCollection] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isCollection, setIsCollection] = useState(false);
  const [collection, setCollection] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { authedProfile, setAuthedProfile } = useAuthedProfile();

  const initialMintValues = {
    title: "",
    description: "",
    reservePrice: "",
  };
  const initialCollectionValues = {
    title: "",
    description: "",
    token: "",
  };

  const [formValues, setFormValues] = useState(initialMintValues);
  const [formValuesCollection, setFormValuesCollection] = useState(
    initialCollectionValues
  );

  // Fetching NFTs from Wallet address
  const address = useAddress();
  const contractAddress = "0xED5AF388653567Af2F388E6224dC7C4b3241C544";
  // Change the testnet to mainnet when ready
  const baseURL = `https://eth-goerli.g.alchemy.com/v2/ORQVzR0fGO4AXjBvx-DUPmKFGWvkgiya/getNFTs`;

  // useEffect(() => {
  //   const options = {
  //     method: "GET",
  //     url: baseURL,
  //     params: {
  //       owner: address,
  //       "contractAddresses[]": contractAddress,
  //       withMetadata: "true",

  //       pageSize: "100",
  //     },
  //     headers: { accept: "application/json" },
  //   };

  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // }, [address]);

  const storage = new ThirdwebStorage();
  const { mutateAsync: upload } = useStorageUpload();

  const handleChange = (e: any) => {
    const { value, name } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleChangeCollection = (e: any) => {
    const { value, name } = e.target;

    setFormValuesCollection({ ...formValuesCollection, [name]: value });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);

      setImage(url);
      setFile(file);
    }
  };
  const handleImageChangeCollection = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);

      setImageCollection(url);
      setFile(file);
    }
  };
  const handleMintType = () => {
    setIsCollection((prev) => !prev);
  };
  // Upload to IPFS function
  // It triggers an alert with all the data when MINT Button is clicked
  const uploadToIpfs = async () => {
    setLoading(true);
    let uploadUrl;
    let resolvedUrl;
    let singleNFTData = {
      name: formValues.title,
      description: formValues.description,
      collection: collection,
      image: file,
    };
    let collectionData = {
      collectionName: formValuesCollection.title,
      description: formValuesCollection.description,
      token: formValuesCollection.token,
      image: file,
    };
    {
      if (!isCollection) {
        try {
          (uploadUrl = await storage.upload(singleNFTData)),
            (resolvedUrl = await storage.resolveScheme(uploadUrl));
        } catch (e) {
          console.log(e);
          alert("Something went wrong, please try again later.");
        }
      } else {
        try {
          (uploadUrl = await storage.upload(collectionData)),
            (resolvedUrl = await storage.resolveScheme(uploadUrl));
          axios
            .post("/api/addCollection", {
              collectionName: formValuesCollection.title,
              address,
            })
            .then((res) => {
              console.log(res.data);
              setAuthedProfile(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (e) {
          console.log(e);
          alert("Something went wrong, please try again later.");
        }
      }
    }

    setLoading(false);
    setFormValues(initialMintValues);
    setFormValuesCollection(initialCollectionValues);
    setCollection("");
    setImage("");
    setImageCollection("");
    setFile(null);
    isModalOpen();
    console.log(uploadUrl);
  };

  // Modal
  const isModalOpen = () => {
    setModalOpen(true);
  };
  const isModalClosed = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="flex w-screen  xl:max-w-[1600px] px-5 md:px-2 flex-col md:flex-row items-center md:items-start  mt-28  justify-center bg-black overflow-hidden">
        <div className="md:basis-1/2 mt-5 md:mt-0 md:p-2 w-full font-ibmPlex bold text-left md:m-4  text-sm ">
          <div className="font-bold">
            <p className="mb-4 ">Hello!</p>
            <p className="mb-4 ">
              We are really excited to list your artwork on our Web3
              marketplace.
            </p>
            <p className="mb-8 ">
              Please fill out all the information below so we can list your
              artwork in our marketplace!
            </p>
          </div>
          <div className="flex mb-4">
            <p className="uppercase mr-3">single image</p>
            <input
              value="SingleNFT"
              checked={!isCollection}
              onChange={handleMintType}
              className="mr-8 bg-green"
              type="radio"
            />
            <p className="uppercase mr-3">collection</p>
            <input
              value="Collection"
              checked={isCollection}
              onChange={handleMintType}
              className="mr-8 bg-green"
              type="radio"
            />
          </div>
          <p className="mb-4 text-[13px]">
            Please select if you would like us to list <br /> a singular image
            or a collection
          </p>
          <div className="hidden md:block">
            <button
              onClick={uploadToIpfs}
              type="submit"
              className="bg-blue text-green font-compressed mb-6 md:mb-0  border border-green w-full md:w-3/6 uppercase tracking-[10px] mt-1  bg-white bg-opacity-20 hover:bg-opacity-30 transition duration-300 ease-in-out font-semibold py-1 md:py-[1.2vh] md:px-[7vh] z-2 text-2xl md:text-xl  "
            >
              {loading ? <ButtonSpinner /> : "Mint"}
            </button>
            <p className="text-[10px] w-3/6">
              By pressing sumbit you agree to our terms and conditions laid out{" "}
              <button className="underline"> here </button>
            </p>
          </div>
        </div>
        <div className="md:basis-1/2 md:p-2 flex justify-center  md:items-start md:justify-end md:mx-4 w-full mt-8 md:mt-0">
          {!isCollection ? (
            <SingleNFT
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              formValues={formValues}
              image={image}
              collections={authedProfile?.collections}
              collection={collection}
              setCollection={setCollection}
            />
          ) : (
            <Collection
              handleChangeCollection={handleChangeCollection}
              handleImageChangeCollection={handleImageChangeCollection}
              formValuesCollection={formValuesCollection}
              imageCollection={imageCollection}
            />
          )}
        </div>
        {/* Mobile */}
        <div className="w-full md:hidden my-6">
          <button
            type="submit"
            className="bg-blue text-green font-compressed mb-6 md:mb-0  border border-green w-full md:w-3/6 uppercase tracking-[10px] mt-1  bg-white bg-opacity-20 hover:bg-opacity-30 transition duration-300 ease-in-out font-semibold py-1 md:py-[1.2vh] md:px-[7vh] z-2 text-2xl md:text-xl  "
          >
            {loading ? <ButtonSpinner /> : "Mint"}
          </button>
          <p className="text-[10px] text-left">
            By pressing sumbit you agree to our terms and conditions laid out{" "}
            <button className="underline"> here </button>
          </p>
        </div>
      </div>
      <MintModal isModalClosed={isModalClosed} modalOpen={modalOpen} />
    </>
  );
};

export default MintComponent;
