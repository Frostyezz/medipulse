import AppointmentModel, {
  CreateAppointmentInput,
} from "../schemas/appointment.schema";

class AppointmentService {
  async createAppointment(input: CreateAppointmentInput) {
    await AppointmentModel.create(input);

    return true;
  }
}

export default AppointmentService;
