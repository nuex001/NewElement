import React, { useState } from "react";
import ButtonSpinner from "../LoadingSkeletons/ButtonSpinner";
import { ThirdwebStorage } from "@thirdweb-dev/storage";

type Props = {};

const MintComponent = (props: Props) => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState<string>("");
  const storage = new ThirdwebStorage();
  const initialMintValues = {
    title: "",
    description: "",
    reservePrice: "",
  };
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(initialMintValues);

  function setReservePrice(value: string): void {
    throw new Error("Function not implemented.");
  }
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    console.log(value, name);

    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);

      setImage(url);
      setFile(file);
    }
  };
  // Upload to IPFS function
  // It triggers an alert with all the data when MINT Button is clicked
  const uploadToIpfs = async () => {
    setLoading(true);
    const uploadUrl = await storage.upload({
      title: formValues.title,
      description: formValues.description,
      image: file,
    });

    setLoading(false);
    alert(`IPFS Link: ${uploadUrl}`);
  };
  console.log(formValues);

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
          <input className="mr-8 bg-green" type="radio" />
          <p className="uppercase mr-3">collection</p>
          <input type="radio" />
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
      {/* NFT Upload */}
      <div className="md:basis-1/2 md:p-2 flex justify-center  md:items-start md:justify-end md:mx-4 w-full mt-8 md:mt-0">
        <div className="flex flex-col items-center justify-center md:w-3/4 ">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-80 border-green border cursor-pointer bg-gray-50 dark:hover:bg-neutral-700 dark:bg-neutral-800 hover:bg-gray-100 transition duration-300 ease-in-out "
          >
            {image ? (
              <img src={image} alt="" />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
              </div>
            )}{" "}
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />{" "}
          </label>

          <div>
            {/* <input
              type="file"
              onChange={(e: any) => setFile(e.target.files[0])}
            />
            <button onClick={uploadToIpfs}>Upload</button> */}
          </div>
          <input
            id="title1"
            placeholder="Title"
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            className="w-full h-16 mt-3 border-green border pl-5 cursor-pointer font-ibmPlex text-green  dark:bg-neutral-800 focus:bg-neutral-700 focus:outline-none transition duration-300 ease-in-out"
          />

          <input
            id="description1"
            name="description"
            placeholder="Description"
            type="text"
            value={formValues.description}
            onChange={handleChange}
            className="w-full h-20 mt-3 border-green border pl-5 cursor-pointer font-ibmPlex text-green  dark:bg-neutral-800  focus:bg-neutral-700 focus:outline-none transition duration-300 ease-in-out"
          />
          <div className="font-ibmPlex text-left">
            <p className="my-4 text-[13px]">
              Please give your artwork some context with a title and
              description.
            </p>
            <div className=" flex text-left justify-end mb-6">
              {" "}
              <p className="pr-2 font-bold text-green uppercase">
                Reserve <br /> Price
              </p>
              <input
                type="number"
                name="reservePrice"
                pattern="[0-9]+"
                placeholder="0.00  ETH"
                value={formValues.reservePrice}
                onChange={handleChange}
                className="border bg-transparent pl-2 w-[30%] focus:outline-green"
              />
            </div>
            <p className="mb-4 text-[13px]">
              Please provide the minimum amount you would like to sell your
              artwork for. This is denominated in ETHEREUM. When you add a ETH
              amount you will see the current Dollar amount represented
              underneath the box.
            </p>
          </div>
        </div>
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
