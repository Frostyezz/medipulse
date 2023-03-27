import React from "react";
import { Paper, Text, Avatar } from "@mantine/core";
import { Appointment } from "@/services/graphql/schemas/appointment.schema";
import { useDashboardStyles } from "../useDashboardStyles";
import { useAppSelector } from "@/services/redux/hooks";
import { ROLES } from "@/services/graphql/types/enums";
import useFetchProfile from "@/common/hooks/useFetchProfile";
import dayjs from "dayjs";

const AppointmentCard: React.FC<Partial<Appointment>> = (appointment) => {
  const { classes } = useDashboardStyles();
  const isPatient =
    useAppSelector((store) => store.user.role) === ROLES.PATIENT;
  const profile = useFetchProfile(
    isPatient
      ? (appointment?.medicId as string)
      : (appointment?.patientId as string)
  );

  return (
    <Paper className={classes.stat} radius="md" shadow="md" p="xs">
      <Avatar
        size="lg"
        radius="xl"
        className={classes.avatar}
        src={profile?.avatar}
      />
      <div>
        <Text className={classes.label}>{appointment?.title}</Text>
        <Text fz="xs" className={classes.time}>
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
        </Text>
      </div>
    </Paper>
  );
};

export default AppointmentCard;
