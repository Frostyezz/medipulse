import React from "react";
import { Flex, NumberInput, Button, Alert, Text } from "@mantine/core";
import useVerifyEmailForm from "./hooks/useVerifyEmailForm";
import { Trans, useTranslation } from "react-i18next";
import { AlertCircle } from "tabler-icons-react";
import Link from "next/link";
import useVerifyEmail from "./hooks/useVerifyEmail";

const VerifyEmail: React.FC = () => {
  const form = useVerifyEmailForm();
  const { t } = useTranslation();
  const { loading, resendEmail, verifyEmail } = useVerifyEmail();

  return (
    <form onSubmit={form.onSubmit(async ({ validationCode }) => {})}>
      <Flex
        sx={(theme) => ({
          maxWidth: "400px",
          [theme.fn.smallerThan("md")]: {
            maxWidth: "100%",
          },
        })}
        mt={24}
        gap={12}
        direction="column"
      >
        <NumberInput
          label={t("verify.label.code")}
          min={1000}
          max={9999}
          withAsterisk
          hideControls
          {...form.getInputProps("validationCode")}
        />
        <Button loading={loading} disabled={!form.isValid()} type="submit">
          {t("verify.submit")}
        </Button>
        <Alert
          mt={12}
          icon={<AlertCircle size={16} />}
          title={t("verify.help.title")}
        >
          <Text mb={6}>{t("verify.help.caption")}</Text>
          <ol>
            <li>{t("verify.help.step.1")}</li>
            <li>
              <Trans
                i18nKey="verify.help.step.2"
                components={{
                  btn: <span className="a" onClick={() => resendEmail()} />,
                }}
              />
            </li>
            <li>
              <Trans
                i18nKey="verify.help.step.3"
                components={{ btn: <Link href="#" /> }}
              />
            </li>
          </ol>
        </Alert>
      </Flex>
    </form>
  );
};

export default VerifyEmail;
