import React from "react";
import { ActionIcon, Popover, Text } from "@mantine/core";
import { List } from "tabler-icons-react";

const ActionsButton: React.FC = () => {
  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <ActionIcon sx={{ height: "36px", width: "50px" }} variant="default">
          <List />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="sm">
          This is uncontrolled popover, it is opened when button is clicked
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
};

export default ActionsButton;
