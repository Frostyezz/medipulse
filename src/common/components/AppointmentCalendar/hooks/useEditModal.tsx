import { AppoitmentType } from "@/services/redux/slices/appointmentsSlice";
import { modals } from "@mantine/modals";
import { useTranslation } from "react-i18next";
import AppointmentEditBody from "../components/AppointmentEditBody";

const useEditModal = (appointment: AppoitmentType) => {
  const { t } = useTranslation();

  return () =>
    modals.open({
      title: t("appointments.edit.title"),
      children: <AppointmentEditBody {...appointment} />,
      closeOnClickOutside: false,
      centered: true,
      withCloseButton: false,
    });
};

export default useEditModal;
