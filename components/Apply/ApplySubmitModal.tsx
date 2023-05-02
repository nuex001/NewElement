import React, { useState, useEffect, FunctionComponent } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";

type Props = {
  modalOpen: boolean;
  isModalClosed: () => void;
};

const ApplySubmitModal: FunctionComponent<Props> = ({
  modalOpen,
  isModalClosed,
}) => {
  const router = useRouter();
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
      backgroundImage: "url(/background1.jpg)",
      backgroundSize: "cover",
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
        <div className="flex flex-col z-12 h-full w-full md:w-[70%] my-10 mx-5 overflow-hidden justify-between ">
          <div className="flex flex-col h-full">
            <div className="flex flex-col w-full font-ibmPlex mb-4 uppercase text-xs text-[#e4e8eb] ">
              <div className=" flex w-full fontIbm">
                <div className=" flex text-left">
                  {" "}
                  <p className="pr-6 text-green">
                    THANKYOU! <br />
                    WE WILL BE IN TOUCH SOON.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  router.push("/");
                }}
                type="submit"
                className="bg-blue text-green fontCompress font-xCompressed border border-green w-full uppercase tracking-[8px] mt-3 bg-white bg-opacity-20 hover:bg-opacity-40 py-[1.2vh] px-[2vw] md:px-[6vw] z-2 text-2xl  "
              >
                Back To Market
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ApplySubmitModal;
