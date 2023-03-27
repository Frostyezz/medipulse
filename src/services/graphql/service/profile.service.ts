import { Context } from "@apollo/client";
import InviteModel from "../schemas/invite.schema";
import ProfileModel, {
  CreateProfileInput,
  GetDoctorsNearMeInput,
  GetProfileByIdInput,
  UpdateProfileInput,
} from "../schemas/profile.schema";
import UserModel from "../schemas/user.schema";
import { INVITATION_STATUS, ROLES } from "../types/enums";
import { getDistance } from "geolib";
import AppointmentModel from "../schemas/appointment.schema";
import { calculateMonthDiffPercentage } from "@/common/utils/utilFunctions";

class ProfileService {
  async createProfile(input: CreateProfileInput, context: Context) {
    const user = await UserModel.findById(context.userId).lean();

    const newProfile = await ProfileModel.create({
      ...input,
      contextId: context.userId,
      medicId: user?.medicId,
      role: user?.role,
      schedule: [],
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
    const profile = await ProfileModel.find().findByContextId(
      context.userId ?? ""
    );

    const patients = await ProfileModel.find({
      medicId: profile?.medicId ?? context.userId,
      role: ROLES.PATIENT,
    }).lean();

    return patients;
  }

  async getMyMedicalStaff(context: Context) {
    const profile = await ProfileModel.find().findByContextId(
      context.userId ?? ""
    );

    const nurses =
      (await ProfileModel.find({
        medicId: profile?.medicId,
        role: ROLES.NURSE,
      }).lean()) ?? [];

    const medic = await ProfileModel.find()
      .findByContextId(profile?.medicId ?? "")
      .lean();

    return [medic, ...nurses];
  }

  async getMyPatientsAndNurses(context: Context) {
    const patients =
      (await ProfileModel.find({
        medicId: context.userId,
        role: ROLES.PATIENT,
      }).lean()) ?? [];

    const nurses =
      (await ProfileModel.find({
        medicId: context.userId,
        role: ROLES.NURSE,
      }).lean()) ?? [];

    return [...nurses, ...patients];
  }

  async getMyPatientsAndMedic(context: Context) {
    const profile = await ProfileModel.find().findByContextId(
      context.userId ?? ""
    );

    const patients =
      (await ProfileModel.find({
        medicId: profile?.medicId,
        role: ROLES.PATIENT,
      }).lean()) ?? [];

    const medic = await ProfileModel.find()
      .findByContextId(profile?.medicId ?? "")
      .lean();

    return [medic, ...patients];
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

  async updateProfile(
    { language, theme, ...input }: UpdateProfileInput,
    context: Context
  ) {
    await ProfileModel.findOneAndUpdate(
      { contextId: context.userId },
      input
    ).lean();

    await UserModel.findByIdAndUpdate(context.userId, { language, theme });

    const profile = await ProfileModel.find()
      .findByContextId(context.userId)
      .lean();

    return profile;
  }

  async getMedicProfile(context: Context) {
    const { medicId } = (await UserModel.findById(context.userId).lean()) ?? {};

    const medicProfile = await ProfileModel.find()
      .findByContextId(medicId ?? "")
      .lean();

    return medicProfile;
  }

  async getProfileById(input: GetProfileByIdInput) {
    const profile = await ProfileModel.find()
      .findByContextId(input.profileId)
      .lean();

    return profile;
  }

  async getStats(context: Context) {
    if (context?.role === ROLES.PATIENT) {
      const appointments = await AppointmentModel.find({
        patientId: context?.userId,
      }).lean();

      const appointmentPercentage = await calculateMonthDiffPercentage(
        appointments
      );

      return {
        appointments: appointmentPercentage.count,
        appointmentPercentage: appointmentPercentage.diffPercentage,
      };
    }

    const { medicId } = (await UserModel.findById(context.userId).lean()) ?? {};

    const patients = await ProfileModel.find({
      medicId: medicId ?? context.userId,
      role: ROLES.PATIENT,
    }).lean();

    const patientPercentage = await calculateMonthDiffPercentage(patients);

    const appointments = await AppointmentModel.find({
      medicId: medicId ?? context?.userId,
    }).lean();

    const appointmentPercentage = await calculateMonthDiffPercentage(
      appointments
    );

    const invites = await InviteModel.find({
      medicId: medicId ?? context?.userId,
    }).lean();

    const invitePercentage = await calculateMonthDiffPercentage(invites);

    return {
      appointments: appointmentPercentage.count,
      appointmentPercentage: appointmentPercentage.diffPercentage,
      patients: patientPercentage.count,
      patientPercentage: patientPercentage.diffPercentage,
      invites: invitePercentage.count,
      invitePercentage: invitePercentage.diffPercentage,
    };
  }
}

export default ProfileService;
