import React from "react";
import { ActionIcon, Badge, Flex } from "@mantine/core";
import { APPOINTMENT_STATUS, ROLES } from "@/services/graphql/types/enums";
import { modals } from "@mantine/modals";
import { Pencil, Trash, X } from "tabler-icons-react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/services/redux/hooks";
import useDeleteAppointment from "@/common/hooks/useDeleteAppointment";

const StatusColorMap: Record<APPOINTMENT_STATUS, string> = {
  [APPOINTMENT_STATUS.ACCEPTED]: "blue",
  [APPOINTMENT_STATUS.PENDING]: "cyan",
  [APPOINTMENT_STATUS.REJECTED]: "red",
};

interface AppointmentHeaderProps {
  status: APPOINTMENT_STATUS;
  _id: string;
}

const AppointmentHeader: React.FC<AppointmentHeaderProps> = ({
  status,
  _id,
}) => {
  const { t } = useTranslation();
  const { role } = useAppSelector((store) => store.user) ?? {};
  const deleteAppointment = useDeleteAppointment();

  return (
    <Flex sx={{ width: "100%" }} align="center" justify="space-between">
      <Badge color={StatusColorMap[status as APPOINTMENT_STATUS]}>
        {t(`appointment.status.${status}`)}
      </Badge>
      <Flex gap={6}>
        {role === ROLES.MEDIC && (
          <>
            <ActionIcon size="sm">
              <Pencil />
            </ActionIcon>
            <ActionIcon
              onClick={async () => {
                await deleteAppointment({ variables: { input: { _id } } });
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
