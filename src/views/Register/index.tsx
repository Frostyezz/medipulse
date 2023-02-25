import React from "react";
import RegisterStepper from "@/common/components/RegisterStepper";
import CreateAccount from "./CreateAccount";

const RegisterController: React.FC = () => {
  return (
    <>
      <RegisterStepper />
      <CreateAccount />
    </>
  );
};

export default RegisterController;
