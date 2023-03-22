import React from "react";
import { EventClickArg } from "@fullcalendar/core";
import { Flex, List, Text, Title } from "@mantine/core";
import { CalendarEvent, ClipboardText } from "tabler-icons-react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ro";
import { useAppSelector } from "@/services/redux/hooks";
import { useTranslation } from "react-i18next";
import { importanceColorMap } from "../utils/colors";
import { APPOINTMENT_IMPORTANCE } from "@/services/graphql/types/enums";

const AppointmentBody: React.FC<
  Omit<EventClickArg, "el" | "jsEvent" | "view">
> = ({ event }) => {
  const language = useAppSelector((store) => store.user.language);
  dayjs.locale(language);
  const { t } = useTranslation();

  return (
    <List spacing="md" mt={12}>
      <List.Item icon={<ClipboardText color="#868e96" />}>
        <Title order={6}>{event.extendedProps.title}</Title>
      </List.Item>
      <List.Item icon={<CalendarEvent color="#868e96" />}>
        <Title order={6}>
          {[
            dayjs(event.start).format("HH"),
            ":",
            dayjs(event.start).format("mm"),
          ]}
          {" - "}
          {[dayjs(event.end).format("HH"), ":", dayjs(event.end).format("mm")]}
        </Title>
        <Text c="dimmed" ta="center" fz="sm">
          {dayjs(event.start).format("dddd")}
          {", "}
          {[
            dayjs(event.start).format("DD"),
            dayjs(event.start).format("MMMM"),
            dayjs(event.start).format("YYYY"),
          ].join(" ")}
        </Text>
      </List.Item>
      <List.Item
        icon={
          <Flex
            mt={2}
            sx={{
              width: "18px",
              height: "18px",
              marginRight: "3px",
              marginLeft: "3px",
              borderRadius: "4px",
              backgroundColor:
                importanceColorMap[
                  event.extendedProps.importance as APPOINTMENT_IMPORTANCE
                ],
            }}
            color="#868e96"
          />
        }
      >
        <Title order={6}>{t("appointments.details.importance")}</Title>
        <Text c="dimmed" fz="sm">
          {t(`appointment.importance.${event.extendedProps.importance}`)}
        </Text>
      </List.Item>
    </List>
  );
};

export default AppointmentBody;
