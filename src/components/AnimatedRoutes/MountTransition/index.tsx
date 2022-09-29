import React, { FC } from "react";
import { motion } from "framer-motion";

type Props = {
  slide?: number;
  slideUp?: number;
  duration?: number;
};

export const MountTransition: FC<Props> = ({
  children,
  slide = 0,
  slideUp = 0,
  duration = 0.2
}) => (
  <motion.div
    exit={{ opacity: 0, scale: 1.5, x: slide, y: slideUp }}
    initial={{ opacity: 0, scale: 0.5, x: slide, y: slideUp }}
    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
    transition={{
      duration
    }}
  >
    {children}
  </motion.div>
);
