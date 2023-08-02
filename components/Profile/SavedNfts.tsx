import Router from "next/router";
import Image from "next/image";
import React from "react";
import {
  getArtist,
  artistNameOrAddress,
  artistProfilePic,
  user,
} from "../../lib/functions";

type Props = {};

const SavedNfts = ({ nft, users, deleteSavedNft }: any) => {
  getArtist(users, nft);
  return (
    <div className="flex  flex-col h-full items-start w-min text-xs uppercase ">
      <div className="cursor-pointer relative">
        <Image
          onClick={() => {
            Router.push({
              pathname: `/listing/${nft.id}`,
            });
          }}
          src={nft.image}
          alt="nft7"
          width={150}
          height={200}
          className="max-h-[220px] md:max-h-[300px] w-[41vw] md:w-full md:min-w-[230px] mb-2 object-cover "
        />{" "}
        <button onClick={() => deleteSavedNft(nft)} className="">
          <button className="absolute -top-6 -right-6 border-green border rounded-full p-2 hover:brightness-75 font-ibmPlex  bg-green  font-semibold text-black   hover:border-transparent transition-all duration-200 ease-in">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 w-full items-stretch gap-4 mb-10 mt-4">
        <div className="text-left col-span-2">
          <p>{nft?.title}</p>
        </div>
        {/* <div className="hidden sm:flex grow"></div> */}
        <div className=" flex  justify-end">
          {" "}
          <p className=" ">
            Reserve <br /> Price
          </p>
        </div>
        <div className=" flex text-left justify-end">
          <p className="font-bold ">
            {nft?.price == 0 ? nft?.price + ".00" : nft?.price} <br /> ETH
          </p>
        </div>
        <div
          onClick={() => {
            Router.push({
              pathname: `user/${user?._id}`,
            });
          }}
          className="mr-4 text-left flex cursor-pointer  mt-3 col-span-2"
        >
          <p> BY @{artistNameOrAddress}</p>
          <Image
            className=" -mt-1 h-6 w-8 cursor-pointer  object-cover rounded-full"
            src={artistProfilePic}
            height={0}
            width={30}
            alt={""}
          />
        </div>
        {/* <div className="hidden sm:flex grow"></div> */}
        <div className=" flex text-left justify-end">
          {" "}
          <p className=" ">
            Current <br /> Bid
          </p>
        </div>
        <div className=" flex text-left justify-end">
          <p className="font-bold text-green">
            {nft.Bid == 0 ? nft.Bid + ".00" : nft.Bid} <br /> ETH
          </p>
        </div>
      </div>
    </div>
  );
};

export default SavedNfts;
