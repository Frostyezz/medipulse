import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  Appointment,
  CreateAppointmentInput,
  DeleteAppoitmentById,
  GetAppointmentsByPatientId,
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

  @Query(() => [Appointment], { nullable: true })
  getMyAppointments(@Ctx() context: Context) {
    return this.appointmentService.getMyAppointments(context);
  }

  @Query(() => [Appointment], { nullable: true })
  getPatientAppointments(@Arg("input") input: GetAppointmentsByPatientId) {
    return this.appointmentService.getPatientAppointments(input);
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
