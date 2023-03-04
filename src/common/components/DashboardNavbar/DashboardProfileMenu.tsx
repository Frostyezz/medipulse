import React from "react";
import { Avatar, Flex, Title, Badge, Tooltip } from "@mantine/core";
import { useAppSelector } from "@/services/redux/hooks";
import { useTranslation } from "react-i18next";
import { Logout } from "tabler-icons-react";
import useLogout from "@/common/hooks/useLogout";
import Image from "next/image";

const DashboardProfileMenu: React.FC = () => {
  const { avatar, firstName, lastName } =
    useAppSelector((store) => store.profile) ?? {};
  const { role } = useAppSelector((store) => store.user) ?? {};
  const { t } = useTranslation();
  const logout = useLogout();

  return (
    <Flex gap={12} align="center">
      <Avatar size="lg" radius="xl">
        {!!avatar && (
          <Image
            src={avatar}
            fill
            objectFit="cover"
            style={{ borderRadius: "100%" }}
            alt="Profile avatar"
            priority
          />
        )}
      </Avatar>
      <Flex gap={6} direction="column">
        <Title weight={500} order={5}>{`${firstName} ${lastName}`}</Title>
        <Badge sx={{ width: "min-content" }}>{t(`roles.${role}`)}</Badge>
      </Flex>
      <Tooltip label={t("logout")}>
        <div
          onClick={() => logout()}
          style={{ marginLeft: "auto", cursor: "pointer" }}
        >
          <Logout />
        </div>
      </Tooltip>
    </Flex>
  );
};

export default DashboardProfileMenu;
