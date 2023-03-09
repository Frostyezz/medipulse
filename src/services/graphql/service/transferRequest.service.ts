import { ApolloError } from "apollo-server-micro";
import TransferRequestModel, {
  CreateTransferRequestInput,
} from "../schemas/transferRequest.schema";
import UserModel from "../schemas/user.schema";
import { Context } from "../types/context";

class transferRequestService {
  async createTransferRequest(
    input: CreateTransferRequestInput,
    context: Context
  ) {
    const hasAlreadySent = await TransferRequestModel.countDocuments({
      transferTo: input.transferTo,
    });
    if (hasAlreadySent)
      throw new ApolloError("doctors.request.alreadySent.title");

    const { medicId } = (await UserModel.findById(context.userId).lean()) ?? {};

    if (medicId === input.transferTo)
      throw new ApolloError("doctors.request.error.current.title");

    await TransferRequestModel.create({
      ...input,
      medicId,
      patientId: context.userId,
    });

    return true;
  }

  async getTransferRequests(context: Context) {
    const requests = await TransferRequestModel.find({
      medicId: context.userId,
    });

    return requests;
  }
}

export default transferRequestService;
