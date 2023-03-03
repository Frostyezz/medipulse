import { Context } from "@apollo/client";
import MedicModel, { CreateMedicInput } from "../schemas/medic.schema";
import UserModel from "../schemas/user.schema";

class MedicService {
  async createMedic(input: CreateMedicInput, context: Context) {
    const newMedicProfile = await MedicModel.create({
      ...input,
      contextId: context.userId,
    });

    await UserModel.findByIdAndUpdate(context.userId, {
      profileId: newMedicProfile._id,
      registerStep: 3,
    });

    return newMedicProfile;
  }

  async getMyMedicProfile(context: Context) {
    const medicProfile = await MedicModel.find()
      .findByContextId(context.userId)
      .lean();
    return medicProfile;
  }
}

export default MedicService;
