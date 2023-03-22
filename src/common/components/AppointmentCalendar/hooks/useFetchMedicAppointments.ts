import { Appointment } from "@/services/graphql/schemas/appointment.schema";
import {
  APPOINTMENT_IMPORTANCE,
  APPOINTMENT_STATUS,
  ROLES,
} from "@/services/graphql/types/enums";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { SET_APPOINTMENTS } from "@/services/redux/slices/appointmentsSlice";
import { gql, useQuery } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { importanceColorMap, pendingColor } from "../utils/colors";

const FETCH_MEDIC_APPOINTMENTS = gql`
  query GetMedicAppointments {
    getMedicAppointments {
      _id
      end
      importance
      patientId
      patientName
      start
      status
      title
      createdAt
    }
  }
`;

const useFetchMedicAppointments = () => {
  const { data, error, loading } = useQuery<{
    getMedicAppointments: Partial<Appointment>[];
  }>(FETCH_MEDIC_APPOINTMENTS, {
    fetchPolicy: "network-only",
  });
  const { t } = useTranslation();
  const { role, _id } = useAppSelector((store) => store.user) ?? {};
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
    else if (!loading && data?.getMedicAppointments) {
      dispatch(
        SET_APPOINTMENTS(
          data?.getMedicAppointments.map((el) => ({
            ...el,
            editable: role !== ROLES.PATIENT ? true : _id === el.patientId,
            backgroundColor:
              el.status === APPOINTMENT_STATUS.PENDING
                ? pendingColor
                : importanceColorMap[
                    el.importance ?? APPOINTMENT_IMPORTANCE.NORMAL
                  ],
            extendedProps: el,
          }))
        )
      );
    }
  }, [error, data, loading, _id]);
};

export default useFetchMedicAppointments;
