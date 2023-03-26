import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SEND_MESSAGE = gql`
  mutation SendMessage($input: SendMessageInput!) {
    sendMessage(input: $input)
  }
`;

const useSendMessage = () => {
  const [sendMessage, { loading, error }] = useMutation<{
    sendMessage: boolean;
  }>(SEND_MESSAGE);
  const { t } = useTranslation();

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
  }, [error]);

  return { sendMessage, loading };
};

export default useSendMessage;
