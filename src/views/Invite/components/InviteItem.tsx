import React from "react";
import { Flex, Badge, Text, List } from "@mantine/core";
import { Invite } from "@/services/graphql/schemas/invite.schema";
import { useInviteStyles } from "../Invite.styles";
import { INVITATION_STATUS } from "@/services/graphql/types/enums";
import { useTranslation } from "react-i18next";
import TimeAgo from "@/common/components/TimeAgo/TimeAgo";
import { Mail, Clock } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";

const StatusColorMap: Record<INVITATION_STATUS, "cyan" | "blue"> = {
  [INVITATION_STATUS.SENT]: "cyan",
  [INVITATION_STATUS.ACCEPTED]: "blue",
};

const InviteItem: React.FC<Partial<Invite>> = ({
  createdAt,
  updatedAt,
  email,
  status = INVITATION_STATUS.SENT,
}) => {
  const { classes } = useInviteStyles();
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 1400px)");

  return (
    <Flex className={classes.wrapper}>
      <Flex
        align="center"
        justify="center"
        sx={{ minWidth: isMobile ? "90px" : "120px" }}
        bg={StatusColorMap[status]}
      >
        <Badge color={StatusColorMap[status]} size={isMobile ? "xs" : "md"}>
          {t(`invitation.status.${status}`)}
        </Badge>
      </Flex>
      <Flex p={10} direction="column">
        <List size={isMobile ? "xs" : "md"}>
          <List.Item
            icon={<Mail size={isMobile ? "20px" : "24px"} color="#228be6" />}
          >
            <Text>{email}</Text>
          </List.Item>
          <List.Item
            icon={<Clock size={isMobile ? "20px" : "24px"} color="#228be6" />}
          >
            <Flex gap={4}>
              <Text>{t(`invitation.status.${status}`)}</Text>
              <TimeAgo
                date={
                  status === INVITATION_STATUS.SENT
                    ? createdAt ?? ""
                    : updatedAt ?? ""
                }
              />
            </Flex>
          </List.Item>
        </List>
      </Flex>
    </Flex>
  );
};

export default InviteItem;
