import React, { useRef } from "react";
import dayjs from "dayjs";
import { useAppSelector } from "@/services/redux/hooks";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import useFetchMedicSchedule from "@/views/Appointments/hooks/useFetchMedicSchedule";
import useGetCalendarHandlers from "./hooks/useGetCalendarHandlers";
import { useMediaQuery } from "@mantine/hooks";
import useFetchMedicAppointments from "./hooks/useFetchMedicAppointments";

const AppointmentCalendar = React.forwardRef<FullCalendar | null>((_, ref) => {
  useFetchMedicAppointments();
  const { language } = useAppSelector((store) => store.user);
  const schedule = useFetchMedicSchedule();
  const appointments = useAppSelector((store) => store.appointment);
  const calendarRef = useRef<FullCalendar | null>(null);
  const { select, dateClick, eventAdd } = useGetCalendarHandlers(schedule);
  const isMobile = useMediaQuery("(max-width: 800px)");

  return (
    <FullCalendar
      ref={calendarRef}
      selectConstraint="schedule"
      eventConstraint="schedule"
      eventOverlap={(still) => !!still.groupId}
      selectOverlap={(overlaped) => !!overlaped.groupId}
      height="766px"
      displayEventEnd={!isMobile}
      // eventContent={EventContent}
      //@ts-ignore
      events={[
        ...schedule.map((el) => ({
          ...el,
          groupId: "schedule",
        })),
        ...appointments,
      ]}
      eventAdd={eventAdd}
      dateClick={(arg) => dateClick(arg.date, arg.view.calendar)}
      locale={language}
      nowIndicator
      now={dayjs().set("d", 0).toISOString()}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      dayHeaderFormat={{ weekday: "short" }}
      weekends={false}
      firstDay={1}
      eventResizableFromStart
      editable
      selectable
      select={select}
      eventTimeFormat={{
        hour12: false,
        hour: "numeric",
        minute: "2-digit",
        omitZeroMinute: false,
        meridiem: "short",
      }}
      slotLabelFormat={[
        {
          hour12: false,
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: "short",
        },
      ]}
      allDaySlot={false}
      slotMinTime="08:00:00"
      slotMaxTime="21:00:00"
    />
  );
});

AppointmentCalendar.displayName = "AppointmentCalendar";

export default AppointmentCalendar;
