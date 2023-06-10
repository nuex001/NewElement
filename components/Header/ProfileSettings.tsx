import React, { useState } from "react";
import { isValidEmail } from "../../lib/emailValidation";
import ButtonSpinner from "../LoadingSkeletons/ButtonSpinner";
import SettingsModal from "./SettingsModal";
import Link from "next/link";
import { useAuthedProfile } from "../../context/UserContext";

type Props = {};

const ProfileSettings = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [formEmail, setFormEmail] = useState("");
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = React.useState("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { authedProfile } = useAuthedProfile();

  const handleChange = (e: any) => {
    const { value } = e.target;
    setEmail(value);
  };

  const validateEmail = () => {
    const emailValue = email.trim();
    let formIsValid = true;

    if (email === "") {
      setErrorMessageEmail("Email is required");
      setErrorEmail(true);
      formIsValid = false;
    } else if (!isValidEmail(emailValue)) {
      setErrorMessageEmail("Provide a valid email address");
      setErrorEmail(true);
      formIsValid = false;
    } else {
      setErrorEmail(false);
      setFormEmail(email);
    }
    return formIsValid;
  };

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (validateEmail()) {
      console.log("Verification passed!");
      setLoading(false);
      setEmail("");
      isModalOpen();
    } else {
      setLoading(false);
      console.log("Verification failed.");
    }
  };
  // Modal
  const isModalOpen = () => {
    setModalOpen(true);
  };
  const isModalClosed = () => {
    setModalOpen(false);
  };
  if (!authedProfile) return null;
  return (
    <>
      <div
        className={`flex w-screen   mt-24 lg:mt-32 items-center justify-center `}
      >
        <div className="flex mb-10 w-full px-5 md:px-0 md:w-[50vw] xl:w-[40vw] max-w-[1600px] flex-col items-center  text-left  font-ibmPlex">
          <div className="absolute translate-x-[100%] lg:translate-x-[30px] lg:right-[70%] xl:translate-x-[200px] xl:right-1/2  left-0 hidden md:block ">
            <Link
              href="/profile"
              className="font-ibmPlex cursor-pointer uppercase font-bold text-green text-xs -z-10"
            >
              {"<<<"} Back
            </Link>
          </div>
          <div className=" w-full  text-xs ">
            <form id="contact-form" onSubmit={handleSubmit} method="POST">
              <div className="flex flex-col font-semibold mb-10">
                <div className="form-group text-green uppercase">
                  <label htmlFor="email1">Email Address *</label>
                  <input
                    type="text"
                    className={
                      errorEmail
                        ? "text-base bg-transparent py-3.5 mt-1 px-4 w-full h-10 border border-red-500 outline-0 transition-all duration-500"
                        : "text-base bg-transparent py-3.5 mt-1 px-4 w-full h-10 border  outline-0 transition-all duration-500"
                    }
                    id="email1"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    // aria-describedby="emailHelp"
                    placeholder="name@domain.com"
                    // required
                  />
                </div>
                <div
                  className={
                    errorEmail
                      ? "text-red-500 font-thin leading-tight text-xs mb-2"
                      : "invisible leading-tight text-xs mb-2"
                  }
                >
                  {errorMessageEmail}
                </div>
              </div>
              <div className="font-ibmPlex mb-8">
                <h3 className="text-green mb-1">AUCTION NOTIFICATIONS</h3>
                <p className="mb-2">
                  Receive email notifications when bids you place are confirmed,
                  when you have been outbid, and when an auction has ended.
                </p>

                <input
                  className="w-5 h-5 accent-black text-green bg-black  outline-green "
                  type="checkbox"
                  name="auctionNotification"
                  id=""
                  defaultChecked
                />
              </div>
              <div className="font-ibmPlex mb-8">
                <h3 className="text-green mb-1">BUY NOW NOTIFICATIONS</h3>
                <p className="mb-2">
                  Receive email notifications when someone buys your NFT and
                  when you buy an NFT via Buy Now.
                </p>

                <input
                  className="w-5 h-5 accent-black text-green bg-black  outline-green "
                  type="checkbox"
                  name="buyNowNotification"
                  id=""
                  defaultChecked
                />
              </div>
              <div className="font-ibmPlex mb-8">
                <h3 className="text-green mb-1">OFFER NOTIFICATIONS</h3>
                <p className="mb-2">
                  Receive email notifications when someone sends you an Offer,
                  when you send an Offer, and when someone accepts your offer.
                </p>

                <input
                  className="w-5 h-5 accent-black text-green bg-black  outline-green "
                  type="checkbox"
                  name="offerNotification"
                  id=""
                  defaultChecked
                />
              </div>
              <div className="font-ibmPlex mb-8">
                <h3 className="text-green mb-1">FOR SALE NOTIFICATIONS</h3>
                <p className="mb-2">
                  Receive email notifications when profiles that you follow list
                  a new NFT for auction and set a Buy Now price on Foundation.
                </p>

                <input
                  className="w-5 h-5 accent-black text-green bg-black  outline-green "
                  type="checkbox"
                  name="forSaleNotification"
                  id=""
                  defaultChecked
                />
              </div>
              <button
                type="submit"
                className="bg-blue text-green font-xCompressed border border-green w-full uppercase tracking-[8px] mt-3 bg-white bg-opacity-20 hover:bg-opacity-40 py-[1.2vh] px-[7vh] z-2 text-2xl  "
              >
                {loading ? <ButtonSpinner /> : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <SettingsModal isModalClosed={isModalClosed} modalOpen={modalOpen} />
    </>
  );
};

export default ProfileSettings;
