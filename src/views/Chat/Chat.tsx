import React from "react";
import { Flex } from "@mantine/core";
import Users from "./components/Users";
import Messenger from "./components/Messenger";

const Chat: React.FC = () => {
  return (
    <Flex direction="column" gap={12}>
      <Users />
      <Messenger />
    </Flex>
  );
};

export default Chat;
