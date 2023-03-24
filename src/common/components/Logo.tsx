import { THEME } from "@/services/graphql/types/enums";
import { useAppSelector } from "@/services/redux/hooks";
import Image, { ImageProps } from "next/image";
import React from "react";

const Logo: React.FC<Partial<ImageProps>> = ({
  width = 70,
  height = 70,
  ...props
}) => {
  const { theme } = useAppSelector((store) => store.user) ?? {};

  return (
    <Image
      src={
        theme === THEME.dark
          ? "/images/logos/logo_white.svg"
          : "/images/logos/logo.svg"
      }
      {...props}
      width={width}
      height={height}
      priority
      alt="MediPulse Logo"
    />
  );
};

export default Logo;
