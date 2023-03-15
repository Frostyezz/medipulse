import Logo from "@/common/components/Logo";
import { ROUTES } from "@/common/utils/routes";
import { useAppSelector } from "@/services/redux/hooks";
import { Button, Title, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { UserPlus, UserCheck, LayoutDashboard } from "tabler-icons-react";
import { useStyles } from "../styles";

export default function Hero() {
  const { classes } = useStyles();
  const { t } = useTranslation();
  const { role } = useAppSelector((store) => store.user) ?? {};

  return (
    <div className={classes.hero}>
      <Logo width={150} height={150} />
      <Title order={1} color="dark.4">
        {t("landingPage.hero.title")}
      </Title>
      <Text color="dark.3">{t("landingPage.hero.subtitle")}</Text>
      {role ? (
        <Link href={`/${role.toLowerCase()}/dashboard`}>
          <Button leftIcon={<LayoutDashboard />} variant="default">
            {t("landingPage.hero.dashboard")}
          </Button>
        </Link>
      ) : (
        <>
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
        </>
      )}
      <Image
        fill
        priority
        className={classes.heroImg}
        src="/images/landing-page/bg.jpg"
        alt="hero"
      />
    </div>
  );
}
