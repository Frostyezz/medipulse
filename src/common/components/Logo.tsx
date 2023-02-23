import Image, { ImageProps } from "next/image";
import React from "react";

const Logo: React.FC<Partial<ImageProps & { textLogo: boolean }>> = ({
  width = 70,
  height = 70,
  textLogo = false,
  ...props
}) => {
  return (
    <Image
      src={textLogo ? "/images/logos/text_logo.svg" : "/images/logos/logo.svg"}
      {...props}
      width={width}
      height={height}
      alt="MediPulse Logo"
    />
  );
};

export default Logo;
