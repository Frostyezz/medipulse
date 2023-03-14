import React from "react";
import { Flex, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import AppointmentCalendar from "@/common/components/AppointmentCalendar/AppointmentCalendar";
import useFetchPatients from "../Patients/hooks/useFetchPatients";

const Appointments: React.FC = () => {
  useFetchPatients();
  const { t } = useTranslation();

  return (
    <Flex direction="column" gap={24}>
      <Title order={2}>{t("appointments.title")}</Title>
      <AppointmentCalendar />
    </Flex>
  );
};

export default Appointments;
