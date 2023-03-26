import dayjs from "dayjs";
import Pusher from "pusher";
import ChatModel, {
  CreateChatInput,
  SendMessageInput,
} from "../schemas/chat.schema";
import { Context } from "../types/context";

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID ?? "",
  key: process.env.PUSHER_KEY ?? "",
  secret: process.env.PUSHER_SECRET ?? "",
  cluster: "eu",
  useTLS: true,
});

class ChatService {
  async createChat(input: CreateChatInput) {
    const alreadyCreatedChat = await ChatModel.findOne(input).lean();

    if (alreadyCreatedChat) return alreadyCreatedChat;

    const chat = await ChatModel.create(input);

    return chat;
  }

  async sendMessage({ chatId, ...input }: SendMessageInput) {
    await ChatModel.findByIdAndUpdate(chatId, {
      $push: { messages: { ...input, sentAt: dayjs() } },
    });

    await pusher.trigger(chatId as string, "message", {
      ...input,
      sentAt: dayjs(),
    });

    return true;
  }
}

export default ChatService;
