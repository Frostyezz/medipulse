import React, { useEffect, useRef } from "react";
import {
  Paper,
  Flex,
  TextInput,
  ActionIcon,
  Avatar,
  Title,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import useManageChat from "../hooks/useManageChat";
import { useAppSelector } from "@/services/redux/hooks";
import { useTranslation } from "react-i18next";
import { MessageOff, Send } from "tabler-icons-react";
import useSendMessage from "../hooks/useSendMessage";
import ChatMessage from "./Message";

const Messenger: React.FC = () => {
  const { user, form } = useManageChat();
  const chat = useAppSelector((store) => store.chat);
  const { t } = useTranslation();
  const { sendMessage, loading } = useSendMessage();
  const isMobile = useMediaQuery("(max-width: 800px)");
  const inputRef = useRef<HTMLInputElement>(null);
  // @ts-ignore
  let messageEnd = null;

  useEffect(() => {
    // @ts-ignore
    if (messageEnd) {
      messageEnd.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behaviour: "smooth",
      });
    }
  });

  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      {!user && !chat.messages?.length && (
        <Flex
          direction="column"
          justify="center"
          align="center"
          h="60vh"
          gap={8}
        >
          <MessageOff size={60} />
          <Title sx={{ textAlign: "center" }} weight={500} order={3}>
            {t("chat.messenger.zeroState")}
          </Title>
        </Flex>
      )}
      {!chat.messages?.length && user && (
        <Flex
          direction="column"
          justify="center"
          align="center"
          h="60vh"
          gap={8}
        >
          <Avatar src={user?.avatar} size="xl" sx={{ borderRadius: "100%" }} />
          <Title order={5}>
            {[
              t(`roles.short.${user?.role}`),
              user?.firstName,
              user?.lastName,
            ].join(" ")}
          </Title>
          <Text ta="center" fz="sm" c="dimmed">
            {t("chat.noMessages")}
          </Text>
        </Flex>
      )}
      {!!chat?.messages?.length && (
        <Flex
          direction="column"
          my={8}
          pr={4}
          h="60vh"
          sx={{ overflowY: "scroll" }}
        >
          {chat?.messages?.map((message, idx) => (
            <ChatMessage {...message} key={idx} />
          ))}
          <div
            ref={(element) => {
              messageEnd = element;
            }}
          />
        </Flex>
      )}
      <form
        onSubmit={form.onSubmit(async (values) => {
          await sendMessage({ variables: { input: values } });
          if (!isMobile) inputRef!.current!.focus();
          form.setFieldValue("content", "");
        })}
      >
        <Flex gap={6} align="center">
          <TextInput
            w="100%"
            size="md"
            placeholder={t("chat.textarea.placheloder") as string}
            ref={inputRef}
            {...form.getInputProps("content")}
          />
          <ActionIcon
            disabled={!form.values.content}
            size="xl"
            variant="default"
            type="submit"
            loading={loading}
          >
            <Send />
          </ActionIcon>
        </Flex>
      </form>
    </Paper>
  );
};

export default Messenger;
