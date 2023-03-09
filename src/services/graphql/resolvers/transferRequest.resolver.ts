import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateTransferRequestInput,
  TransferRequest,
} from "../schemas/transferRequest.schema";
import TransferRequestService from "../service/transferRequest.service";
import type { Context } from "../types/context";

@Resolver()
export default class TransferRequestsResolver {
  constructor(private TransferRequestsService: TransferRequestService) {
    this.TransferRequestsService = new TransferRequestService();
  }

  @Query(() => [TransferRequest], { nullable: true })
  getTransferRequests(@Ctx() context: Context) {
    return this.TransferRequestsService.getTransferRequests(context);
  }

  @Mutation(() => Boolean)
  createTransferRequest(
    @Arg("input") input: CreateTransferRequestInput,
    @Ctx() context: Context
  ) {
    return this.TransferRequestsService.createTransferRequest(input, context);
  }
}
