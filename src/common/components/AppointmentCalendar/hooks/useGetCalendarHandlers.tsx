import { useCallback } from "react";
import dayjs from "dayjs";
import {
  CalendarApi,
  DateSelectArg,
  EventAddArg,
  EventChangeArg,
} from "@fullcalendar/core";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import EventAddForm from "../components/EventAddForm";
import useCreateAppointment from "./useCreateAppointment";
import useUpdateAppointment from "@/common/hooks/useUpdateAppointment";
import { APPOINTMENT_STATUS, ROLES } from "@/services/graphql/types/enums";
import { useAppSelector } from "@/services/redux/hooks";

const useGetCalendarHandlers = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 800px)");
  const { createAppointment } = useCreateAppointment();
  const updateAppointment = useUpdateAppointment();
  const isMedic = useAppSelector(store => store.user.role) === ROLES.MEDIC;

  const select = useCallback((info: DateSelectArg) => {
    info.view.calendar.addEvent({
      start: info.start,
      end: info.end,
      extendedProps: { new: true }
    });
  }, []);

  const dateClick = useCallback(
    (start: Date, calendar: CalendarApi) => {
      if (!isMobile) return;
      const end = dayjs(start).add(30, "m").toDate();
      calendar.addEvent({
        start: start,
        end: end,
      });
    },
    [isMobile]
  );

  const eventAdd = useCallback((ev: EventAddArg) => {
    modals.openConfirmModal({
      title: t("appointments.modal.add.title"),
      children: <EventAddForm {...ev} />,
      labels: {
        confirm: t("appointments.modal.add.confirm"),
        cancel: t("appointments.modal.add.cancel"),
      },
      closeOnClickOutside: false,
      centered: true,
      withCloseButton: false,
      onCancel: ev.revert,
      onConfirm: async () => {
        ev.event.setExtendedProp('new', undefined);
        await createAppointment({
          variables: { input: ev.event.extendedProps },
        });
      },
    });
  }, []);

  const eventChange = useCallback((changeInfo: EventChangeArg) => {
    if (!changeInfo.oldEvent.extendedProps.new) {
      updateAppointment({
        variables: {
          input: {
            id: changeInfo.event._def.extendedProps._id,
            start: changeInfo.event.startStr,
            end: changeInfo.event.endStr,
            status: isMedic ? undefined : APPOINTMENT_STATUS.PENDING,
          },
        },
      });
    }
  }, [isMedic]);

  return { select, dateClick, eventAdd, eventChange };
};

export default useGetCalendarHandlers;
