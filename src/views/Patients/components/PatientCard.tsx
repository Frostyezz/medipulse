import React from "react";
import { Avatar, Text, Button, Paper, Flex } from "@mantine/core";
import { Profile } from "@/services/graphql/schemas/profile.schema";
import TimeAgo from "@/common/components/TimeAgo/TimeAgo";
import { useTranslation } from "react-i18next";
import ActionsButton from "./ActionsButton";

const PatientCard: React.FC<Partial<Profile>> = ({
  avatar,
  firstName,
  lastName,
  createdAt,
}) => {
  const { t } = useTranslation();

  return (
    <Paper
      radius="md"
      withBorder
      className="animate__animated animate__fadeIn"
      p="lg"
      sx={(theme) => ({
        width: "300px",
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar src={avatar} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" weight={500} mt="md">
        {[firstName, lastName].join(" ")}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        <Flex gap={4} justify="center">
          {t("joined")} <TimeAgo date={createdAt ?? ""} />
        </Flex>
      </Text>

      <Flex gap={6} mt="md">
        <Button variant="default" fullWidth>
          {t("patients.list.card.history")}
        </Button>
        <ActionsButton />
      </Flex>
    </Paper>
  );
};

export default PatientCard;
