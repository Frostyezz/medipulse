import { createStyles, rem } from "@mantine/core";

export const useDashboardStyles = createStyles((theme) => ({
  root: {
    marginTop: theme.spacing.lg,
    backgroundImage:
      theme.colorScheme === "dark"
        ? "linear-gradient(-60deg, rgb(55, 58, 64) 0%, rgb(26, 27, 30) 0%);"
        : "linear-gradient(-60deg, #b2dbff  0%, #4dabf7 100%)",
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    display: "flex",

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  avatar: {
    margin: "auto",
  },

  stat: {
    minWidth: rem(98),
    maxWidth: rem(120),
    paddingTop: theme.spacing.xl,
    minHeight: rem(140),
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
  },

  label: {
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[3]
        : theme.colors.gray[6],
    lineHeight: 1.2,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },

  value: {
    fontSize: theme.fontSizes.sm,
    fontWeight: 700,
    color: theme.black,
  },

  time: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[4]
        : theme.colors.gray[7],
  },

  day: {
    fontSize: rem(44),
    fontWeight: 700,
    color: theme.white,
    lineHeight: 1,
    textAlign: "center",
    marginBottom: 5,
  },

  month: {
    fontSize: theme.fontSizes.sm,
    color: theme.white,
    lineHeight: 1,
    textAlign: "center",
  },

  controls: {
    display: "flex",
    flexDirection: "column",
    marginRight: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "row-reverse",
      alignItems: "center",
      marginRight: 0,
      marginBottom: theme.spacing.xl,
    },
  },

  date: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  control: {
    height: rem(28),
    width: "100%",
    color:
      theme.colorScheme === "dark"
        ? theme.white
        : theme.colors[theme.primaryColor][2],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radius.md,
    transition: "background-color 50ms ease",

    [theme.fn.smallerThan("xs")]: {
      height: rem(34),
      width: rem(34),
    },

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors[theme.primaryColor][5],
      color: theme.white,
    },
  },

  controlIcon: {
    [theme.fn.smallerThan("xs")]: {
      transform: "rotate(90deg)",
    },
  },
}));
