import React from "react";
import { useAppSelector } from "@/services/redux/hooks";
import TransferCard from "./components/TransferCard";
import useFetchTransferRequests from "./hooks/useFetchTransferRequests";
import { Flex, Title, Skeleton } from "@mantine/core";
import { useTranslation } from "react-i18next";
import TransferRequestsZeroState from "./components/TransferRequestsZeroState";

const TransferRequests: React.FC = () => {
  const loading = useFetchTransferRequests();
  const requests = useAppSelector((store) => store.transferRequests);
  const { t } = useTranslation();

  return (
    <Flex direction="column" gap={24} sx={{ height: "100%" }}>
      <Title order={2}>{t("requests.title")}</Title>
      {!loading && !requests.length ? (
        <TransferRequestsZeroState />
      ) : (
        <Flex direction="column" gap={24}>
          {!loading && requests.length ? (
            requests.map((request) => (
              <TransferCard {...request} key={request.request._id} />
            ))
          ) : (
            <Skeleton
              sx={(theme) => ({
                maxWidth: "1000px",
                height: "136px",
                [theme.fn.smallerThan("1200")]: {
                  height: "354px",
                },
              })}
              visible
            />
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default TransferRequests;
