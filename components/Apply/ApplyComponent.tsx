import React, { useState } from "react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ApplySubmitModal from "./ApplySubmitModal";
import ButtonSpinner from "../LoadingSkeletons/ButtonSpinner";
import { isValidEmail } from "../../lib/emailValidation";

const ApplyComponent = () => {
  const initialValues = { website: "", twitter: "", email: "", instagram: "" };

  const [formValues, setFormValues] = useState(initialValues);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  const [formWebsite, setFormWebsite] = useState("");
  const [formTwitter, setFormTwitter] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formInstagram, setFormInstagram] = useState("");

  const [errorMessageWebsite, setErrorMessageWebsite] = useState("Error");
  const [errorMessageTwitter, setErrorMessageTwitter] = useState("Error");
  const [errorMessageEmail, setErrorMessageEmail] = useState("Error");
  const [errorMessageInstagram, setErrorMessageInstagram] = useState("Error");

  const [errorWebsite, setErrorWebsite] = useState(false);
  const [errorTwitter, setErrorTwitter] = useState(false);
  const [errorInstagram, setErrorInstagram] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const isValidWebsite = (name: string) => {
    const re =
      /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    return re.test(String(name));
  };

  const validateInputs = () => {
    const nameValue = formValues.website.trim();
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
    if (formValues.instagram === "") {
      setErrorMessageInstagram("Instagram is required");
      setErrorInstagram(true);
      formIsValid = false;
    } else {
      setErrorInstagram(false);
      setFormInstagram(formValues.instagram);
    }
    return formIsValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }
    let token = await executeRecaptcha("enquiryFormSubmit").then(
      (gReCaptchaToken) => {
        return gReCaptchaToken;
      }
    );
    const data = {
      website: formValues.website,
      twitter: formValues.twitter,
      instagram: formValues.instagram,
      email: formValues.email,
      token,
    };

    if (validateInputs()) {
      console.log("Verification passed!");
      setLoading(true);

      axios
        .post(`/api/apply`, data)
        .then((response) => {
          setLoading(false);
          console.log(response);

          if (response.status === 201) {
            console.log("Message Sent.");
            setFormValues(initialValues);
            isModalOpen();
          } else if (response.status === 400) {
            alert("Sorry, something went wrong. Please try again.");
            setFormValues(initialValues);
          } else if (response.status === 200) {
            alert("Message Sent");
            setFormValues(initialValues);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setLoading(false);
      console.log("Verification failed.");
    }
  };

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Modal
  const isModalOpen = () => {
    setModalOpen(true);
  };
  const isModalClosed = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div
        className={`flex w-screen  h-screen  items-center justify-center bg-center bg-no-repeat bg-cover bg-applyPattern`}
      >
        <div className="flex mb-5 w-full px-5 md:px-0 md:w-[60vw] xl:w-[40vw] max-w-[1600px] flex-col items-center uppercase text-left text-green font-ibmPlex">
          <div className=" w-full  text-xs">
            <form id="contact-form" onSubmit={handleSubmit} method="POST">
              <h2 className="text-xs md:leading-[25px] w-5/6 md:w-full mb-12 ">
                WE ARE SELECTING THE BEST FASHION STORY TELLERS AROUND THE
                GLOBE. <br />
                IF YOU BELEIVE THIS IS YOU, PLEASE APPLY HERE.
              </h2>
              <div className="flex flex-col font-semibold">
                <div className="form-group ">
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
                      ? "text-red-500 font-thin leading-tight text-xs mb-2"
                      : "invisible leading-tight text-xs mb-2"
                  }
                >
                  {errorMessageEmail}
                </div>
              </div>
              <div className="flex flex-col ">
                <div className="form-group">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    className={
                      errorWebsite
                        ? "text-base bg-transparent py-3.5 px-4 mt-1 w-full h-10 border border-red-500 outline-0 transition-all"
                        : "text-base bg-transparent py-3.5 px-4 mt-1 w-full h-10 border border-blue outline-0 transition-all"
                    }
                    id="name1"
                    name="website"
                    value={formValues.website}
                    onChange={handleChange}
                    placeholder="mywebsite.com"
                    // required
                  />
                </div>
                <div
                  className={
                    errorWebsite
                      ? "text-red-500 font-thin leading-tight text-xs mb-2"
                      : "invisible leading-tight text-xs mb-2"
                  }
                >
                  {errorMessageWebsite}
                </div>
              </div>
              <div className="flex flex-col ">
                <div className="form-group ">
                  <label htmlFor="name">Twitter</label>
                  <input
                    type="text"
                    className={
                      errorTwitter
                        ? "text-base bg-transparent py-3.5 px-4 mt-1 w-full h-10 border border-red-500 outline-0 transition-all"
                        : "text-base bg-transparent py-3.5 px-4 mt-1 w-full h-10 border border-blue outline-0 transition-all"
                    }
                    id="school1"
                    name="twitter"
                    value={formValues.twitter}
                    onChange={handleChange}
                    placeholder="@mytwitter"
                    // required
                  />
                </div>
                <div
                  className={
                    errorTwitter
                      ? "text-red-500 font-thin leading-tight text-xs mb-2"
                      : "invisible leading-tight text-xs mb-2"
                  }
                >
                  {errorMessageTwitter}
                </div>
              </div>
              <div className="flex flex-col ">
                <div className="form-group ">
                  <label htmlFor="name">Instagram *</label>
                  <input
                    type="text"
                    className={
                      errorInstagram
                        ? "text-base bg-transparent py-3.5 px-4 mt-1 w-full h-10 border border-red-500 outline-0 transition-all"
                        : "text-base bg-transparent py-3.5 px-4 mt-1 w-full h-10 border border-blue outline-0 transition-all"
                    }
                    id="school1"
                    name="instagram"
                    value={formValues.instagram}
                    onChange={handleChange}
                    placeholder="@myinstagram"
                    // required
                  />
                </div>
                <div
                  className={
                    errorInstagram
                      ? "text-red-500 font-thin leading-tight text-xs mb-4"
                      : "invisible leading-tight text-xs mb-4"
                  }
                >
                  {errorMessageInstagram}
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue text-green font-xCompressed border border-green w-full uppercase tracking-[8px] mt-3 bg-white bg-opacity-20 hover:bg-opacity-40 py-[1.2vh] px-[7vh] z-2 text-2xl  "
              >
                {loading ? <ButtonSpinner /> : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ApplySubmitModal isModalClosed={isModalClosed} modalOpen={modalOpen} />
    </>
  );
};

export default ApplyComponent;
