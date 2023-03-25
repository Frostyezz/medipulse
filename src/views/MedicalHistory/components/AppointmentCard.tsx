import React from "react";
import { Paper, Flex, List, Title, Text, Avatar } from "@mantine/core";
import { Appointment } from "@/services/graphql/schemas/appointment.schema";
import { useTranslation } from "react-i18next";
import {
  CalendarEvent,
  CalendarTime,
  ClipboardText,
  MedicalCross,
  Notes,
} from "tabler-icons-react";
import dayjs from "dayjs";
import { importanceColorMap } from "@/common/components/AppointmentCalendar/utils/colors";
import { APPOINTMENT_IMPORTANCE } from "@/services/graphql/types/enums";
import TimeAgo from "@/common/components/TimeAgo/TimeAgo";
import useFetchProfile from "@/common/hooks/useFetchProfile";

const AppointmentCard: React.FC<Partial<Appointment>> = (appointment) => {
  const { t } = useTranslation();
  const medic = useFetchProfile(appointment?.medicId as string);

  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        maxWidth: "500px",
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <List spacing="md" mt={12}>
        <List.Item icon={<ClipboardText color="#868e96" />}>
          <Title order={6}>{appointment?.title}</Title>
        </List.Item>
        <List.Item icon={<CalendarTime color="#868e96" />}>
          <Title order={6}>{t("medicalHistory.createdAt")}</Title>
          <Text c="dimmed" fz="sm">
            <TimeAgo date={appointment?.createdAt ?? ""} />
          </Text>
        </List.Item>
        <List.Item icon={<CalendarEvent color="#868e96" />}>
          <Title order={6}>
            {[
              dayjs(appointment?.start).format("HH"),
              ":",
              dayjs(appointment?.start).format("mm"),
            ]}
            {" - "}
            {[
              dayjs(appointment?.end).format("HH"),
              ":",
              dayjs(appointment?.end).format("mm"),
            ]}
          </Title>
          <Text c="dimmed" ta="center" fz="sm">
            {dayjs(appointment?.start).format("dddd")}
            {", "}
            {[
              dayjs(appointment?.start).format("DD"),
              dayjs(appointment?.start).format("MMMM"),
              dayjs(appointment?.start).format("YYYY"),
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
                    appointment?.importance as APPOINTMENT_IMPORTANCE
                  ],
              }}
              color="#868e96"
            />
          }
        >
          <Title order={6}>{t("appointments.details.importance")}</Title>
          <Text c="dimmed" fz="sm">
            {t(`appointment.importance.${appointment?.importance}`)}
          </Text>
        </List.Item>
        <List.Item icon={<MedicalCross color="#868e96" />}>
          <Title order={6}>{t("roles.MEDIC")}</Title>
          <Text c="dimmed" fz="sm">
            {[medic?.firstName, medic?.lastName].join(" ")}
          </Text>
        </List.Item>
        {!!appointment?.notes?.length && (
          <List.Item icon={<Notes color="#868e96" />}>
            <Title order={6}>{t("medicalHistory.notes")}</Title>
            <Text c="dimmed" fz="sm">
              {appointment?.notes?.[0]}
            </Text>
          </List.Item>
        )}
      </List>
    </Paper>
  );
};

export default AppointmentCard;
