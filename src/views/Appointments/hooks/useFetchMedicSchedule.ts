import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { useTranslation } from "react-i18next";
import { Schedule } from "@/services/graphql/schemas/profile.schema";
import { useAppSelector } from "@/services/redux/hooks";
import { ROLES } from "@/services/graphql/types/enums";

const FETCH_MEDIC_SCHEDULE = gql`
  query GetMedicSchedule {
    getMedicProfile {
      schedule {
        color
        daysOfWeek
        display
        endTime
        startTime
      }
    }
  }
`;

const useFetchMedicSchedule = () => {
  const { t } = useTranslation();
  const { role } = useAppSelector((store) => store.user);
  const { schedule } = useAppSelector((store) => store.profile);
  const { data, error } = useQuery<{
    getMedicProfile: { schedule: Schedule[] } | null;
  }>(FETCH_MEDIC_SCHEDULE, {
    skip: role === ROLES.MEDIC,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
  }, [error]);

  return data?.getMedicProfile?.schedule
    ? data?.getMedicProfile?.schedule
    : schedule ?? [];
};

export default useFetchMedicSchedule;
