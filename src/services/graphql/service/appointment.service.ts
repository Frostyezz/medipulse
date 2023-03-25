import AppointmentModel, {
  CreateAppointmentInput,
  DeleteAppoitmentById,
  GetAppointmentsByPatientId,
  UpdateAppointmentInput,
} from "../schemas/appointment.schema";
import UserModel from "../schemas/user.schema";
import type { Context } from "../types/context";
import { APPOINTMENT_STATUS, ROLES } from "../types/enums";

class AppointmentService {
  async createAppointment(input: CreateAppointmentInput) {
    const appointment = await AppointmentModel.create(input);

    return appointment;
  }

  async updateAppointment({ id, ...input }: UpdateAppointmentInput) {
    if (input.status === APPOINTMENT_STATUS.REJECTED) {
      const deleted = await AppointmentModel.findByIdAndDelete(id).lean();
      return { ...deleted, status: APPOINTMENT_STATUS.REJECTED };
    }
    const appointment = await AppointmentModel.findByIdAndUpdate(id, input, {
      new: true,
    }).lean();

    return appointment;
  }

  async getMedicAppointments(context: Context) {
    let id = context.userId;
    if (context.role === ROLES.PATIENT) {
      const { medicId } =
        (await UserModel.findById(context.userId).lean()) ?? {};
      id = medicId ?? "";
    }

    const appointments = await AppointmentModel.find({ medicId: id }).lean();

    return appointments;
  }

  async deleteAppointment(input: DeleteAppoitmentById) {
    const appointment = await AppointmentModel.findByIdAndDelete(
      input._id
    ).lean();

    return appointment?._id ?? input._id;
  }

  async getPatientAppointments(input: GetAppointmentsByPatientId) {
    const appointments = await AppointmentModel.find({
      patientId: input.id,
    }).lean();

    return appointments.sort(function (a, b) {
      return new Date(b.end).valueOf() - new Date(a.end).valueOf();
    });
  }
}

export default AppointmentService;
