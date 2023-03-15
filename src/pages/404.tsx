import React from "react";
import { NextPage } from "next";
import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
  rem,
} from "@mantine/core";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/common/utils/routes";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(120),
    },
  },

  title: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

const NotFoundPage: React.FC<NextPage> = () => {
  const { classes } = useStyles();
  const { t } = useTranslation();

  return (
    <Container sx={{ height: "74vh" }} className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>{t("notFound.title")}</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        {t("notFound.subtitle")}
      </Text>
      <Group position="center">
        <Link href={ROUTES.ROOT}>
          <Button variant="subtle" size="md">
            {t("notFound.button")}
          </Button>
        </Link>
      </Group>
    </Container>
  );
};

export default NotFoundPage;
