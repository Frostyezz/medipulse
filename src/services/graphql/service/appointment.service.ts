import AppointmentModel, {
  CreateAppointmentInput,
} from "../schemas/appointment.schema";
import UserModel from "../schemas/user.schema";
import type { Context } from "../types/context";
import { ROLES } from "../types/enums";

class AppointmentService {
  async createAppointment(input: CreateAppointmentInput) {
    const appointment = await AppointmentModel.create(input);

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
}

export default AppointmentService;
