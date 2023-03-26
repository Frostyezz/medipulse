import useFetchProfile from "@/common/hooks/useFetchProfile";
import {
  Message,
  SendMessageInput,
} from "@/services/graphql/schemas/chat.schema";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { ADD_MESSAGE } from "@/services/redux/slices/chatSlice";
import { useForm } from "@mantine/form";
import PusherJs from "pusher-js";
import { useEffect, useMemo, useRef } from "react";

const useManageChat = () => {
  const chat = useAppSelector((store) => store.chat);
  const { _id } = useAppSelector((store) => store.user) ?? {};
  const dispatch = useAppDispatch();
  const previousChannel = useRef("");

  const userId = useMemo(() => {
    if (chat.medicId && chat.medicId !== _id) return chat.medicId;
    if (chat.patientId && chat.patientId !== _id) return chat.patientId;
    if (chat.nurseId && chat.nurseId !== _id) return chat.nurseId;
  }, [chat, _id]);

  useEffect(() => {
    if (chat?._id) {
      const pusher = new PusherJs(process.env.NEXT_PUBLIC_PUSHER_KEY ?? "", {
        cluster: "eu",
      });

      if (previousChannel.current) pusher.unsubscribe(previousChannel.current);

      previousChannel.current = chat?._id;

      const channel = pusher.subscribe(chat?._id);

      channel.bind("message", (message: Message) => {
        dispatch(ADD_MESSAGE(message));
      });
      return () => {
        pusher.unsubscribe(chat?._id ?? "");
      };
    }
  }, [chat?._id]);

  const form = useForm<SendMessageInput>({
    initialValues: {
      chatId: chat?._id ?? "",
      content: "",
      receiver: userId ?? "",
      sender: _id ?? "",
    },
  });

  useEffect(() => {
    if (userId) form.setFieldValue("receiver", userId);
    if (_id) form.setFieldValue("sender", _id);
    if (chat?._id) form.setFieldValue("chatId", chat._id);
  }, [userId, chat, _id]);

  const user = useFetchProfile((userId as string) ?? "");

  return { user, form };
};

export default useManageChat;
