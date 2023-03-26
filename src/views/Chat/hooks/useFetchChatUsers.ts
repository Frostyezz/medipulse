import { useEffect } from "react";
import { Profile } from "@/services/graphql/schemas/profile.schema";
import { ROLES } from "@/services/graphql/types/enums";
import { useAppSelector } from "@/services/redux/hooks";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { showNotification } from "@mantine/notifications";
import { chatQueries } from "../utils/queries";

const useFetchChatUsers = () => {
  const { role } = useAppSelector((store) => store.user) ?? {};

  const { data, error, loading } = useQuery<{
    getMyMedicalStaff?: Partial<Profile>[];
    getMyPatientsAndMedic?: Partial<Profile[]>;
    getMyPatientsAndNurses?: Partial<Profile[]>;
  }>(chatQueries[role ?? ROLES.MEDIC]);
  const { t } = useTranslation();

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
  }, [error]);

  return {
    loading,
    users:
      data?.getMyMedicalStaff ||
      data?.getMyPatientsAndMedic ||
      data?.getMyPatientsAndNurses,
  };
};

export default useFetchChatUsers;
