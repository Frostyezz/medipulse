import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateAppointmentInput } from "../schemas/appointment.schema";
import AppointmentService from "../service/appointment.service";
import type { Context } from "../types/context";

@Resolver()
export default class AppointmentResolver {
  constructor(private appointmentService: AppointmentService) {
    this.appointmentService = new AppointmentService();
  }

  @Mutation(() => Boolean)
  createTransferRequest(@Arg("input") input: CreateAppointmentInput) {
    return this.appointmentService.createAppointment(input);
  }
}
