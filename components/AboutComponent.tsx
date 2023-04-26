import React, { useState } from "react";
import nft from "../assets/nft-8.jpg";
import Image from "next/image";

type Props = {};

const AboutComponent = (props: Props) => {
  const initialValues = {
    email: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState("Error");
  const [formEmail, setFormEmail] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);

  const isValidEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const validateInputs = () => {
    const emailValue = formValues.email.trim();
    let formIsValid = true;

    if (formValues.email === "") {
      setErrorMessageEmail("Email is required");
      setErrorEmail(true);
      formIsValid = false;
    } else if (!isValidEmail(emailValue)) {
      setErrorMessageEmail("Provide a valid email address");
      setErrorEmail(true);
      formIsValid = false;
    } else {
      setErrorEmail(false);
      setFormEmail(formValues.email);
    }

    return formIsValid;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateInputs()) {
      console.log("Verification passed!");
      setFormValues(initialValues);

      alert(
        "Thank you for your interest in New Elements! We will be in touch soon."
      );
    }
  };
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <div className="flex w-full md:w-full xl:max-w-[1600px] px-4 flex-col md:flex-row-reverse items-center md:items-start  mt-28  justify-center bg-black overflow-hidden">
      <div className="md:basis-1/2 p-2 flex justify-center  md:items-start md:justify-end md:m-4 w-full">
        <Image src={nft} height={420} width={400} alt={""} />
      </div>
      <div className="md:basis-1/2 p-2 font-ibmPlex bold text-left m-4  text-sm ">
        <p className="mb-4 "> Welcome to NEW ELEMENTS.</p>{" "}
        <p className="mb-4 ">
          The Web3 destination dedicated to fashion and beauty storytellers.
        </p>{" "}
        <p className="mb-4 ">
          We are a unique platform that brings together a community of talented
          artists, photographers, videographers, and more, who specialize in
          creating artwork related to the fashion and beauty industry. Our goal
          is to create a space where these creators can showcase their unique
          vision and share their stories with the world.
        </p>{" "}
        <p className="mb-4 ">
          Storytelling allows us to convey powerful emotions and ideas in a way
          that transcends language and cultural barriers. Through the use of
          color, composition, and other visual elements, artists and designers
          can create a story that resonates with their audience and captures
          their attention.
        </p>{" "}
        <p className="mb-4 ">
          We believe that art has the power to inspire and connect people, and
          we are excited to be a part of the growing NFT community. We invite
          you to explore our marketplace and discover the exceptional talent of
          our fashion and beauty storytellers. Thank you for joining us on this
          journey.
        </p>{" "}
        <p className="mb-4 ">
          Our goal is to be community owned and led, Join us now and sign up
          here to discover future plans for our token $elmnt.
        </p>
        <form id="contact-form" onSubmit={handleSubmit} method="POST">
          <div className="flex flex-col ">
            <div className="form-group flex flex-col pb-1 ">
              <label className="text-green mb-3 " htmlFor="email1">
                EMAIL ADDRESS
              </label>
              <input
                type="text"
                className={
                  errorEmail
                    ? "text-base bg-transparent py-3.5 px-4 w-full md:w-4/6 h-10 border border-red-500 outline-0 transition-all duration-500"
                    : "text-base bg-transparent  py-3.5 px-4 w-full md:w-4/6 h-10 border border-green  outline-0 transition-all duration-500"
                }
                id="email1"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                // aria-describedby="emailHelp"
                placeholder="name@domain.com"
                // required
              />
            </div>
            <div
              className={
                errorEmail
                  ? "text-red-500 font-thin leading-tight text-xs"
                  : "invisible leading-tight text-xs"
              }
            >
              {errorMessageEmail}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue text-green font-xCompressed  border border-green w-full md:w-3/6 uppercase tracking-[12px] mt-1  bg-white bg-opacity-20 hover:bg-opacity-40 font-semibold py-1 md:py-[1.2vh] md:px-[7vh] z-2 text-2xl md:text-xl  "
          >
            {loading ? (
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-white h-6 w-6"></div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>

      {/* <div className="basis-1/2 p-2 flex items-start justify-around ">
        <Image src={nft} height={420} width={400} alt={""} />
      </div> */}
    </div>
  );
};

export default AboutComponent;
