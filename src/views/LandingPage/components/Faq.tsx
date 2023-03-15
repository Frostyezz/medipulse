import React from "react";
import { Container, Title, Accordion, createStyles, rem } from "@mantine/core";
import { useTranslation } from "react-i18next";

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: "100%",
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    minHeight: 650,
  },

  title: {
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const content = [
  {
    question: "landingPage.faq.1.question",
    answer: "landingPage.faq.1.answer",
  },
  {
    question: "landingPage.faq.2.question",
    answer: "landingPage.faq.2.answer",
  },
  {
    question: "landingPage.faq.3.question",
    answer: "landingPage.faq.3.answer",
  },
  {
    question: "landingPage.faq.4.question",
    answer: "landingPage.faq.4.answer",
  },
];

const Faq: React.FC = () => {
  const { classes } = useStyles();
  const { t } = useTranslation();

  return (
    <Container mt={100} size="sm" className={classes.wrapper}>
      <Title align="center" className={classes.title}>
        {t("landingPage.faq.title")}
      </Title>

      <Accordion variant="separated">
        {content.map((item, idx) => (
          <Accordion.Item
            key={idx}
            className={classes.item}
            value={String(idx)}
          >
            <Accordion.Control>{t(item.question)}</Accordion.Control>
            <Accordion.Panel>{t(item.answer)}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default Faq;
