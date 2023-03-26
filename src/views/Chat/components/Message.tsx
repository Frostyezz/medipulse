import React from "react";
import { Message } from "@/services/graphql/schemas/chat.schema";
import { Flex, Avatar, Text } from "@mantine/core";
import useFetchProfile from "@/common/hooks/useFetchProfile";
import { useAppSelector } from "@/services/redux/hooks";

const ChatMessage: React.FC<Message> = ({
  content,
  receiver,
  sender,
  sentAt,
}) => {
  const receiverProfile = useFetchProfile((sender as string) ?? "");
  const senderProfile = useAppSelector((store) => store.profile);

  return (
    <Flex
      my={6}
      gap={12}
      className="animate__animated animate__fadeInUp animate__faster"
      sx={{
        maxWidth: "90%",
        alignSelf:
          sender !== senderProfile.contextId ? "flex-start" : "flex-end",
      }}
    >
      {sender !== senderProfile.contextId && (
        <Avatar src={receiverProfile?.avatar} radius="xl" />
      )}
      <Text
        sx={(theme) => ({
          padding: "6px 12px",
          width: "max-content",
          backgroundColor:
            sender !== senderProfile.contextId
              ? theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.cyan[6]
              : "#228be6",
          color: "white",
          borderRadius: "6px",
        })}
      >
        {content}
      </Text>
    </Flex>
  );
};

export default ChatMessage;
