import Logo from "@/common/components/Logo";
import { Button, Title, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
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
      <Link href="">
        <Button></Button>
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
