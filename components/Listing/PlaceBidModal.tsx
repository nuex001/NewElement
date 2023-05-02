import React, { useState, useEffect, FunctionComponent } from "react";
import Modal from "react-modal";
import Router from "next/router";
import Image from "next/image";
import { log } from "console";

type Props = {
  modalOpen: boolean;
  isModalClosed: () => void;
  listing: object | any;
  bidAmount: string;
  setBidAmount: (bidAmount: string) => void;
};

const PlaceBidModal: FunctionComponent<Props> = ({
  modalOpen,
  isModalClosed,
  listing,
  bidAmount,
  setBidAmount,
}) => {
  // const [isOpenModal, setIsOpenModal] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);

  const customStyles = {
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
          {listing ? (
            <div className="flex flex-col z-12 text-ibmPlex h-full w-full md:w-[70%]  mx-5 overflow-hidden justify-between">
              <div className="flex flex-col h-full">
                {/* <div className="flex grow"></div> */}
                {listing ? (
                  <div className=" overflow-hidden h-full flex justify-center items-center mb-3">
                    <Image
                      src={listing?.asset.image}
                      alt={listing?.asset.name}
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
                  <h1 className="fontCompress tracking-wider font-compressed text-3xl mb-8">
                    place bid
                  </h1>
                  <div className=" flex w-full fontIbm">
                    <div className=" flex text-left">
                      {" "}
                      <p className="pr-6 ">
                        Reserve <br /> Price
                      </p>
                      <p className="font-bold ">
                        2.1 <br /> ETH
                      </p>
                    </div>
                    <div className="flex grow"></div>
                    <div className=" flex text-left ">
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
                    <div className=" flex w-full fontIbm">
                      <div className=" flex text-left">
                        {" "}
                        <p className="pr-6 font-bold text-green">
                          Offer <br /> Amount
                        </p>
                        <input
                          type="number"
                          name="bidAmount"
                          pattern="[0-9]+"
                          placeholder="0.00  ETH"
                          onChange={(e) => setBidAmount(e.target.value)}
                          className="border bg-transparent w-2/5 pl-2 focus:outline-green"
                        />
                      </div>
                      <div className="flex grow"></div>
                      <div className=" flex text-left">
                        {" "}
                        <p className="pr-6 font-bold text-green ">
                          Your <br /> Balance
                        </p>
                        <p className="font-bold">
                          1.1 <br /> ETH
                        </p>
                      </div>
                    </div>
                  </div>

                  <button className="fontCompress text-green mt-6 border border-green font-xxCompressed w-[100%] uppercase tracking-[8px] py-1 bg-white bg-opacity-20 hover:bg-opacity-30 font-semibold text-xl  ">
                    Make Offer
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </>
      </Modal>
    </div>
  );
};

export default PlaceBidModal;
