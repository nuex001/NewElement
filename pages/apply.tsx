import React from "react";
import ApplyComponent from "../components/Apply/ApplyComponent";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const Apply = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6LdRQsklAAAAAMODTeLAWfDsQXcrpPoUMZg8kAAt"
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      {" "}
      <ApplyComponent />
    </GoogleReCaptchaProvider>
  );
};

export default Apply;
