import React from "react";
import {
  Flex,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Alert,
  Text,
  List,
} from "@mantine/core";
import { Trans, useTranslation } from "react-i18next";
import useLoginForm from "./hooks/useLoginForm";
import { AlertCircle } from "tabler-icons-react";
import Link from "next/link";
import { ROUTES } from "@/common/utils/routes";
import useLogin from "./hooks/useLogin";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const form = useLoginForm();
  const { login, loading } = useLogin();

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        await login({ variables: { input: values } });
      })}
    >
      <Flex
        gap={12}
        sx={(theme) => ({
          maxWidth: "400px",
          [theme.fn.smallerThan("md")]: {
            maxWidth: "100%",
          },
        })}
        direction="column"
      >
        <Title order={2}>{t("login.title")}</Title>
        <TextInput
          label={t("register.label.email")}
          placeholder={t("register.label.email") as string}
          withAsterisk
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label={t("register.label.password")}
          placeholder={t("register.label.password") as string}
          {...form.getInputProps("password")}
          withAsterisk
        />
        <Button
          type="submit"
          loading={loading}
          disabled={!form.isValid()}
          mt={10}
        >
          {t("login.button")}
        </Button>
        <Alert
          mt={12}
          icon={<AlertCircle size={16} />}
          title={t("login.help.title")}
        >
          <Text>{t("login.help.subtitle")}</Text>
          <List sx={{ fontSize: "inherit" }} type="ordered">
            <List.Item sx={{ width: "95%" }}>
              <Trans
                i18nKey="login.help.step.1"
                components={{ btn: <Link href={ROUTES.REGISTER} /> }}
              />
            </List.Item>
            <List.Item sx={{ width: "95%" }}>
              {t("login.help.step.2")}
            </List.Item>
            <List.Item sx={{ width: "95%" }}>
              {t("login.help.step.3")}
            </List.Item>
          </List>
        </Alert>
      </Flex>
    </form>
  );
};

export default Login;
