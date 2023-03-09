import React from "react";
import { Profile } from "@/services/graphql/schemas/profile.schema";
import { useTranslation } from "react-i18next";
import { Avatar, Text, Button, Paper, Flex } from "@mantine/core";
import TimeAgo from "@/common/components/TimeAgo/TimeAgo";

const DoctorCard: React.FC<Partial<Profile>> = ({
  avatar,
  firstName,
  lastName,
  createdAt,
  patientsCount,
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
        {["Dr.", firstName, lastName].join(" ")}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        <Flex gap={4} justify="center">
          {t("joined")} <TimeAgo date={createdAt ?? ""} /> •{" "}
          {t("doctors.card.count", { count: patientsCount })}
        </Flex>
      </Text>

      <Button variant="default" mt={6} fullWidth>
        {t("doctors.card.button")}
      </Button>
    </Paper>
  );
};

export default DoctorCard;
