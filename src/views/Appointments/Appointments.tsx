import React from "react";
import { Flex, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import AppointmentCalendar from "@/common/components/AppointmentCalendar/AppointmentCalendar";
import useFetchPatients from "../Patients/hooks/useFetchPatients";
import Help from "./components/Help";

const Appointments: React.FC = () => {
  useFetchPatients();
  const { t } = useTranslation();

  return (
    <Flex direction="column" gap={24}>
      <Flex direction="column" gap={12}>
        <Title order={2}>{t("appointments.title")}</Title>
        <Help />
      </Flex>
      <AppointmentCalendar />
    </Flex>
  );
};

export default Appointments;
