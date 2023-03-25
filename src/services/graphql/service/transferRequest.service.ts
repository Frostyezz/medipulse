import { ApolloError } from "apollo-server-micro";
import ProfileModel from "../schemas/profile.schema";
import TransferRequestModel, {
  CreateTransferRequestInput,
  ProcessTransferRequestInput,
} from "../schemas/transferRequest.schema";
import UserModel from "../schemas/user.schema";
import { Context } from "../types/context";
import { REQUEST_STATUS } from "../types/enums";

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
    const profile = await ProfileModel.find().findByContextId(
      context.userId ?? ""
    );

    const requests = await TransferRequestModel.find({
      medicId: profile?.medicId ?? context.userId,
    }).lean();

    return await Promise.all(
      requests.map(async (request) => {
        const patientProfile = await ProfileModel.find().findByContextId(
          request.patientId
        );
        const medicProfile = await ProfileModel.find().findByContextId(
          request.transferTo
        );

        return { request, patientProfile, medicProfile };
      })
    );
  }

  async processTransferRequest(input: ProcessTransferRequestInput) {
    const request = await TransferRequestModel.findByIdAndDelete(
      input.transferId
    ).lean();

    if (input.status === REQUEST_STATUS.ACCEPTED) {
      await UserModel.findByIdAndUpdate(request?.patientId, {
        medicId: request?.transferTo,
      });

      await ProfileModel.findOneAndUpdate(
        { contextId: request?.patientId },
        { medicId: request?.transferTo }
      );
    }

    return request?._id;
  }
}

export default transferRequestService;
