import Hero from "./components/Hero";
import { useStyles } from "./styles";

export default function LandingPage() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Hero />
    </div>
  );
}
