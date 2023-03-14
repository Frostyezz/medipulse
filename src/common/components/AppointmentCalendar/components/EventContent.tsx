import React from "react";
import { EventContentArg } from "@fullcalendar/core";
import { Flex } from "@mantine/core";

const EventContent: React.FC<EventContentArg> = (props) => {
  return (
    <Flex sx={{ maxWidth: "100%" }} {...props} direction="column">
      {props.event._def.extendedProps.patientId}
    </Flex>
  );
};

export default EventContent;
