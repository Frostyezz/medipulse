import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateProfileInput,
  GetDoctorsNearMeInput,
  Profile,
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

  @Query(() => Profile, { nullable: true })
  getMyProfile(@Ctx() context: Context) {
    return this.profileService.getMyProfile(context);
  }

  @Query(() => [Profile], { nullable: true })
  getMyPatients(@Ctx() context: Context) {
    return this.profileService.getMyPatients(context);
  }

  @Query(() => [Profile], { nullable: true })
  getDoctorsNearMe(@Arg("input") input: GetDoctorsNearMeInput) {
    return this.profileService.getDoctorsNearMe(input);
  }
}
