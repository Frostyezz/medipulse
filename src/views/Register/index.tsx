import React, { useMemo } from "react";
import CreateAccount from "./CreateAccount";
import { useAppSelector } from "@/services/redux/hooks";
import VerifyEmail from "./VerifyEmail";
import Redirect from "@/common/components/Redirect";
import { ROUTES } from "@/common/utils/routes";
import CreateProfile from "./CreateProfile/CreateProfile";
import { ROLES } from "@/services/graphql/types/enums";

const RedirectPath: Record<ROLES, ROUTES> = {
  [ROLES.MEDIC]: ROUTES.MEDIC_DASHBOARD,
  [ROLES.NURSE]: ROUTES.NURSE_DASHBOARD,
  [ROLES.PATIENT]: ROUTES.PATIENT_DASHBOARD,
};

const RegisterController: React.FC = () => {
  const { registerStep, role } = useAppSelector((store) => store.user) ?? {};

  const RegisterControllerComponents = useMemo<
    Record<number, React.ReactElement>
  >(
    () => ({
      0: <CreateAccount />,
      1: <VerifyEmail />,
      2: <CreateProfile />,
      3: <Redirect to={ROUTES[`${role ?? ROLES.MEDIC}_DASHBOARD`]} replace />,
    }),
    [role]
  );
  return RegisterControllerComponents[registerStep ?? 0];
};

export default RegisterController;
