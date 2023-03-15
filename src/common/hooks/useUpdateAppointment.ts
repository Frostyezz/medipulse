import { useEffect } from "react";
import { Appointment } from "@/services/graphql/schemas/appointment.schema";
import { useAppDispatch } from "@/services/redux/hooks";
import { UPDATE_APPOINTMENT } from "@/services/redux/slices/appointmentsSlice";
import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

const UPDATE_APPOINTMENT_GQL = gql`
  mutation UpdateAppointment($input: UpdateAppointmentInput!) {
    updateAppointment(input: $input) {
      _id
      end
      start
      patientName
      patientId
      importance
      medicId
      notes
      files
      status
      title
      createdAt
    }
  }
`;

const useUpdateAppointment = () => {
  const [updateAppointment, { error, loading, data }] = useMutation<{
    updateAppointment: Partial<Appointment>;
  }>(UPDATE_APPOINTMENT_GQL);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: error.message,
        color: "red",
      });
    else if (!loading && data?.updateAppointment) {
      dispatch(UPDATE_APPOINTMENT(data.updateAppointment));
      showNotification({
        title: t("appointments.create.update"),
        message: "",
        color: "green",
      });
    }
  }, [error, data]);

  return updateAppointment;
};

export default useUpdateAppointment;
