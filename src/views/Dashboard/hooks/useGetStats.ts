import { GetStatsResult } from "@/services/graphql/schemas/profile.schema";
import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

const FETCH_STATS = gql`
  query GetStats {
    getStats {
      appointmentPercentage
      appointments
      invitePercentage
      invites
      patientPercentage
      patients
    }
  }
`;

const useGetStats = () => {
  const { data, error, loading } = useQuery<{
    getStats: Partial<GetStatsResult>;
  }>(FETCH_STATS, { fetchPolicy: "network-only" });
  const { t } = useTranslation();

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
  }, [error]);

  return { data, loading };
};

export default useGetStats;
