import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "100vh",
    width: "100vw",
    display: "flex",
  },
  leftPanel: {
    width: "40%",
    height: "100%",
    backgroundColor: "#f7f7ff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px 5%",
    gap: "24px",
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
  slide: {
    height: "70vh",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  rightPanel: {
    width: "60%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "70px",
    [theme.fn.smallerThan("md")]: {
      width: "100%",
      padding: "50px 30px",
    },
  },
}));
