import React from "react";
import { Flex, Divider, SimpleGrid, Title, Skeleton } from "@mantine/core";
import SendInvitation from "./components/SendInvitation";
import { useAppSelector } from "@/services/redux/hooks";
import InviteItem from "./components/InviteItem";
import useFetchInvitations from "./hooks/useFetchInvitations";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { MailOff } from "tabler-icons-react";

const Invite: React.FC = () => {
  const loading = useFetchInvitations();
  const invites = useAppSelector((store) => store.invite);
  const isMobile = useMediaQuery("(max-width: 1400px)");
  const { t } = useTranslation();

  return (
    <Flex direction="column" sx={{ height: "100%" }}>
      <SendInvitation />
      <Divider size="md" />
      <Title order={2} mt={12}>
        {t("invite.list.title")}
      </Title>
      {!invites.length && !loading ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="animate__animated animate__fadeIn"
          sx={{ height: "100%" }}
        >
          <MailOff size={60} />
          <Title sx={{ textAlign: "center" }} weight={500} order={3}>
            {t("invite.zeroState")}
          </Title>
        </Flex>
      ) : (
        <SimpleGrid cols={isMobile ? 1 : 2} mt={12}>
          {loading
            ? [1, 2, 3, 4].map((idx) => (
                <Skeleton visible height={81} key={idx} />
              ))
            : invites.map((item, idx) => (
                <InviteItem key={item?._id ?? idx} {...item} />
              ))}
        </SimpleGrid>
      )}
    </Flex>
  );
};

export default Invite;
