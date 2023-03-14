import React, { forwardRef } from "react";
import { Group, Avatar, Text, SelectItemProps } from "@mantine/core";
import { Profile } from "@/services/graphql/schemas/profile.schema";

const SelectPatientItem = forwardRef<
  HTMLDivElement,
  Partial<Profile> & SelectItemProps
>(({ avatar, firstName, lastName, ...props }, ref) => (
  <div {...props} ref={ref}>
    <Group noWrap>
      <Avatar radius={120} src={avatar} />
      <div>
        <Text>{[firstName, lastName].join(" ")}</Text>
      </div>
    </Group>
  </div>
));

SelectPatientItem.displayName = "SelectPatientItem";

export default SelectPatientItem;
