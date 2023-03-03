import React from "react";
import { useAppSelector } from "@/services/redux/hooks";
import { ROLES } from "@/services/graphql/types/enums";
import CreateMedicProfile from "./CreateMedicProfile/CreateMedicProfile";

const CreateProfileControllerComponents: Record<ROLES, React.ReactElement> = {
  [ROLES.MEDIC]: <CreateMedicProfile />,
  [ROLES.NURSE]: <p>s</p>,
  [ROLES.PATIENT]: <p>s</p>,
};

const CreateProfileController: React.FC = () => {
  const role = useAppSelector((store) => store.user?.role);
  return CreateProfileControllerComponents[role ?? ROLES.MEDIC];
};

export default CreateProfileController;
