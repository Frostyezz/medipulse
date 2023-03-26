import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateProfileInput,
  GetDoctorsNearMeInput,
  GetProfileByIdInput,
  Profile,
  Schedule,
  UpdateProfileInput,
} from "../schemas/profile.schema";
import ProfileService from "../service/profile.service";
import type { Context } from "../types/context";

@Resolver()
export default class ProfileResolver {
  constructor(private profileService: ProfileService) {
    this.profileService = new ProfileService();
  }

  @Mutation(() => Profile)
  createProfile(
    @Arg("input") input: CreateProfileInput,
    @Ctx() context: Context
  ) {
    return this.profileService.createProfile(input, context);
  }

  @Mutation(() => Profile)
  updateProfile(
    @Arg("input") input: UpdateProfileInput,
    @Ctx() context: Context
  ) {
    return this.profileService.updateProfile(input, context);
  }

  @Query(() => Profile, { nullable: true })
  getMyProfile(@Ctx() context: Context) {
    return this.profileService.getMyProfile(context);
  }

  @Query(() => Profile, { nullable: true })
  getMedicProfile(@Ctx() context: Context) {
    return this.profileService.getMedicProfile(context);
  }

  @Query(() => [Profile], { nullable: true })
  getMyPatients(@Ctx() context: Context) {
    return this.profileService.getMyPatients(context);
  }

  @Query(() => [Profile], { nullable: true })
  getMyMedicalStaff(@Ctx() context: Context) {
    return this.profileService.getMyMedicalStaff(context);
  }

  @Query(() => [Profile], { nullable: true })
  getMyPatientsAndNurses(@Ctx() context: Context) {
    return this.profileService.getMyPatientsAndNurses(context);
  }

  @Query(() => [Profile], { nullable: true })
  getMyPatientsAndMedic(@Ctx() context: Context) {
    return this.profileService.getMyPatientsAndMedic(context);
  }

  @Query(() => [Profile], { nullable: true })
  getDoctorsNearMe(@Arg("input") input: GetDoctorsNearMeInput) {
    return this.profileService.getDoctorsNearMe(input);
  }

  @Query(() => Profile)
  getProfileById(@Arg("input") input: GetProfileByIdInput) {
    return this.profileService.getProfileById(input);
  }
}
