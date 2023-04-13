import { useEffect, useState, FunctionComponent } from "react";
import Router from "next/router";
import Image from "next/image";
import { Interface } from "ethers/lib/utils";
import Link from "next/link";
import profile from "../assets/PROFILE.png";
import ribbon from "../assets/ribbon.png";
import send from "../assets/send.png";

type Props = {
  listing: object | any;
};
const NFTCard: FunctionComponent<Props> = ({ listing }) => {
  const [isListed, setIsListed] = useState(false);
  const [price, setPrice] = useState(0);
  console.log(listing);

  // useEffect(() => {
  //   const listing = listings.find(
  //     (listing: any) => listing.asset.id === nftItem.id
  //   );
  //   if (Boolean(listing)) {
  //     setIsListed(true);
  //     setPrice(listing.buyoutCurrencyValuePerToken.displayValue);
  //   }
  // }, [listings, nftItem]);

  return (
    <>
      {listing ? (
        <div className="flex flex-col h-full  mx-5 overflow-hidden justify-between">
          <div className="flex flex-col h-full">
            {/* <div className="flex grow"></div> */}
            <div
              onClick={() => {
                Router.push({
                  pathname: `/listing/${listing.id}`,
                  query: { isListed: isListed },
                });
              }}
              className=" overflow-hidden h-full flex justify-center items-center mb-3"
            >
              <img
                src={listing?.asset.image}
                alt={listing?.asset.name}
                className="w-full max-h-[65vh] object-cover cursor-pointer"
              />
            </div>

            <div className="flex flex-col font-ibmPlex mb-16 uppercase text-xs text-[#e4e8eb] ">
              <div className=" flex ">
                <div className="">
                  <p>{listing?.asset.description}</p>
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
                    Current <br /> Bid
                  </p>
                  <p className="font-bold text-green">
                    1.1 <br /> ETH
                  </p>
                </div>
              </div>
              <div className=" flex mt-3">
                <div className="font-bold flex">
                  <Image
                    className=" h-5"
                    src={ribbon}
                    height={10}
                    width={20}
                    alt={""}
                  />
                </div>

                <div className="flex grow"></div>
                <div className=" flex text-left">
                  {" "}
                  <p className="font-bold text-green">ENDS IN 10H 22M 09S</p>
                </div>
                <div className="flex grow"></div>

                <div className="font-bold flex">
                  <Image
                    className="ml-3 h-5"
                    src={send}
                    height={10}
                    width={20}
                    alt={""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default NFTCard;
