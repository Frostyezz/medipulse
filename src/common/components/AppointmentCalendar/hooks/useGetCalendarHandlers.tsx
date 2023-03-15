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

const useGetCalendarHandlers = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 800px)");
  const { sendTransferRequest } = useCreateAppointment();

  const select = useCallback((info: DateSelectArg) => {
    info.view.calendar.addEvent({
      start: info.start,
      end: info.end,
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
        await sendTransferRequest({
          variables: { input: ev.event.extendedProps },
        });
      },
    });
  }, []);

  const eventChange = useCallback((changeInfo: EventChangeArg) => {
    console.log(changeInfo.event.startStr, changeInfo.event.endStr);
  }, []);

  return { select, dateClick, eventAdd, eventChange };
};

export default useGetCalendarHandlers;
