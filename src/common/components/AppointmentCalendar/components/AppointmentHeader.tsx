import React from "react";
import { ActionIcon, Badge, Flex } from "@mantine/core";
import { APPOINTMENT_STATUS, ROLES } from "@/services/graphql/types/enums";
import { modals } from "@mantine/modals";
import { Pencil, Trash, X } from "tabler-icons-react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/services/redux/hooks";
import useDeleteAppointment from "@/common/hooks/useDeleteAppointment";
import { EventClickArg } from "@fullcalendar/core";
import useEditModal from "../hooks/useEditModal";

const StatusColorMap: Record<APPOINTMENT_STATUS, string> = {
  [APPOINTMENT_STATUS.ACCEPTED]: "blue",
  [APPOINTMENT_STATUS.PENDING]: "cyan",
  [APPOINTMENT_STATUS.REJECTED]: "red",
};

const AppointmentHeader: React.FC<
  Omit<EventClickArg, "el" | "jsEvent" | "view">
> = ({ event }) => {
  const { t } = useTranslation();
  const { role } = useAppSelector((store) => store.user) ?? {};
  const deleteAppointment = useDeleteAppointment();
  const openEditModal = useEditModal(event.extendedProps);

  return (
    <Flex sx={{ width: "100%" }} align="center" justify="space-between">
      <Badge
        color={StatusColorMap[event.extendedProps.status as APPOINTMENT_STATUS]}
      >
        {t(`appointment.status.${event.extendedProps.status}`)}
      </Badge>
      <Flex gap={6}>
        {role === ROLES.MEDIC && (
          <>
            <ActionIcon onClick={openEditModal} size="sm">
              <Pencil />
            </ActionIcon>
            <ActionIcon
              onClick={async () => {
                await deleteAppointment({
                  variables: { input: { _id: event.extendedProps._id } },
                });
                modals.closeAll();
              }}
              size="sm"
            >
              <Trash />
            </ActionIcon>
          </>
        )}
        <ActionIcon onClick={() => modals.closeAll()} size="sm">
          <X />
        </ActionIcon>
      </Flex>
    </Flex>
  );
};

export default AppointmentHeader;
