import Logo from "@/common/components/Logo";
import { ROUTES } from "@/common/utils/routes";
import { Button, Title, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { UserPlus, UserCheck } from "tabler-icons-react";
import { useStyles } from "../styles";

export default function Hero() {
  const { classes } = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.hero}>
      <Logo width={150} height={150} />
      <Title order={1} color="dark.4">
        {t("landingPage.hero.title")}
      </Title>
      <Text color="dark.3">{t("landingPage.hero.subtitle")}</Text>
      <Link href={ROUTES.REGISTER}>
        <Button leftIcon={<UserPlus />} variant="default">
          {t("landingPage.hero.signup")}
        </Button>
      </Link>
      <Link href="">
        <Button leftIcon={<UserCheck />} variant="default">
          {t("landingPage.hero.login")}
        </Button>
      </Link>
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
