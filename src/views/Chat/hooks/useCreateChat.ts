import { useEffect } from "react";
import { Chat } from "@/services/graphql/schemas/chat.schema";
import { useAppDispatch } from "@/services/redux/hooks";
import { gql, useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { showNotification } from "@mantine/notifications";
import { SET_CHAT } from "@/services/redux/slices/chatSlice";

const CREATE_CHAT = gql`
  mutation CreateChat($input: CreateChatInput!) {
    createChat(input: $input) {
      _id
      createdAt
      medicId
      messages {
        content
        receiver
        sender
        sentAt
      }
      nurseId
      patientId
    }
  }
`;

const useCreateChat = () => {
  const [createChat, { data, error, loading }] = useMutation<{
    createChat: Partial<Chat>;
  }>(CREATE_CHAT, {
    fetchPolicy: "network-only",
  });

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (error)
      showNotification({
        title: t("register.error"),
        message: t(error.message),
        color: "red",
      });
    else if (!loading && data?.createChat) {
      dispatch(SET_CHAT(data.createChat));
    }
  }, [data, error, loading]);

  return { createChat, loading };
};

export default useCreateChat;
