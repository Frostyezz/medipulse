import React, { useState } from "react";
import {
  Flex,
  Title,
  Paper,
  Text,
  UnstyledButton,
  Group,
  Button,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useDashboardStyles } from "../useDashboardStyles";
import useGetAppointments from "../hooks/useGetAppointments";
import AppointmentCard from "./AppointmentCard";
import { ChevronDown, ChevronUp } from "tabler-icons-react";
import Link from "next/link";
import { ROUTES } from "@/common/utils/routes";
import { useAppSelector } from "@/services/redux/hooks";
import { ROLES } from "@/services/graphql/types/enums";
import "dayjs/locale/en";
import "dayjs/locale/ro";

const AppointmentPanel: React.FC = () => {
  const { t } = useTranslation();
  const { classes } = useDashboardStyles();
  const [date, setDate] = useState(dayjs().toDate());
  const { appointments } = useGetAppointments(date);
  const { role, language } = useAppSelector((store) => store.user) ?? {};
  dayjs.locale(language);

  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Title fw={500} order={3}>
        {t("dashboard.appointments.title")}
      </Title>
      <Text c="dimmed" fz="sm">
        {t("dashboard.appointments.subtitle")}
      </Text>
      <div className={classes.root}>
        <div className={classes.controls}>
          <UnstyledButton
            className={classes.control}
            onClick={() =>
              setDate((current) => dayjs(current).add(1, "day").toDate())
            }
          >
            <ChevronUp size="1rem" className={classes.controlIcon} />
          </UnstyledButton>

          <div className={classes.date}>
            <Text className={classes.day}>{dayjs(date).format("DD")}</Text>
            <Text className={classes.month}>{dayjs(date).format("MMMM")}</Text>
          </div>

          <UnstyledButton
            className={classes.control}
            onClick={() =>
              setDate((current) => dayjs(current).subtract(1, "day").toDate())
            }
          >
            <ChevronDown size="1rem" className={classes.controlIcon} />
          </UnstyledButton>
        </div>
        <Group sx={{ flex: 1 }}>
          {appointments?.length ? (
            appointments?.map((appointment) => (
              <AppointmentCard key={appointment._id} {...appointment} />
            ))
          ) : (
            <Flex
              gap={12}
              h={140}
              w="100%"
              justify="center"
              align="center"
              direction="column"
            >
              <Title ta="center" c="white" fw={500} order={4}>
                {t("dashboard.appointments.zeroState.title")}
              </Title>
              {role && role !== ROLES.NURSE && (
                <Link href={ROUTES[`${role}_APPOINTMENTS`]}>
                  <Button variant="default">
                    {t("dashboard.appointments.zeroState.button")}
                  </Button>
                </Link>
              )}
            </Flex>
          )}
        </Group>
      </div>
    </Paper>
  );
};

export default AppointmentPanel;
