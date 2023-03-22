import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  Appointment,
  CreateAppointmentInput,
  DeleteAppoitmentById,
  UpdateAppointmentInput,
} from "../schemas/appointment.schema";
import AppointmentService from "../service/appointment.service";
import type { Context } from "../types/context";

@Resolver()
export default class AppointmentResolver {
  constructor(private appointmentService: AppointmentService) {
    this.appointmentService = new AppointmentService();
  }

  @Query(() => [Appointment], { nullable: true })
  getMedicAppointments(@Ctx() context: Context) {
    return this.appointmentService.getMedicAppointments(context);
  }

  @Mutation(() => Appointment)
  createAppointment(@Arg("input") input: CreateAppointmentInput) {
    return this.appointmentService.createAppointment(input);
  }

  @Mutation(() => Appointment)
  updateAppointment(@Arg("input") input: UpdateAppointmentInput) {
    return this.appointmentService.updateAppointment(input);
  }

  @Mutation(() => String)
  deleteAppointment(@Arg("input") input: DeleteAppoitmentById) {
    return this.appointmentService.deleteAppointment(input);
  }
}
