import React from "react";
import { GetTransfersRequestsResult } from "@/services/graphql/schemas/transferRequest.schema";
import { useTranslation } from "react-i18next";
import { Flex, Paper, Text } from "@mantine/core";
import ProfileInfo from "./ProfileInfo";
import { useMediaQuery } from "@mantine/hooks";
import TimeAgo from "@/common/components/TimeAgo/TimeAgo";
import Arrow from "./Arrow";

const TransferCard: React.FC<GetTransfersRequestsResult> = ({
  request,
  medicProfile,
  patientProfile,
}) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 1200px)");

  return (
    <Paper
      radius="md"
      withBorder
      className="animate__animated animate__fadeIn"
      p="lg"
      sx={{ maxWidth: "1000px" }}
    >
      <Flex
        justify="space-between"
        direction={isMobile ? "column" : "row"}
        gap={12}
      >
        <ProfileInfo {...patientProfile} />
        <Flex
          direction={isMobile ? "row" : "column"}
          justify={isMobile ? "start" : "center"}
          ml={isMobile ? 45 : 0}
        >
          {!isMobile && <Text c="dimmed">{t("requests.transfer.title")}</Text>}
          <Arrow />
          {!isMobile && <TimeAgo c="dimmed" mt={16} date={request.createdAt} />}
          {isMobile && (
            <Flex direction="column" ml={16} justify="center">
              <Text c="dimmed">{t("requests.transfer.title")}</Text>
              <TimeAgo c="dimmed" date={request.createdAt} />
            </Flex>
          )}
        </Flex>
        <ProfileInfo {...medicProfile} />
      </Flex>
    </Paper>
  );
};

export default TransferCard;
