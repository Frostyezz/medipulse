import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
} from "@mantine/core";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CalendarEvent, ReportMedical, UserCircle } from "tabler-icons-react";

const content = [
  {
    title: "landingPage.features.0.title",
    description: "landingPage.features.0.desc",
    icon: UserCircle,
  },
  {
    title: "landingPage.features.1.title",
    description: "landingPage.features.1.desc",
    icon: CalendarEvent,
  },
  {
    title: "landingPage.features.2.title",
    description: "landingPage.features.2.desc",
    icon: ReportMedical,
  },
];

const useStyles = createStyles((theme) => ({
  wrapper: {
    marginTop: "100px",
    [theme.fn.smallerThan("sm")]: {
      marginTop: "0px",
    },
  },
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

const FeaturesCards: React.FC = () => {
  const { classes, theme } = useStyles();
  const { t } = useTranslation();

  const features = useMemo(
    () =>
      content.map((feature) => (
        <Card
          key={feature.title}
          shadow="md"
          radius="md"
          className={classes.card}
          padding="xl"
        >
          <feature.icon size={rem(50)} color={theme.fn.primaryColor()} />
          <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
            {t(feature.title)}
          </Text>
          <Text fz="sm" c="dimmed" mt="sm">
            {t(feature.description)}
          </Text>
        </Card>
      )),
    [t]
  );

  return (
    <Container className={classes.wrapper} size="lg" py="xl">
      <Group position="center">
        <Badge variant="filled" size="lg">
          {t("landingPage.features.title")}
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        {t("landingPage.features.subtitle")}
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        {t("landingPage.features.desc")}
      </Text>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
};

export default FeaturesCards;
