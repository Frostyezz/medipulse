import React from "react";
import RegisterPasswordInput from "@/common/components/RegisterPasswordInput";
import { Button, Flex, Select, TextInput } from "@mantine/core";
import useCreateAccountForm, {
  LANGUAGE_PREF,
} from "./hooks/useCreateAccountForm";
import { useTranslation } from "react-i18next";

const CreateAccount: React.FC = () => {
  const form = useCreateAccountForm();
  const { t } = useTranslation();

  return (
    <Flex
      direction="column"
      gap={12}
      mt={24}
      sx={(theme) => ({
        maxWidth: "400px",
        [theme.fn.smallerThan("md")]: {
          maxWidth: "100%",
        },
      })}
    >
      <TextInput
        placeholder={t("register.label.email") as string}
        label={t("register.label.email")}
        withAsterisk
        {...form.getInputProps("email")}
      />
      <RegisterPasswordInput form={form} />
      <Select
        label={t("register.label.language") as string}
        placeholder={t("register.label.language") as string}
        data={[
          { value: LANGUAGE_PREF.EN, label: t("languages.en") as string },
          { value: LANGUAGE_PREF.RO, label: t("languages.ro") as string },
        ]}
        withAsterisk
        {...form.getInputProps("language")}
      />
      <Button mt={10}>{t("register.createAccount.button")}</Button>
    </Flex>
  );
};

export default CreateAccount;
