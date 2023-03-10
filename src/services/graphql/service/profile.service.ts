import { Context } from "@apollo/client";
import InviteModel from "../schemas/invite.schema";
import ProfileModel, {
  CreateProfileInput,
  GetDoctorsNearMeInput,
} from "../schemas/profile.schema";
import UserModel from "../schemas/user.schema";
import { INVITATION_STATUS, ROLES } from "../types/enums";
import { getDistance } from "geolib";

class ProfileService {
  async createProfile(input: CreateProfileInput, context: Context) {
    const user = await UserModel.findById(context.userId).lean();

    const newProfile = await ProfileModel.create({
      ...input,
      contextId: context.userId,
      medicId: user?.medicId,
      role: user?.role,
    });

    const { email } =
      (await UserModel.findByIdAndUpdate(context.userId, {
        profileId: newProfile._id,
        registerStep: 3,
      })) ?? {};

    await InviteModel.findOneAndUpdate(
      { email },
      { status: INVITATION_STATUS.ACCEPTED }
    );

    return newProfile;
  }

  async getMyProfile(context: Context) {
    const ProfileProfile = await ProfileModel.find()
      .findByContextId(context.userId)
      .lean();
    return ProfileProfile;
  }

  async getMyPatients(context: Context) {
    const patients = await ProfileModel.find({
      medicId: context.userId,
      role: ROLES.PATIENT,
    }).lean();

    return patients;
  }

  async getDoctorsNearMe(input: GetDoctorsNearMeInput) {
    const doctors = await ProfileModel.find({ role: ROLES.MEDIC }).lean();

    const nearDoctors = doctors.filter((doctor) => {
      if (!doctor?.latitude || !doctor?.longitude) return false;
      return (
        getDistance(
          { lat: input.latitude, lng: input.longitude },
          { lat: doctor.latitude, lng: doctor.longitude }
        ) /
          1000 <=
        input.maxDistance
      );
    });

    return await Promise.all(
      nearDoctors.map(async (doctor) => {
        const patients = await ProfileModel.countDocuments({
          medicId: doctor.contextId,
          role: ROLES.PATIENT,
        });
        return { ...doctor, patientsCount: patients };
      })
    );
  }
}

export default ProfileService;
