'use client';

import React, { useRef } from 'react';

import {
  AnimatePresence,
  motion,
  useInView,
  Variants,
  UseInViewOptions,
} from 'motion/react';

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: UseInViewOptions['margin'];
  blur?: string;
}
const BlurFade = ({
  blur = '6px',
  children,
  className,
  delay = 0,
  duration = 0.4,
  inView = false,
  inViewMargin = '-50px',
  variant,
  yOffset = 6,
}: BlurFadeProps) => {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { margin: inViewMargin, once: true });
  const isInView = !inView || inViewResult;
  const defaultVariants: Variants = {
    hidden: { filter: `blur(${blur})`, opacity: 0, y: yOffset },
    visible: { filter: `blur(0px)`, opacity: 1, y: -yOffset },
  };
  const combinedVariants = variant || defaultVariants;
  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        exit='hidden'
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: 'easeOut',
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default BlurFade;
