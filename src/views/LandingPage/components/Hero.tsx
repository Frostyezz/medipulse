import Logo from "@/common/components/Logo";
import { ROUTES } from "@/common/utils/routes";
import { useAppSelector } from "@/services/redux/hooks";
import { Title, Text, Button, Container, Flex } from "@mantine/core";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { UserPlus, UserCheck, LayoutDashboard } from "tabler-icons-react";
import { useStyles } from "../styles";

export default function Hero() {
  const { classes } = useStyles();
  const { t } = useTranslation();
  const { role } = useAppSelector((store) => store.user) ?? {};

  return (
    <Container className={classes.heroWrapper} size={1400}>
      <div className={classes.inner}>
        <Logo width={140} height={140} />
        <Title mt={24} className={classes.title}>
          {t("landingPage.hero.title")}
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
            {t("landingPage.hero.subtitle")}
          </Text>
        </Container>

        <div className={classes.controls}>
          {role ? (
            <Link href={`/${role.toLowerCase()}/dashboard`}>
              <Button leftIcon={<LayoutDashboard />} variant="default">
                {t("landingPage.hero.dashboard")}
              </Button>
            </Link>
          ) : (
            <Flex gap={12}>
              <Link href={ROUTES.REGISTER}>
                <Button leftIcon={<UserPlus />} variant="default">
                  {t("landingPage.hero.signup")}
                </Button>
              </Link>
              <Link href={ROUTES.LOGIN}>
                <Button leftIcon={<UserCheck />} variant="default">
                  {t("landingPage.hero.login")}
                </Button>
              </Link>
            </Flex>
          )}
        </div>
      </div>
    </Container>
  );
}
