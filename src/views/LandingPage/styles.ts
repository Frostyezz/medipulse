import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },

  // Hero.tsx
  hero: {
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    justifyContent: "center",
    marginLeft: "5%",
    gap: "20px",
    [theme.fn.smallerThan("md")]: {
      alignItems: "center",
      textAlign: "center",
      justifyContent: "start",
      margin: "0 20px",
      marginTop: "50px",
      height: "100vh",
    },
  },
  heroImg: {
    objectFit: "cover",
    objectPosition: "right",
    zIndex: -1,
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
}));
