import React from "react";
import { Flex, TextInput, Select, Button } from "@mantine/core";
import { useTranslation } from "react-i18next";
import useInviteForm from "../hooks/useInviteForm";
import { LANGUAGES, ROLES } from "@/services/graphql/types/enums";
import useSendInvite from "../hooks/useSendInvite";

const SendInvitation: React.FC = () => {
  const { t } = useTranslation();
  const form = useInviteForm();
  const { sendInvite, loading } = useSendInvite();

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        await sendInvite({ variables: { input: values } });
      })}
    >
      <Flex
        gap={12}
        mb={12}
        sx={(theme) => ({
          [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
          },
        })}
      >
        <TextInput
          placeholder={t("register.label.email") as string}
          label={t("register.label.email")}
          withAsterisk
          {...form.getInputProps("email")}
        />
        <Select
          label={t("register.label.language") as string}
          placeholder={t("register.label.language") as string}
          data={[
            { value: LANGUAGES.en, label: t("languages.en") as string },
            { value: LANGUAGES.ro, label: t("languages.ro") as string },
          ]}
          withAsterisk
          {...form.getInputProps("language")}
        />
        <Select
          label={t("invite.error.role.label") as string}
          placeholder={t("invite.error.role.label") as string}
          data={[
            { value: ROLES.PATIENT, label: t("roles.PATIENT") as string },
            { value: ROLES.NURSE, label: t("roles.NURSE") as string },
          ]}
          withAsterisk
          {...form.getInputProps("role")}
        />
        <Button
          type="submit"
          loading={loading}
          disabled={!form.isValid()}
          sx={(theme) => ({
            marginTop: "25px",
            [theme.fn.smallerThan("md")]: {
              marginTop: "10px",
            },
          })}
        >
          {t("invite.button")}
        </Button>
      </Flex>
    </form>
  );
};

export default SendInvitation;
