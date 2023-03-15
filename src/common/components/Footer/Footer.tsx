import { ROUTES } from "@/common/utils/routes";
import { createStyles, Container, Group, ActionIcon, rem } from "@mantine/core";
import Link from "next/link";
import { BrandGithub, BrandLinkedin, BrandYoutube } from "tabler-icons-react";
import Logo from "../Logo";

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

const Footer: React.FC = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Link href={ROUTES.ROOT}>
          <Logo />
        </Link>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <a href="https://github.com/Frostyezz">
            <ActionIcon size="xl">
              <BrandGithub size="1.5rem" />
            </ActionIcon>
          </a>
          <a href="https://www.linkedin.com/in/robert-moraru-5801b01a7">
            <ActionIcon size="xl">
              <BrandLinkedin size="1.5rem" />
            </ActionIcon>
          </a>
          <a href="https://www.youtube.com/channel/UCdx8wxQb3vD18WQFZjdU5Cg">
            <ActionIcon size="xl">
              <BrandYoutube size="1.5rem" />
            </ActionIcon>
          </a>
        </Group>
      </Container>
    </div>
  );
};

export default Footer;
