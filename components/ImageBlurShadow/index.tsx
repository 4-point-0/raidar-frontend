import { Box, Image } from "@mantine/core";
import React, { useState } from "react";

interface ImageWithBlurredShadowProps {
  src: string;
  alt: string;
  height: number;
  width?: number;
  shadowOffset?: number;
  blur?: number;
}

const ImageWithBlurredShadow = ({
  src,
  alt,
  height,
  shadowOffset = -16,
  blur = 18,
  width,
}: ImageWithBlurredShadowProps) => {
  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        height: height,
        borderRadius: theme.radius.md,
        zIndex: 1,
      })}
    >
      <Image
        src={src}
        alt={alt}
        height={height}
        width={width || "none"}
        fit="cover"
        radius="md"
        sx={{
          zIndex: 9999,
        }}
      />

      <Image
        src={src}
        alt=""
        height={height}
        width={width || "none"}
        fit="cover"
        radius="md"
        sx={{
          position: "absolute",
          bottom: shadowOffset,
          left: 0,
          filter: `blur(${blur}px)`,
          zIndex: -100,
        }}
      />
    </Box>
  );
};

export default ImageWithBlurredShadow;
