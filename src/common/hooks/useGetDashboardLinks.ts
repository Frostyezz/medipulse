import { ROLES } from "@/services/graphql/types/enums";
import { useAppSelector } from "@/services/redux/hooks";
import { useMemo } from "react";
import {
  IconProps,
  LayoutDashboard,
  UserPlus,
  Users,
  MapSearch,
  UserExclamation,
  EditCircle,
  CalendarEvent,
  ReportMedical,
} from "tabler-icons-react";
import { createPath } from "../utils/createPath";
import { ROUTES } from "../utils/routes";

interface DashboardLinkType {
  label: string;
  initiallyOpened?: boolean;
  icon: React.FunctionComponent<IconProps>;
  to: ROUTES;
}

const useGetDashboardLinks = () => {
  const { role, _id } = useAppSelector((store) => store.user);

  const links = useMemo<Record<ROLES, DashboardLinkType[]>>(
    () => ({
      [ROLES.MEDIC]: [
        {
          initiallyOpened: true,
          label: "dashboard.label.home",
          to: ROUTES.MEDIC_DASHBOARD,
          icon: LayoutDashboard,
        },
        {
          label: "dashboard.label.appointments",
          to: ROUTES.MEDIC_APPOINTMENTS,
          icon: CalendarEvent,
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
          to: ROUTES.PATIENT_DASHBOARD,
          icon: LayoutDashboard,
        },
        {
          label: "dashboard.label.appointments",
          to: ROUTES.PATIENT_APPOINTMENTS,
          icon: CalendarEvent,
        },
        {
          label: "dashboard.label.medicalHistory",
          to: createPath(ROUTES.MEDICAL_HISTORY_ID, {
            id: _id ?? "",
          }) as ROUTES,
          icon: ReportMedical,
        },
        {
          label: "dashboard.label.doctors",
          to: ROUTES.PATIENT_DOCTORS,
          icon: MapSearch,
        },
        {
          label: "dashboard.label.update",
          to: ROUTES.PATIENT_UPDATE_PROFILE,
          icon: EditCircle,
        },
      ],
    }),
    [_id]
  );

  return links[role ?? ROLES.MEDIC];
};

export default useGetDashboardLinks;
