import { useEffect } from "react";
import { Appointment } from "@/services/graphql/schemas/appointment.schema";
import { useAppDispatch } from "@/services/redux/hooks";
import { gql, useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { showNotification } from "@mantine/notifications";
import { REMOVE_APPOINTMENT } from "@/services/redux/slices/appointmentsSlice";

const DELETE_APPOITMENT = gql`
  mutation DeleteAppointment($input: DeleteAppoitmentById!) {
    deleteAppointment(input: $input)
  }
`;

const useDeleteAppointment = () => {
  const [deleteAppointment, { error, loading, data }] = useMutation<{
    deleteAppointment: Appointment["_id"];
  }>(DELETE_APPOITMENT);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: error.message,
        color: "red",
      });
    else if (!loading && data?.deleteAppointment) {
      dispatch(REMOVE_APPOINTMENT(data.deleteAppointment));
      showNotification({
        title: t("appointments.create.delete"),
        message: "",
        color: "green",
      });
    }
  }, [error, data, loading]);

  return deleteAppointment;
};

export default useDeleteAppointment;
