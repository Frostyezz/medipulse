import { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { showNotification } from "@mantine/notifications";
import { Appointment } from "@/services/graphql/schemas/appointment.schema";
import { useAppDispatch } from "@/services/redux/hooks";
import { ADD_APPOINTMENT } from "@/services/redux/slices/appointmentsSlice";
import {
  APPOINTMENT_IMPORTANCE,
  APPOINTMENT_STATUS,
} from "@/services/graphql/types/enums";
import { importanceColorMap, pendingColor } from "../utils/colors";

const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($input: CreateAppointmentInput!) {
    createAppointment(input: $input) {
      _id
      end
      start
      status
      importance
      patientId
      medicId
      title
    }
  }
`;

const useCreateAppointment = () => {
  const [sendTransferRequest, { data, error, loading }] = useMutation<{
    createAppointment: Partial<Appointment>;
  }>(CREATE_APPOINTMENT);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error)
      showNotification({
        title: t(error.message),
        message: "",
        color: "red",
      });
    else if (data?.createAppointment && !loading) {
      dispatch(
        ADD_APPOINTMENT({
          ...data.createAppointment,
          backgroundColor:
            data.createAppointment.status === APPOINTMENT_STATUS.PENDING
              ? pendingColor
              : importanceColorMap[
                  data.createAppointment.importance ??
                    APPOINTMENT_IMPORTANCE.NORMAL
                ],
        })
      );
      showNotification({
        title: t("appointments.create.success"),
        message: "",
        color: "green",
      });
    }
  }, [data, error, loading]);

  return { sendTransferRequest, loading };
};

export default useCreateAppointment;
