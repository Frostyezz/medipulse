import { useCallback, useRef } from "react";
import dayjs from "dayjs";
import {
  CalendarApi,
  DateSelectArg,
  EventAddArg,
  EventChangeArg,
  EventClickArg,
} from "@fullcalendar/core";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import EventAddForm from "../components/EventAddForm";
import useCreateAppointment from "./useCreateAppointment";
import useUpdateAppointment from "@/common/hooks/useUpdateAppointment";
import { APPOINTMENT_STATUS, ROLES } from "@/services/graphql/types/enums";
import { useAppSelector } from "@/services/redux/hooks";
import AppointmentOverview from "../components/AppointmentOverview";
import { ActionIcon, Badge, Flex } from "@mantine/core";

const useGetCalendarHandlers = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 800px)");
  const { createAppointment } = useCreateAppointment();
  const updateAppointment = useUpdateAppointment();
  const isMedic = useAppSelector((store) => store.user.role) === ROLES.MEDIC;
  const isCreating = useRef(false);

  const select = useCallback((info: DateSelectArg) => {
    isCreating.current = true;
    info.view.calendar.addEvent({
      start: info.start,
      end: info.end,
    });
  }, []);

  const dateClick = useCallback(
    (start: Date, calendar: CalendarApi) => {
      if (!isMobile) return;
      const end = dayjs(start).add(30, "m").toDate();
      isCreating.current = true;
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
        isCreating.current = false;
        await createAppointment({
          variables: { input: ev.event.extendedProps },
        });
      },
    });
  }, []);

  const eventChange = useCallback(
    (changeInfo: EventChangeArg) => {
      if (!isCreating.current) {
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
    },
    [isMedic, isCreating.current]
  );

  const eventClick = useCallback((info: EventClickArg) => {
    modals.open({
      withCloseButton: false,
      children: <AppointmentOverview {...info} />,
      centered: true,
    });
  }, []);

  return { select, dateClick, eventAdd, eventChange, eventClick };
};

export default useGetCalendarHandlers;
