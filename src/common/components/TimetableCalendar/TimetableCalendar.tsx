import { forwardRef, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useAppSelector } from "@/services/redux/hooks";
import handlers, { dateClick } from "./utils/handlers";
import dayjs from "dayjs";

const TimetableCalendar = forwardRef<
  FullCalendar | null,
  { currentDate?: Date }
>(({ currentDate }, ref) => {
  const { language } = useAppSelector((store) => store.user);
  const { schedule } = useAppSelector((store) => store.profile);

  const events = useMemo(
    () =>
      schedule?.map((ev) => {
        const startTime = ev.startTime.split(":");
        const endTime = ev.endTime.split(":");

        return {
          display: "background",
          color: "#228be6",
          title: "",
          start: dayjs(currentDate)
            .set("h", Number(startTime[0]))
            .set("m", Number(startTime[1]))
            .set("s", Number(startTime[2]))
            .set("d", Number(ev.daysOfWeek[0]))
            .toISOString(),
          end: dayjs(currentDate)
            .set("h", Number(endTime[0]))
            .set("m", Number(endTime[1]))
            .set("s", Number(endTime[2]))
            .set("d", Number(ev.daysOfWeek[0]))
            .toISOString(),
          extendedProps: ev,
        };
      }),
    [schedule, currentDate]
  );

  return (
    <FullCalendar
      ref={ref}
      events={events}
      height="702px"
      locale={language}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      dayHeaderFormat={{ weekday: "short" }}
      weekends={false}
      firstDay={1}
      editable
      dateClick={(info) => dateClick(info.date, info.view.calendar)}
      selectable
      {...handlers}
      slotLabelFormat={[
        {
          hour12: false,
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: "short",
        },
      ]}
      headerToolbar={false}
      allDaySlot={false}
      slotMinTime="08:00:00"
      slotMaxTime="21:00:00"
    />
  );
});

TimetableCalendar.displayName = "TimetableCalendar";

export default TimetableCalendar;
