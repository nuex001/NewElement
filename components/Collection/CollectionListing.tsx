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
import { useState } from "react";
import { marketplaceContractAddress } from "../../addresses";
import styles from "../../styles/Home.module.css";
import profile from "../../assets/PROFILE.png";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const CollectionListing = (props: Props) => {
  // Hooks to detect user is on the right network and switch them if they are not
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
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

  return (
    <>
      <div className="flex flex-col realtive h-full items-center container lg:w-[98dvw]  mt-[6.5rem]  overflow-x-hidden justify-between">
        <div className="flex justify-center realtive w-3/4">
          <div className="absolute translate-x-[100%] lg:translate-x-1 lg:right-[70%] xl:translate-x-0 xl:right-1/2  left-0 hidden md:block ">
            <Link
              href="/"
              className="font-ibmPlex cursor-pointer uppercase font-bold text-green text-xs -z-10"
            >
              {"<<<"} Back
            </Link>
          </div>
          <div className="flex flex-col h-full items-center justify-center">
            <div className="w-full lg:w-max">
              <div className=" min-w-[350px]  lg:max-w-[50vw] cursor-pointer">
                <Image
                  src={listing?.metadata.image as string}
                  alt={listing?.metadata.name as string}
                  width={400}
                  height={600}
                  className="w-full mb-2 object-contain cursor-pointer"
                  // onClick={isModalOpenEnlargeNFT}
                />{" "}
                <div className="flex flex-col font-ibmPlex mb-4 uppercase text-xs text-[#e4e8eb] ">
                  <div className=" flex ">
                    <div className="">
                      <p>{listing?.metadata.description}</p>
                    </div>
                    <div className="flex grow"></div>
                    <div className=" flex text-left">
                      {" "}
                      <p className="pr-6 ">
                        Reserve <br /> Price
                      </p>
                      <p className="font-bold ">
                        1.1 <br /> ETH
                      </p>
                    </div>
                  </div>

                  <div className=" flex mt-3">
                    <div className="font-bold flex">
                      <b>
                        {listing.sellerAddress?.slice(0, 6) +
                          "..." +
                          listing.sellerAddress?.slice(36, 40)}
                      </b>
                    </div>

                    <div className="flex grow"></div>
                    <div className=" flex text-left">
                      {" "}
                      <p className="pr-6 ">
                        Current <br /> Bid
                      </p>
                      <p className="font-bold text-green">
                        2.5 <br /> ETH
                      </p>
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
                  // onClick={isModalOpen}
                >
                  PLACE BID
                </button>
              </div>
            </div>
            <div className="font-ibmPlex bold text-center w-full   mt-10 pb-10 border-b leading-5 text-xs">
              <p className="md:w-[50vw]">
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
            <div className="flex w-full mt-6 mb-10 font-ibmPlex text-xs">
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
      {/* <PlaceBidModal
        bidAmount={bidAmount}
        setBidAmount={setBidAmount}
        listing={listing}
        isModalClosed={isModalClosed}
        modalOpen={modalOpen}
      />
      <EnlargeNFTModal
        isModalClosedEnlargeNFT={isModalClosedEnlargeNFT}
        modalOpenEnlargeNFT={modalOpenEnlargeNFT}
        listing={listing}
      /> */}
    </>
  );
};

export default CollectionListing;
