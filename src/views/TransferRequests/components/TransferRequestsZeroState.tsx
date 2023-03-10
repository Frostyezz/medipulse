import React from "react";
import { Flex, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { FilesOff } from "tabler-icons-react";

const TransferRequestsZeroState: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="animate__animated animate__fadeIn"
      sx={{ height: "100%" }}
    >
      <FilesOff size={60} />
      <Title sx={{ textAlign: "center" }} weight={500} order={3}>
        {t("requests.zeroState")}
      </Title>
    </Flex>
  );
};

export default TransferRequestsZeroState;
