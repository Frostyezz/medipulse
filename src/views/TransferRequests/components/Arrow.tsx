import { THEME } from "@/services/graphql/types/enums";
import { createStyles, Divider, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    width: "200px",
    [theme.fn.smallerThan("1200")]: {
      width: "5px",
      height: "100px",
    },
  },
  arrow: {
    position: "absolute",
    width: "99%",
    top: 5,
    borderWidth: "3px",
    [theme.fn.smallerThan("1200")]: {
      width: "5px",
      height: "94%",
    },
  },
  head: {
    right: 0,
    position: "absolute",
    transform: "rotate(-45deg)",
    border:
      theme.colorScheme === THEME.dark ? "solid #373A40" : "solid #ced4da",
    borderWidth: "0 3px 3px 0",
    display: "inline-block",
    padding: "5px",
    [theme.fn.smallerThan("1200")]: {
      transform: "rotate(45deg)",
      bottom: 0,
      right: -3,
    },
  },
}));

const Arrow: React.FC = () => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery("(max-width: 1200px)");

  return (
    <Flex className={classes.wrapper}>
      <Divider
        orientation={isMobile ? "vertical" : "horizontal"}
        className={classes.arrow}
      />
      <div className={classes.head} />
    </Flex>
  );
};

export default Arrow;
