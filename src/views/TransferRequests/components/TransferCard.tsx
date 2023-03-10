import React from "react";
import { GetTransfersRequestsResult } from "@/services/graphql/schemas/transferRequest.schema";
import { useTranslation } from "react-i18next";
import { Button, Flex, Paper, Text } from "@mantine/core";
import ProfileInfo from "./ProfileInfo";
import { useMediaQuery } from "@mantine/hooks";
import TimeAgo from "@/common/components/TimeAgo/TimeAgo";
import Arrow from "./Arrow";
import useProcessTransferRequest from "../hooks/useProcessTransferRequest";
import { REQUEST_STATUS } from "@/services/graphql/types/enums";

const TransferCard: React.FC<GetTransfersRequestsResult> = ({
  request,
  medicProfile,
  patientProfile,
}) => {
  const { loading, processRequest } = useProcessTransferRequest();
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
          {!isMobile && (
            <Flex mb={4} gap={10}>
              <Button
                onClick={() =>
                  processRequest({
                    variables: {
                      input: {
                        transferId: request._id,
                        status: REQUEST_STATUS.ACCEPTED,
                      },
                    },
                  })
                }
                disabled={loading}
                compact
                variant="light"
                color="blue"
              >
                {t("requests.transfer.approve")}
              </Button>
              <Button
                onClick={() =>
                  processRequest({
                    variables: {
                      input: {
                        transferId: request._id,
                        status: REQUEST_STATUS.REJECTED,
                      },
                    },
                  })
                }
                disabled={loading}
                compact
                variant="light"
                color="cyan"
              >
                {t("requests.transfer.reject")}
              </Button>
            </Flex>
          )}
          <Arrow />
          {!isMobile && (
            <Flex gap={4} mt={16}>
              <Text c="dimmed">{t("requests.transfer.title")}</Text>
              <TimeAgo c="dimmed" date={request.createdAt} />
            </Flex>
          )}
          {isMobile && (
            <Flex direction="column" ml={16} justify="center">
              <Flex gap={10}>
                <Button
                  onClick={() =>
                    processRequest({
                      variables: {
                        input: {
                          transferId: request._id,
                          status: REQUEST_STATUS.ACCEPTED,
                        },
                      },
                    })
                  }
                  disabled={loading}
                  compact
                  variant="light"
                  color="blue"
                >
                  {t("requests.transfer.approve")}
                </Button>
                <Button
                  onClick={() =>
                    processRequest({
                      variables: {
                        input: {
                          transferId: request._id,
                          status: REQUEST_STATUS.REJECTED,
                        },
                      },
                    })
                  }
                  disabled={loading}
                  compact
                  variant="light"
                  color="cyan"
                >
                  {t("requests.transfer.reject")}
                </Button>
              </Flex>
              <Flex gap={4} mt={6}>
                <Text c="dimmed">{t("requests.transfer.title")}</Text>
                <TimeAgo c="dimmed" date={request.createdAt} />
              </Flex>
            </Flex>
          )}
        </Flex>
        <ProfileInfo {...medicProfile} />
      </Flex>
    </Paper>
  );
};

export default TransferCard;
