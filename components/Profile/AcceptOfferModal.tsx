import React, { useState, useEffect, FunctionComponent } from "react";
import Modal from "react-modal";
import Image from "next/image";

import ButtonSpinner from "../LoadingSkeletons/ButtonSpinner";

type Props = {};

const AcceptOfferModal = ({
  modalOpen,
  isModalClosed,
  collectedNfts,
  accept,
  nftModalIndex,
  offers,
  loadingOffer,
}: any) => {
  let listing = collectedNfts[nftModalIndex];

  // Function to find the array with nftId equal to 1
  function findArrayWithNftId(offers: any, targetNftId: number) {
    let resultArray = null;
    if (!offers) {
      return null;
    }
    offers.forEach((nftList: any) => {
      nftList.forEach((nftInfo: any) => {
        if (nftInfo.nftId === targetNftId) {
          resultArray = nftList;
        }
      });
    });
    return resultArray;
  }
  let highestOffer = 0;
  let bidder = "";
  // Call the function and get the array with nftId equals 1
  const offer = findArrayWithNftId(offers, listing.id);
  // Function to find the highest amount in the object
  function findHighestAmount(offer: any) {
    if (!offer) {
      return null;
    }
    offer.forEach((nftInfo: any) => {
      nftInfo.bids.forEach((bid: any) => {
        if (bid.amount > highestOffer) {
          highestOffer = bid.amount;
          bidder = bid.bidder;
        }
      });
    });
  }

  // Call the function to get the highest amount

  findHighestAmount(offer);

  const customStyles = {
    overlay: {
      backgroundColor: "rgb(25, 25, 25, 0.85)",
    },
    content: {
      zIndex: "20",
      top: "50%",
      left: "50%",
      minWidth: "40vw",
      right: "auto",
      bottom: "auto",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "black",
      marginRight: "-50%",
      borderRadius: "25px",
      transform: "translate(-50%, -50%)",
    },
  };
  if (!offer) {
    return null;
  }
  return (
    <div>
      {" "}
      <Modal
        style={customStyles}
        isOpen={modalOpen}
        onRequestClose={isModalClosed}
        ariaHideApp={false}
      >
        <>
          {offer ? (
            <div className="flex flex-col z-12 text-ibmPlex h-full w-full md:w-[70%]  mx-5 overflow-hidden justify-between">
              <div className="flex flex-col h-full">
                {/* <div className="flex grow"></div> */}
                {listing ? (
                  <div className=" overflow-hidden h-full flex justify-center items-center mb-3">
                    <Image
                      src={listing?.image}
                      alt={listing?.title}
                      width={200}
                      height={300}
                      className="w-full max-h-[35vh] min-h-[250px] object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-[100dvw] mt-32">
                    <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-black via-blue-500 to-green ">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-black rounded-full "></div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col w-full font-ibmPlex mb-4 uppercase text-xs text-[#e4e8eb] ">
                  <div className=" grid grid-cols-3 md:grid-cols-3 gap-6 w-full mt-3">
                    <div className=" flex text-left col-span-2">
                      {" "}
                      <p className="pr-6 font-bold text-green">
                        Highest <br /> Offer
                      </p>
                      <p className="font-bold">
                        {highestOffer} <br /> ETH
                      </p>
                    </div>
                    <div className="flex grow"></div>
                    <div className=" flex text-left col-span-2">
                      {" "}
                      <p className="pr-6 font-bold text-green ">
                        By <br />
                      </p>
                      <p className="font-bold">{bidder}</p>
                    </div>
                  </div>
                  {loadingOffer ? (
                    <div className="mt-6">
                      <ButtonSpinner />
                      <p className="font-ibmPlex text-xs  tracking-normal mt-3">
                        Processing...
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() => accept(listing.id, bidder)}
                      className="fontCompress text-green mt-6 border border-green font-xxCompressed w-[100%] uppercase tracking-[8px] py-1 bg-white bg-opacity-20 hover:bg-opacity-30 font-semibold text-xl  "
                    >
                      Accept Offer
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </>
      </Modal>
    </div>
  );
};

export default AcceptOfferModal;
