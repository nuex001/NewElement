import { useState, FunctionComponent } from "react";
import Router from "next/router";
import Image from "next/image";
import Countdown from "react-countdown";
import ribbon from "../public/ribbon.png";
import send from "../public/send.png";
import axios from "axios";

import {
  getArtist,
  artistNameOrAddress,
  artistProfilePic,
  owner,
} from "../lib/functions";

type Props = {
  listing: object | any;
  setLoading: Function;
  users: object | any;
  index: number;
  user: any;
};
const NFTCard: FunctionComponent<Props> = ({
  listing,
  setLoading,
  users,
  index,
  user,
}) => {
  getArtist(users, listing);
  // console.log(listing);

  const handleSaveToProfile = () => {
    setLoading(true);
    const data = {
      nft: listing,
      address: user.address,
    };
    axios
      .post("/api/saveNft", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };
  const { _id } = owner;
  // Countdown

  const Completionist = () => <span>Auction Ended</span>;
  const timeLeft = Number(listing.endTime);

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
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
  return (
    <>
      {listing ? (
        <div className="flex flex-col h-full px-4 md:px-0 overflow-hidden justify-between ">
          <div className="flex flex-col h-full">
            {/* <div className="flex grow"></div> */}
            <div
              onClick={() => {
                Router.push({
                  pathname: `/listing/${listing.id}`,
                });
              }}
              className=" overflow-hidden h-full flex min-h-[370px] max-h-[450px]  xl:max-h-[580px] justify-center items-center"
            >
              <Image
                src={listing?.image}
                alt={listing?.title}
                width={400}
                height={400}
                className="w-full  object-cover cursor-pointer"
              />
            </div>

            <div className="flex flex-col font-ibmPlex mb-16 uppercase text-xs text-[#e4e8eb] ">
              <div className=" grid grid-cols-4 sm:grid-cols-5 gap-6 w-full mt-3">
                <div className="text-left col-span-2">
                  <p>{listing?.title}</p>
                </div>
                <div className="hidden sm:flex grow"></div>
                <div className=" flex text-left justify-end">
                  {" "}
                  <p className=" ">
                    Reserve <br /> Price
                  </p>
                </div>
                <div className=" flex text-left justify-end">
                  <p className="font-bold ">
                    {listing?.price == 0
                      ? listing?.price + ".00"
                      : listing?.price}{" "}
                    <br /> ETH
                  </p>
                </div>
                <div
                  onClick={() => {
                    Router.push({
                      pathname: `user/${_id}`,
                    });
                  }}
                  className="font-bold text-left flex cursor-pointer  mt-3 col-span-2"
                >
                  <p> BY @{artistNameOrAddress}</p>
                  <Image
                    className="ml-1 md:ml-3 -mt-1 h-6 cursor-pointer  object-cover rounded-full"
                    src={artistProfilePic}
                    height={0}
                    width={25}
                    alt={""}
                  />
                </div>
                <div className="hidden sm:flex grow"></div>
                <div className=" flex text-left justify-end">
                  {" "}
                  <p className=" ">
                    Current <br /> Bid
                  </p>
                </div>
                <div className=" flex text-left justify-end">
                  <p className="font-bold text-green">
                    {listing.Bid == 0 ? listing.Bid + ".00" : listing.Bid}{" "}
                    <br /> ETH
                  </p>
                </div>
              </div>
              <div className=" flex mt-3 -z-10">
                <button
                  onClick={handleSaveToProfile}
                  className=" text-white outline-none  shadow-lg transform active:scale-y-75 transition-transform flex"
                >
                  <Image
                    className=" h-5"
                    src={ribbon}
                    height={10}
                    width={20}
                    alt={""}
                  />
                </button>

                <div className="flex grow"></div>
                <div className=" flex font-bold text-green">
                  {listing.timeElapse ? (
                    <>
                      <p className="pr-5">Auction ended</p>
                    </>
                  ) : (
                    <>
                      {listing.endTime != 0 || listing.endTime != "" ? (
                        <Countdown
                          date={Date.now() + listing.endTime * 1000}
                          renderer={renderer}
                        />
                      ) : (
                        <p className="pr-5"> place bid</p>
                      )}
                    </>
                  )}
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
