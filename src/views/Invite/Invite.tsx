import React from "react";
import { Flex, Divider, SimpleGrid, Title } from "@mantine/core";
import SendInvitation from "./components/SendInvitation";
import { useAppSelector } from "@/services/redux/hooks";
import InviteItem from "./components/InviteItem";
import useFetchInvitations from "./hooks/useFetchInvitations";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";

const Invite: React.FC = () => {
  const loading = useFetchInvitations();
  const invites = useAppSelector((store) => store.invite);
  const isMobile = useMediaQuery("(max-width: 1400px)");
  const { t } = useTranslation();

  return (
    <Flex direction="column">
      <SendInvitation />
      <Divider size="md" />
      <Title order={2} mt={12}>
        {t("invite.list.title")}
      </Title>
      <SimpleGrid cols={isMobile ? 1 : 2} mt={12}>
        {invites.map((item, idx) => (
          <InviteItem key={item?._id ?? idx} {...item} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Invite;
