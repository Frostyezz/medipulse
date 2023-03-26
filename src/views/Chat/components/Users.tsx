import React from "react";
import useFetchChatUsers from "../hooks/useFetchChatUsers";
import { Flex, Avatar, ScrollArea, Text, Skeleton, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { UserOff } from "tabler-icons-react";
import useCreateChat from "../hooks/useCreateChat";
import { useAppSelector } from "@/services/redux/hooks";
import { ROLES } from "@/services/graphql/types/enums";

const Users: React.FC = () => {
  const { loading, users } = useFetchChatUsers();
  const { t } = useTranslation();
  const { createChat } = useCreateChat();
  const { role, medicId, _id } = useAppSelector((store) => store.user) ?? {};

  if (loading)
    return (
      <ScrollArea p={16} maw="100vw">
        <Flex gap={24}>
          {[1, 2, 3, 4].map((idx) => (
            <Flex w={100} key={idx} direction="column" align="center" gap={8}>
              <Skeleton sx={{ borderRadius: "100%" }} width={84} height={84} />
              <Skeleton width={90} height={22} />
            </Flex>
          ))}
        </Flex>
      </ScrollArea>
    );

  if (!users?.length && !loading)
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="animate__animated animate__fadeIn"
        sx={{ height: "100vh" }}
      >
        <UserOff size={60} />
        <Title sx={{ textAlign: "center" }} weight={500} order={3}>
          {t("There are no users to chat with...")}
        </Title>
      </Flex>
    );

  return (
    <ScrollArea p={16} maw="100vw">
      <Flex gap={24}>
        {users?.map((user) => (
          <Flex
            sx={{ cursor: "pointer" }}
            w={100}
            key={user?._id}
            direction="column"
            align="center"
            gap={8}
            onClick={() =>
              createChat({
                variables: {
                  input: {
                    medicId: role === ROLES.MEDIC ? _id : medicId,
                    patientId:
                      role === ROLES.PATIENT
                        ? _id
                        : user?.role === ROLES.PATIENT
                        ? user.contextId
                        : undefined,
                    nurseId:
                      role === ROLES.NURSE
                        ? _id
                        : user?.role === ROLES.NURSE
                        ? user.contextId
                        : undefined,
                  },
                },
              })
            }
          >
            <Avatar
              size="xl"
              sx={{ borderRadius: "100%" }}
              src={user?.avatar}
            />
            <Text ta="center" fz="sm" c="dimmed">
              {[
                t(`roles.short.${user?.role}`),
                user?.firstName,
                user?.lastName,
              ].join(" ")}
            </Text>
          </Flex>
        ))}
      </Flex>
    </ScrollArea>
  );
};

export default Users;
