import { useEffect } from "react";
import { Appointment } from "@/services/graphql/schemas/appointment.schema";
import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { showNotification } from "@mantine/notifications";

const FETCH_PATIENT_APPOINTMENTS = gql`
  query GetPatientAppointments($input: GetAppointmentsByPatientId!) {
    getPatientAppointments(input: $input) {
      _id
      createdAt
      end
      files
      importance
      medicId
      patientId
      notes
      start
      title
    }
  }
`;

const useFetchPatientAppointments = (id: string) => {
  const { data, error, loading } = useQuery<{
    getPatientAppointments: Partial<Appointment>[];
  }>(FETCH_PATIENT_APPOINTMENTS, {
    fetchPolicy: "network-only",
    variables: { input: { id } },
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
  }, [error]);

  return { appointments: data?.getPatientAppointments, loading };
};

export default useFetchPatientAppointments;
