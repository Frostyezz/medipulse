import React from "react";
import { Avatar, Flex, Title, Badge, Tooltip } from "@mantine/core";
import { useAppSelector } from "@/services/redux/hooks";
import { useTranslation } from "react-i18next";
import { Logout } from "tabler-icons-react";

const DashboardProfileMenu: React.FC = () => {
  const { avatar, firstName, lastName } =
    useAppSelector((store) => store.profile) ?? {};
  const { role } = useAppSelector((store) => store.user) ?? {};
  const { t } = useTranslation();

  return (
    <Flex gap={12} align="center">
      <Avatar size="lg" radius="xl" src={avatar} />
      <Flex gap={6} direction="column">
        <Title weight={500} order={5}>{`${firstName} ${lastName}`}</Title>
        <Badge sx={{ width: "min-content" }}>{t(`roles.${role}`)}</Badge>
      </Flex>
      <Tooltip label={t("logout")}>
        <div style={{ marginLeft: "auto", cursor: "pointer" }}>
          <Logout />
        </div>
      </Tooltip>
    </Flex>
  );
};

export default DashboardProfileMenu;
