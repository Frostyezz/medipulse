import React, { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import Logo from "../Logo";
import CarouselSlide from "./CarouselSlide";
import { useStyles } from "./styles";

interface RegisterLayoutPRops {
  children: React.ReactNode;
}

const RegisterLayout: React.FC<RegisterLayoutPRops> = ({ children }) => {
  const { classes } = useStyles();
  const autoplay = useRef(Autoplay({ delay: 8000 }));

  return (
    <div className={classes.wrapper}>
      <div className={classes.leftPanel}>
        <Logo width={100} height={100} />
        <Carousel
          withIndicators
          withControls={false}
          draggable={false}
          styles={{
            indicator: {
              backgroundColor: "black",
              width: 12,
              height: 4,
              transition: "width 250ms ease",
              "&[data-active]": {
                width: 40,
                backgroundColor: "#288ce4",
              },
            },
          }}
          sx={{ width: "100%", height: "80%" }}
          plugins={[autoplay.current]}
        >
          {[1, 2, 3].map((idx) => (
            <CarouselSlide className={classes.slide} key={idx} idx={idx} />
          ))}
        </Carousel>
      </div>
      <div className={classes.rightPanel}>{children}</div>
    </div>
  );
};

export default RegisterLayout;
