import React from "react";
import {
  createStyles,
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
  Title,
  Skeleton,
} from "@mantine/core";
import useGetStats from "../hooks/useGetStats";
import { ROLES } from "@/services/graphql/types/enums";
import { useAppSelector } from "@/services/redux/hooks";
import { useTranslation } from "react-i18next";
import { ArrowDownRight, ArrowUpRight } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const Stats: React.FC = () => {
  const { classes } = useStyles();
  const { data } = useGetStats();
  const isPatient =
    useAppSelector((store) => store.user.role) === ROLES.PATIENT;
  const { t } = useTranslation();

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
        {t("dashboard.stats.title")}
      </Title>
      <div className={classes.root}>
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <Paper withBorder p="md" radius="md">
            <Group position="apart">
              <div>
                <Text
                  c="dimmed"
                  tt="uppercase"
                  fw={700}
                  fz="xs"
                  className={classes.label}
                >
                  {t("dashboard.stats.appointments")}
                </Text>
                <Text fw={700} fz="xl">
                  {data?.getStats?.appointments}
                </Text>
              </div>
              <ThemeIcon
                color="gray"
                variant="light"
                sx={(theme) => ({
                  color:
                    data?.getStats?.appointmentPercentage &&
                    data?.getStats?.appointmentPercentage > 0
                      ? theme.colors.teal[6]
                      : theme.colors.red[6],
                })}
                size={38}
                radius="md"
              >
                {data?.getStats?.appointmentPercentage &&
                data?.getStats?.appointmentPercentage > 0 ? (
                  <ArrowUpRight size="1.8rem" />
                ) : (
                  <ArrowDownRight size="1.8rem" />
                )}
              </ThemeIcon>
            </Group>
            <Text c="dimmed" fz="sm" mt="md">
              <Text
                component="span"
                c={
                  data?.getStats?.appointmentPercentage &&
                  data?.getStats?.appointmentPercentage > 0
                    ? "teal"
                    : "red"
                }
                fw={700}
              >
                {data?.getStats?.appointmentPercentage}%
              </Text>{" "}
              {data?.getStats?.appointmentPercentage &&
              data?.getStats?.appointmentPercentage > 0
                ? t("dashboard.stats.increase")
                : t("dashboard.stats.decrease")}
            </Text>
          </Paper>
          {!isPatient && (
            <>
              <Paper withBorder p="md" radius="md">
                <Group position="apart">
                  <div>
                    <Text
                      c="dimmed"
                      tt="uppercase"
                      fw={700}
                      fz="xs"
                      className={classes.label}
                    >
                      {t("dashboard.stats.patients")}
                    </Text>
                    <Text fw={700} fz="xl">
                      {data?.getStats?.patients}
                    </Text>
                  </div>
                  <ThemeIcon
                    color="gray"
                    variant="light"
                    sx={(theme) => ({
                      color:
                        data?.getStats.patientPercentage &&
                        data?.getStats?.patientPercentage > 0
                          ? theme.colors.teal[6]
                          : theme.colors.red[6],
                    })}
                    size={38}
                    radius="md"
                  >
                    {data?.getStats?.patientPercentage &&
                    data?.getStats?.patientPercentage > 0 ? (
                      <ArrowUpRight size="1.8rem" />
                    ) : (
                      <ArrowDownRight size="1.8rem" />
                    )}
                  </ThemeIcon>
                </Group>
                <Text c="dimmed" fz="sm" mt="md">
                  <Text
                    component="span"
                    c={
                      data?.getStats?.patientPercentage &&
                      data?.getStats?.patientPercentage > 0
                        ? "teal"
                        : "red"
                    }
                    fw={700}
                  >
                    {data?.getStats?.patientPercentage}%
                  </Text>{" "}
                  {data?.getStats?.patientPercentage &&
                  data?.getStats?.patientPercentage > 0
                    ? t("dashboard.stats.increase")
                    : t("dashboard.stats.decrease")}
                </Text>
              </Paper>
              <Paper withBorder p="md" radius="md">
                <Group position="apart">
                  <div>
                    <Text
                      c="dimmed"
                      tt="uppercase"
                      fw={700}
                      fz="xs"
                      className={classes.label}
                    >
                      {t("dashboard.stats.invites")}
                    </Text>
                    <Text fw={700} fz="xl">
                      {data?.getStats?.invites}
                    </Text>
                  </div>
                  <ThemeIcon
                    color="gray"
                    variant="light"
                    sx={(theme) => ({
                      color:
                        data?.getStats.invitePercentage &&
                        data?.getStats?.invitePercentage > 0
                          ? theme.colors.teal[6]
                          : theme.colors.red[6],
                    })}
                    size={38}
                    radius="md"
                  >
                    {data?.getStats?.invitePercentage &&
                    data?.getStats?.invitePercentage > 0 ? (
                      <ArrowUpRight size="1.8rem" />
                    ) : (
                      <ArrowDownRight size="1.8rem" />
                    )}
                  </ThemeIcon>
                </Group>
                <Text c="dimmed" fz="sm" mt="md">
                  <Text
                    component="span"
                    c={
                      data?.getStats?.invitePercentage &&
                      data?.getStats?.invitePercentage > 0
                        ? "teal"
                        : "red"
                    }
                    fw={700}
                  >
                    {data?.getStats?.invitePercentage}%
                  </Text>{" "}
                  {data?.getStats?.invitePercentage &&
                  data?.getStats?.invitePercentage > 0
                    ? t("dashboard.stats.increase")
                    : t("dashboard.stats.decrease")}
                </Text>
              </Paper>
            </>
          )}
        </SimpleGrid>
      </div>
    </Paper>
  );
};

export default Stats;
