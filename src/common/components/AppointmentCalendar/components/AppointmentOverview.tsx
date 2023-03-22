import React from "react";
import { Divider, Flex, List, Skeleton, Text, Title } from "@mantine/core";
import { EventClickArg } from "@fullcalendar/core";
import useFetchProfile from "@/common/hooks/useFetchProfile";
import ProfileInfo from "@/views/TransferRequests/components/ProfileInfo";
import { APPOINTMENT_STATUS, ROLES } from "@/services/graphql/types/enums";
import AppointmentHeader from "./AppointmentHeader";
import AppointmentBody from "./AppointmentBody";

const AppointmentOverview: React.FC<EventClickArg> = ({ event }) => {
  const patient = useFetchProfile(event.extendedProps.patientId);

  return (
    <Flex direction="column" gap={12}>
      <AppointmentHeader
        _id={event.extendedProps._id}
        status={event.extendedProps.status as APPOINTMENT_STATUS}
      />
      <Divider />
      {event.extendedProps.patientName || !!patient ? (
        <ProfileInfo
          {...(patient ?? {
            firstName: event.extendedProps.patientName,
            role: ROLES.PATIENT,
          })}
        />
      ) : (
        <Skeleton height={95} width={300} />
      )}
      <Divider />
      <AppointmentBody event={event} />
    </Flex>
  );
};

export default AppointmentOverview;
