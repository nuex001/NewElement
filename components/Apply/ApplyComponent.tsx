import React, { useState } from "react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ApplySubmitModal from "./ApplySubmitModal";

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

  const isValidEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const isValidWebsite = (name: string) => {
    const re =
      /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    return re.test(String(name));
  };

  const validateInputs = () => {
    const nameValue = formValues.website.trim();
    const emailValue = formValues.email.trim();
    let formIsValid = true;

    // if (formValues.website === "") {
    //   setErrorMessageWebsite("Website is required");
    //   setErrorWebsite(true);
    //   formIsValid = false;
    // } else if (!isValidWebsite(formValues.website)) {
    //   setErrorMessageEmail("Provide a valid website");
    //   setErrorEmail(true);
    //   formIsValid = false;
    // } else {
    //   setErrorWebsite(false);
    //   setFormWebsite(formValues.website);
    // }

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
          } else {
            alert("Sorry, something went wrong. Please try again.");
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
                {loading ? (
                  <div role="status" className="flex justify-center">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mr-2 text-gray-200  animate-spin dark:text-green fill-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Submit"
                )}
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
