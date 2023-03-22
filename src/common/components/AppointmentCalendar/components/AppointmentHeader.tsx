import React from "react";
import { ActionIcon, Badge, Flex } from "@mantine/core";
import { APPOINTMENT_STATUS } from "@/services/graphql/types/enums";
import { modals } from "@mantine/modals";
import { Pencil, Trash, X } from "tabler-icons-react";
import { useTranslation } from "react-i18next";

const StatusColorMap: Record<APPOINTMENT_STATUS, string> = {
  [APPOINTMENT_STATUS.ACCEPTED]: "blue",
  [APPOINTMENT_STATUS.PENDING]: "cyan",
  [APPOINTMENT_STATUS.REJECTED]: "red",
};

interface AppointmentHeaderProps {
  status: APPOINTMENT_STATUS;
}

const AppointmentHeader: React.FC<AppointmentHeaderProps> = ({ status }) => {
  const { t } = useTranslation();
  return (
    <Flex sx={{ width: "100%" }} align="center" justify="space-between">
      <Badge color={StatusColorMap[status as APPOINTMENT_STATUS]}>
        {t(`appointment.status.${status}`)}
      </Badge>
      <Flex gap={6}>
        <ActionIcon size="sm">
          <Pencil />
        </ActionIcon>
        <ActionIcon size="sm">
          <Trash />
        </ActionIcon>
        <ActionIcon onClick={() => modals.closeAll()} size="sm">
          <X />
        </ActionIcon>
      </Flex>
    </Flex>
  );
};

export default AppointmentHeader;
