import { Context } from "@apollo/client";
import ProfileModel, { CreateProfileInput } from "../schemas/profile.schema";
import UserModel from "../schemas/user.schema";

class ProfileService {
  async createProfile(input: CreateProfileInput, context: Context) {
    const newProfileProfile = await ProfileModel.create({
      ...input,
      contextId: context.userId,
    });

    await UserModel.findByIdAndUpdate(context.userId, {
      profileId: newProfileProfile._id,
      registerStep: 3,
    });

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
