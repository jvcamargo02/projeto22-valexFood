import React from "react";
import styled from "@emotion/styled";
import { Spring } from "react-spring/renderprops";
import { motion } from "framer-motion";

export default function Slide({
  content,
  offsetRadius,
  index,
  animationConfig,
  onClick,
  thisKey
}) {
  const offsetFromCenter = index - offsetRadius;
  const totalPresentables = 2 * offsetRadius + 1;
  const distanceFactor = 1 - Math.abs(offsetFromCenter / (offsetRadius + 1));

  const translateXoffset =
    50 * (Math.abs(offsetFromCenter) / (offsetRadius + 1));
  let translateX = -50;

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateX = 0;
    } else if (index === totalPresentables - 1) {
      translateX = -100;
    }
  }

  if (offsetFromCenter > 0) {
    translateX += translateXoffset;
  } else if (offsetFromCenter < 0) {
    translateX -= translateXoffset;
  }

  const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

  const thumbnailVariants = {
    initial: { scale: 0.9, opacity: 0 },
    enter: { scale: 1, opacity: 1, transition },
    exit: {
      scale: 0.5,
      opacity: 0,
      transition: { ...transition, duration: 1.5 }
    }
  };

  const imageVariants = {
    hover: { scale: 1.15 }
  };

  return (
    <motion.div
      variants={thumbnailVariants}
      transition={transition}
      whileHover="hover"
    >
      <Spring
        to={{
          transform: `translateY(-50%) translateX(${translateX}%) scale(${distanceFactor})`,
          left: `${
            offsetRadius === 0
              ? 50
              : 50 + (offsetFromCenter * 50) / offsetRadius
          }%`,
          opacity: distanceFactor * distanceFactor,
          top:
            distanceFactor === 1
              ? "50%"
              : `${27 * (distanceFactor * distanceFactor)}%`
        }}
        config={animationConfig}
      >
        {(style) => (
          <SlideContainer
            style={{
              ...style,
              zIndex: Math.abs(Math.abs(offsetFromCenter) - 2)
            }}
            onClick={onClick}
          >
            {thisKey}
            <motion.img
              whileHover="hover"
              src={content}
              variants={imageVariants}
              transition={transition}
            />
          </SlideContainer>
        )}
      </Spring>
    </motion.div>
  );
}

const SlideContainer = styled.div`
  position: absolute;
  height: 80%;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 310%;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  img {
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.1);
    border-radius: 100%;
    pointer-events: none;

    &:focus {
      outline: none;
    }
  }

  img {
    object-fit: scale-down;
    display: block;
    max-height: 100%;
  }
`;
