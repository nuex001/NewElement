import React, { useState } from "react";
import ButtonSpinner from "../LoadingSkeletons/ButtonSpinner";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import SingleNFT from "./SingleNFT";
import Collection from "./Collection";

type Props = {};

const MintComponent = (props: Props) => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState<string>("");
  const [imageCollection, setImageCollection] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [mintType, setMintType] = useState("SingleNFT");
  const initialMintValues = {
    title: "",
    description: "",
    reservePrice: "",
    collection: "",
  };
  const initialCollectionValues = {
    title: "",
    description: "",
  };

  const [formValues, setFormValues] = useState(initialMintValues);
  const [formValuesCollection, setFormValuesCollection] = useState(
    initialCollectionValues
  );

  const storage = new ThirdwebStorage();

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    console.log(value, name);

    setFormValues({ ...formValues, [name]: value });
  };

  const handleChangeCollection = (e: any) => {
    const { value, name } = e.target;
    console.log(value, name);

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
  const handleMintType = (e: any) => {
    const { value } = e.target;
    setMintType(value);
  };
  // Upload to IPFS function
  // It triggers an alert with all the data when MINT Button is clicked
  const uploadToIpfs = async () => {
    setLoading(true);
    let uploadUrl;
    {
      mintType === "SingleNFT"
        ? (uploadUrl = await storage.upload({
            title: formValues.title,
            description: formValues.description,
            image: file,
          }))
        : (uploadUrl = await storage.upload({
            colletionTitle: formValuesCollection.title,
            collectionDescription: formValuesCollection.description,
            image: file,
          }));
    }

    setLoading(false);
    setFormValues(initialMintValues);
    setFormValuesCollection(initialCollectionValues);
    setImage("");
    setImageCollection("");
    setFile(null);
    alert(uploadUrl);
  };

  return (
    <div className="flex w-screen  xl:max-w-[1600px] px-5 md:px-2 flex-col md:flex-row items-center md:items-start  mt-28  justify-center bg-black overflow-hidden">
      <div className="md:basis-1/2 mt-5 md:mt-0 md:p-2 w-full font-ibmPlex bold text-left md:m-4  text-sm ">
        <div className="font-bold">
          <p className="mb-4 ">Hello!</p>
          <p className="mb-4 ">
            We are really excited to list your artwork on our Web3 marketplace.
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
            checked={mintType === "SingleNFT"}
            onChange={handleMintType}
            className="mr-8 bg-green"
            type="radio"
          />
          <p className="uppercase mr-3">collection</p>
          <input
            value="Collection"
            checked={mintType === "Collection"}
            onChange={handleMintType}
            className="mr-8 bg-green"
            type="radio"
          />
        </div>
        <p className="mb-4 text-[13px]">
          Please select if you would like us to list <br /> a singular image or
          a collection
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
        {mintType === "SingleNFT" ? (
          <SingleNFT
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            formValues={formValues}
            image={image}
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
  );
};

export default MintComponent;
