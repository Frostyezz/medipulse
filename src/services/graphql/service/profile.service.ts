import { Context } from "@apollo/client";
import InviteModel from "../schemas/invite.schema";
import ProfileModel, { CreateProfileInput } from "../schemas/profile.schema";
import UserModel from "../schemas/user.schema";
import { INVITATION_STATUS } from "../types/enums";

class ProfileService {
  async createProfile(input: CreateProfileInput, context: Context) {
    const user = await UserModel.findById(context.userId).lean();

    const newProfileProfile = await ProfileModel.create({
      ...input,
      contextId: context.userId,
      medicId: user?.medicId,
    });

    const { email } =
      (await UserModel.findByIdAndUpdate(context.userId, {
        profileId: newProfileProfile._id,
        registerStep: 3,
      })) ?? {};

    await InviteModel.findOneAndUpdate(
      { email },
      { status: INVITATION_STATUS.ACCEPTED }
    );

    return newProfileProfile;
  }

  async getMyProfile(context: Context) {
    const ProfileProfile = await ProfileModel.find()
      .findByContextId(context.userId)
      .lean();
    return ProfileProfile;
  }
}

export default ProfileService;
