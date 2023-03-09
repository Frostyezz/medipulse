import React from "react";
import { Flex, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { MapPinOff } from "tabler-icons-react";

const AllowLocationWarning: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="animate__animated animate__fadeIn"
      sx={{ height: "100%" }}
    >
      <MapPinOff size={60} />
      <Title mt={6} sx={{ textAlign: "center" }} weight={500} order={4}>
        {t("doctors.location.warning")}
      </Title>
    </Flex>
  );
};

export default AllowLocationWarning;
