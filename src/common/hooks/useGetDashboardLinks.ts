import { ROLES } from "@/services/graphql/types/enums";
import { useAppSelector } from "@/services/redux/hooks";
import {
  IconProps,
  LayoutDashboard,
  UserPlus,
  Users,
  MapSearch,
  UserExclamation,
  EditCircle,
} from "tabler-icons-react";
import { ROUTES } from "../utils/routes";

interface DashboardLinkType {
  label: string;
  initiallyOpened?: boolean;
  icon: React.FunctionComponent<IconProps>;
  to: ROUTES;
}

const links: Record<ROLES, DashboardLinkType[]> = {
  [ROLES.MEDIC]: [
    {
      initiallyOpened: true,
      label: "dashboard.label.home",
      to: ROUTES.MEDIC_DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      label: "dashboard.label.invite",
      to: ROUTES.MEDIC_INVITE,
      icon: UserPlus,
    },
    {
      label: "dashboard.label.patients",
      to: ROUTES.MEDIC_PATIENTS,
      icon: Users,
    },
    {
      label: "dashboard.label.transfer",
      to: ROUTES.MEDIC_TRANSFER_REQUESTS,
      icon: UserExclamation,
    },
    {
      label: "dashboard.label.update",
      to: ROUTES.MEDIC_UPDATE_PROFILE,
      icon: EditCircle,
    },
  ],
  [ROLES.NURSE]: [
    {
      initiallyOpened: true,
      label: "dashboard.label.home",
      to: ROUTES.MEDIC_DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      label: "dashboard.label.invite",
      to: ROUTES.MEDIC_INVITE,
      icon: UserPlus,
    },
    {
      label: "dashboard.label.patients",
      to: ROUTES.MEDIC_PATIENTS,
      icon: Users,
    },
  ],
  [ROLES.PATIENT]: [
    {
      initiallyOpened: true,
      label: "dashboard.label.home",
      to: ROUTES.MEDIC_DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      label: "dashboard.label.doctors",
      to: ROUTES.PATIENT_DOCTORS,
      icon: MapSearch,
    },
  ],
};

const useGetDashboardLinks = () => {
  const role = useAppSelector((store) => store.user.role) ?? ROLES.MEDIC;

  return links[role];
};

export default useGetDashboardLinks;
