import React from "react";
import CreateAccount from "./CreateAccount";
import { useAppSelector } from "@/services/redux/hooks";
import VerifyEmail from "./VerifyEmail";
import Redirect from "@/common/components/Redirect";
import { ROUTES } from "@/common/utils/routes";
import CreateProfileController from "./CreateProfile/CreateProfileController";

const RegisterControllerComponents: Record<number, React.ReactElement> = {
  0: <CreateAccount />,
  1: <VerifyEmail />,
  2: <CreateProfileController />,
  3: <Redirect to={ROUTES.ROOT} replace />,
};

const RegisterController: React.FC = () => {
  const registerStep = useAppSelector((store) => store.user?.registerStep);
  return RegisterControllerComponents[registerStep ?? 0];
};

export default RegisterController;
