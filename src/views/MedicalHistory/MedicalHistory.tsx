import React, { useMemo } from "react";
import { Flex, Title, Timeline, Skeleton } from "@mantine/core";
import useFetchPatientAppointments from "./hooks/useFetchPatientAppointments";
import { CalendarOff } from "tabler-icons-react";
import { useTranslation } from "react-i18next";
import useFetchProfile from "@/common/hooks/useFetchProfile";
import { useAppSelector } from "@/services/redux/hooks";
import { ROLES } from "@/services/graphql/types/enums";
import dayjs from "dayjs";
import AppointmentCard from "./components/AppointmentCard";

interface MedicalHistoryProps {
  id: string;
}

const MedicalHistory: React.FC<MedicalHistoryProps> = ({ id }) => {
  const isPatient =
    useAppSelector((store) => store.user.role) === ROLES.PATIENT;
  const { loading, appointments } = useFetchPatientAppointments(id);
  const patient = useFetchProfile(id);
  const { t } = useTranslation();

  const oldAppointmentsCount = useMemo(
    () =>
      appointments &&
      appointments.filter(({ end }) => dayjs().isAfter(end)).length - 1,
    [appointments]
  );

  if (loading)
    return (
      <Timeline active={-1} reverseActive>
        {[1, 2, 3].map((idx) => (
          <Timeline.Item key={idx} bulletSize={24}>
            <Skeleton sx={{ maxWidth: "500px", height: "320px" }} />
          </Timeline.Item>
        ))}
      </Timeline>
    );

  if (!appointments?.length && !loading)
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="animate__animated animate__fadeIn"
        sx={{ height: "100%" }}
      >
        <CalendarOff size={60} />
        <Title sx={{ textAlign: "center" }} weight={500} order={3}>
          {t("medicalHistory.zeroState")}
        </Title>
      </Flex>
    );

  return (
    <Flex direction="column" gap={24}>
      {!!patient && (
        <Title order={2}>
          {isPatient
            ? t("medicalHistory.title.1")
            : t("medicalHistory.title", {
                name: [patient?.firstName, patient?.lastName].join(" "),
              })}
        </Title>
      )}
      <Timeline active={oldAppointmentsCount} reverseActive>
        {appointments?.map((appointment) => (
          <Timeline.Item key={appointment._id} bulletSize={24}>
            <AppointmentCard {...appointment} />
          </Timeline.Item>
        ))}
      </Timeline>
    </Flex>
  );
};

export default MedicalHistory;
