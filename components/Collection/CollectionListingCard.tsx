import Router from "next/router";
import React from "react";
import profile from "../../assets/PROFILE.png";
import Image from "next/image";

type Props = {
  listing: any;
  isModalOpen: () => void;
  isModalOpenEnlargeNFT: () => void;
};

const CollectionListingCard = ({
  listing,
  isModalOpen,
  isModalOpenEnlargeNFT,
}: Props) => {
  return (
    <div className="flex flex-col h-full px-4 md:px-0 overflow-hidden justify-between">
      <div className="flex flex-col h-full">
        <Image
          src={listing?.metadata.image as string}
          alt={listing?.metadata.name as string}
          width={400}
          height={600}
          className="w-full mb-2 object-contain cursor-pointer"
          onClick={isModalOpenEnlargeNFT}
        />{" "}
        <div className="flex flex-col font-ibmPlex mb-6 uppercase text-xs text-[#e4e8eb] ">
          <div className=" flex ">
            <div className="">
              <p>{listing?.metadata.description}</p>
            </div>
            <div className="flex grow"></div>
            <div className=" flex text-left">
              {" "}
              <p className="pr-[3.25rem] ">
                Floor <br /> Price
              </p>
              <p className="font-bold text-green">
                1.1 <br /> ETH
              </p>
            </div>
          </div>

          <div className=" flex mt-3">
            <div
              onClick={() => {
                Router.push({
                  pathname: `/user/1`,
                });
              }}
              className="font-bold flex cursor-pointer"
            >
              <p>BY @RODRI</p>
              <Image
                className="ml-3 h-5"
                src={profile}
                height={10}
                width={20}
                alt={""}
              />
            </div>

            <div className="flex grow"></div>
            <div className=" flex text-left">
              {" "}
              <p className="pr-6 ">
                Collection <br /> Count
              </p>
              <p className="font-bold ">05</p>
            </div>
          </div>
          <div className=" flex mt-3">
            <div className="flex grow"></div>
            <div className=" flex font-bold text-green">
              {" "}
              <p className="pr-5">ENDS IN</p> <p> 10H 22M 09S</p>
            </div>
            <div className="flex grow"></div>
          </div>
        </div>
      </div>
      <div className="font-ibmPlex w-full md:min-w-1 flex items-center justify-between">
        <button
          className=" text-green font-xCompressed  w-full border border-green uppercase tracking-[8px] py-1 bg-white bg-opacity-20 hover:bg-opacity-30 font-semibold text-xl  "
          onClick={isModalOpen}
        >
          PLACE BID
        </button>
      </div>
    </div>
  );
};

export default CollectionListingCard;
