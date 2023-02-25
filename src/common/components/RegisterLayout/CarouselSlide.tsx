import React from "react";
import { Carousel } from "@mantine/carousel";
import { useTranslation } from "react-i18next";
import { Title } from "@mantine/core";
import Image from "next/image";

interface CarouselSlideProps {
  idx: number;
  className: string;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({ idx, className }) => {
  const { t } = useTranslation();
  return (
    <Carousel.Slide className={className}>
      <Image
        src={`/images/register/illustration${idx}.svg`}
        alt="Illustration"
        fill
      />
      <Title color="dark.4" order={2}>
        {t(`register.caption.${idx}`)}
      </Title>
    </Carousel.Slide>
  );
};

export default CarouselSlide;
