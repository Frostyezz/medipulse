import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateInviteInput, Invite } from "../schemas/invite.schema";
import InviteService from "../service/invite.service";
import type { Context } from "../types/context";

@Resolver()
export default class InviteResolver {
  constructor(private inviteService: InviteService) {
    this.inviteService = new InviteService();
  }

  @Mutation(() => Invite)
  createInvite(
    @Arg("input") input: CreateInviteInput,
    @Ctx() context: Context
  ) {
    return this.inviteService.createInvite(input, context);
  }
}
