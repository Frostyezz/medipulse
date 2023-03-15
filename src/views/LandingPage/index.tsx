import Faq from "./components/Faq";
import FeaturesCards from "./components/Features";
import Hero from "./components/Hero";
import { useStyles } from "./styles";

export default function LandingPage() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Hero />
      <FeaturesCards />
      <Faq />
    </div>
  );
}
