import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, List, ThemeIcon, Title, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Help, QuestionMark } from "tabler-icons-react";

const HelpCenter: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();

  return (
    <>
      <Button
        sx={{ width: "max-content" }}
        variant="light"
        leftIcon={<Help size={20} />}
        onClick={open}
      >
        {t("appointments.help.button")}
      </Button>
      <Modal
        size="lg"
        centered
        opened={opened}
        onClose={close}
        title={t("appointments.help.title")}
      >
        <List
          spacing="lg"
          size="sm"
          center
          icon={
            <ThemeIcon size={24} radius="xl">
              <QuestionMark size="1rem" />
            </ThemeIcon>
          }
        >
          {[1, 2, 3, 4].map((idx) => (
            <List.Item key={idx}>
              <Title order={6}>{t(`appointments.help.question.${idx}`)}</Title>
              <Text c="dimmed" fz="sm">
                {t(`appointments.help.answer.${idx}`)}
              </Text>
            </List.Item>
          ))}
        </List>
      </Modal>
    </>
  );
};

export default HelpCenter;
