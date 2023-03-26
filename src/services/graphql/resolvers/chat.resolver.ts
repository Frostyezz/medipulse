import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  Chat,
  CreateChatInput,
  SendMessageInput,
} from "../schemas/chat.schema";
import ChatService from "../service/chat.service";
import type { Context } from "../types/context";

@Resolver()
export default class ChatResolver {
  constructor(private chatService: ChatService) {
    this.chatService = new ChatService();
  }

  @Mutation(() => Chat)
  createTransferRequest(@Arg("input") input: CreateChatInput) {
    return this.chatService.createChat(input);
  }

  @Mutation(() => Boolean)
  sendMessage(@Arg("input") input: SendMessageInput) {
    return this.chatService.sendMessage(input);
  }
}
