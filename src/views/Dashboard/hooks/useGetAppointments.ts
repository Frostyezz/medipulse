import { useEffect, useMemo } from "react";
import { Appointment } from "@/services/graphql/schemas/appointment.schema";
import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";
import { useMediaQuery } from "@mantine/hooks";

const FETCH_APPOINTMENTS = gql`
  query GetMyAppointments {
    getMyAppointments {
      _id
      end
      start
      patientId
      patientName
      medicId
      importance
      title
    }
  }
`;

const useGetAppointments = (date: Date) => {
  const { data, error, loading } = useQuery<{
    getMyAppointments: Partial<Appointment>[];
  }>(FETCH_APPOINTMENTS, { fetchPolicy: "network-only" });
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 800px)");

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
  }, [error]);

  const appointments = useMemo(
    () =>
      data?.getMyAppointments
        .filter(({ end }) => dayjs(end).isSame(date, "day"))
        .slice(0, isMobile ? 2 : 7),
    [data, date, isMobile]
  );

  return { appointments, loading };
};

export default useGetAppointments;
