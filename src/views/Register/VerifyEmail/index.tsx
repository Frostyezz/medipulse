import React from "react";
import { Flex, PinInput, Button, Alert, Text } from "@mantine/core";
import useVerifyEmailForm from "./hooks/useVerifyEmailForm";
import { Trans, useTranslation } from "react-i18next";
import { AlertCircle } from "tabler-icons-react";
import useVerifyEmail from "./hooks/useVerifyEmail";
import Countdown from "react-countdown";
import { CountdownRendererFn } from "react-countdown/dist/Countdown";
import useDeleteUser from "@/common/hooks/useDeleteUser";

const VerifyEmail: React.FC = () => {
  const form = useVerifyEmailForm();
  const { t } = useTranslation();
  const { loading, resendEmail, cooldown, verifyEmail } = useVerifyEmail();
  const deleteUser = useDeleteUser(undefined);

  const renderer: CountdownRendererFn = ({ minutes, seconds, completed }) => {
    if (completed) return <></>;
    return `${t("verify.help.step.2.sent")} ${minutes}:${seconds}`;
  };

  return (
    <form
      onSubmit={form.onSubmit(
        async ({ validationCode }) =>
          await verifyEmail({
            variables: { input: { validationCode: Number(validationCode) } },
          })
      )}
    >
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
        <PinInput
          size="xl"
          type="number"
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
              {cooldown ? (
                <Countdown
                  date={Date.now() + 1000 * 60 * 3}
                  renderer={renderer}
                />
              ) : (
                <Trans
                  i18nKey="verify.help.step.2"
                  components={{
                    btn: <span className="a" onClick={() => resendEmail()} />,
                  }}
                />
              )}
            </li>
            <li>
              <Trans
                i18nKey="verify.help.step.3"
                components={{
                  btn: <span className="a" onClick={() => deleteUser()} />,
                }}
              />
            </li>
          </ol>
        </Alert>
      </Flex>
    </form>
  );
};

export default VerifyEmail;
