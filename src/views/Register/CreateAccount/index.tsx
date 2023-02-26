import React from "react";
import RegisterPasswordInput from "@/common/components/RegisterPasswordInput";
import { Button, Flex, Select, TextInput } from "@mantine/core";
import useCreateAccountForm from "./hooks/useCreateAccountForm";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "@/services/graphql/types/enums";
import useCreateAccount from "./hooks/useCreateAccount";

const CreateAccount: React.FC = () => {
  const form = useCreateAccountForm();
  const { createUser, loading } = useCreateAccount();
  const { t } = useTranslation();
  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        await createUser({ variables: { input: values } });
      })}
    >
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
            { value: LANGUAGES.en, label: t("languages.en") as string },
            { value: LANGUAGES.ro, label: t("languages.ro") as string },
          ]}
          withAsterisk
          {...form.getInputProps("language")}
        />
        <Button type="submit" disabled={loading || !form.isValid()} mt={10}>
          {t("register.createAccount.button")}
        </Button>
      </Flex>
    </form>
  );
};

export default CreateAccount;
