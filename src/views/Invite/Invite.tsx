import React from "react";
import { Flex, Divider } from "@mantine/core";
import SendInvitation from "./components/SendInvitation";

const Invite: React.FC = () => {
  return (
    <Flex
      direction="column"
      my={60}
      mx={40}
      sx={(theme) => ({
        width: "100%",
        [theme.fn.smallerThan("md")]: {
          margin: "60px 16px",
        },
      })}
    >
      <SendInvitation />
      <Divider size="md" />
    </Flex>
  );
};

export default Invite;
