import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateMedicInput, Medic } from "../schemas/medic.schema";
import MedicService from "../service/medic.service";
import type { Context } from "../types/context";

@Resolver()
export default class MedicResolver {
  constructor(private medicService: MedicService) {
    this.medicService = new MedicService();
  }

  @Mutation(() => Medic)
  createMedic(@Arg("input") input: CreateMedicInput, @Ctx() context: Context) {
    return this.medicService.createMedic(input, context);
  }

  @Query(() => Medic, { nullable: true })
  getMyMedicProfile(@Ctx() context: Context) {
    return this.medicService.getMyMedicProfile(context);
  }
}
