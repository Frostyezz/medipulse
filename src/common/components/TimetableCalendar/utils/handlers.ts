import { DateSelectArg, CalendarApi } from "@fullcalendar/core";
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";

dayjs.extend(isBetween);

export const isContainedCheck = (
  start: Date,
  end: Date,
  calendar: CalendarApi
): boolean => {
  const events = calendar.getEvents();

  return (
    events.findIndex(
      (event) =>
        dayjs(start).isBetween(event.start, event.end) ||
        dayjs(end).isBetween(event.start, event.end) ||
        dayjs(event.start).isBetween(start, end) ||
        dayjs(event.end).isBetween(start, end)
    ) === -1
  );
};

export const isSameCheck = (
  start: Date,
  end: Date,
  calendar: CalendarApi
): boolean => {
  const events = calendar.getEvents();

  const index = events.findIndex(
    (event) => dayjs(end).isSame(event.end) && dayjs(start).isSame(event.start)
  );

  if (index !== -1) events[index].remove();

  return index === -1;
};

export const dateClick = (start: Date, calendar: CalendarApi) => {
  if (window.innerWidth >= 800) return;
  const end = dayjs(start).add(30, "m").toDate();

  const isContained = isContainedCheck(start, end, calendar);

  const isSame = isSameCheck(start, end, calendar);

  if (isContained && isSame) {
    calendar.addEvent({
      title: "",
      start: start.toISOString(),
      end: end.toISOString(),
      display: "background",
      color: "#228be6",
      extendedProps: {
        startTime: [
          dayjs(start).hour(),
          dayjs(start).minute() ? dayjs(start).minute() : "00",
          "00",
        ].join(":"),
        endTime: [
          dayjs(end).hour(),
          dayjs(start).minute() ? dayjs(start).minute() : "00",
          "00",
        ].join(":"),
        daysOfWeek: [String(dayjs(start).get("d"))],
        display: "background",
        color: "#228be6",
      },
    });
  }
};

export const select = (info: DateSelectArg) => {
  if (window.innerWidth <= 800) return;

  const isContained = isContainedCheck(
    info.start,
    info.end,
    info.view.calendar
  );

  const isSame = isSameCheck(info.start, info.end, info.view.calendar);

  if (isContained && isSame) {
    info.view.calendar.addEvent({
      title: "",
      start: info.startStr,
      end: info.endStr,
      display: "background",
      color: "#228be6",
      extendedProps: {
        startTime: [
          dayjs(info.start).hour(),
          dayjs(info.start).minute() ? dayjs(info.start).minute() : "00",
          "00",
        ].join(":"),
        endTime: [
          dayjs(info.end).hour(),
          dayjs(info.start).minute() ? dayjs(info.start).minute() : "00",
          "00",
        ].join(":"),
        daysOfWeek: [String(dayjs(info.start).get("d"))],
        display: "background",
        color: "#228be6",
      },
    });
  }
};

const handlers = { select };

export default handlers;
