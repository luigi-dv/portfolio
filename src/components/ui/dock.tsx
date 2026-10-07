'use client';

import React, { PropsWithChildren, useRef } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

import { cn } from '@/lib/utils';

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  'mx-auto w-max h-full p-2 flex items-end rounded-full border'
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      children,
      className,
      distance = DEFAULT_DISTANCE,
      magnification = DEFAULT_MAGNIFICATION,
      ...props
    },
    ref
  ) => {
    const mousex = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child: any) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            distance,
            magnification,
            mousex,
          } as DockIconProps);
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mousex.set(e.pageX)}
        onMouseLeave={() => mousex.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }))}
      >
        {renderChildren()}
      </motion.div>
    );
  }
);

Dock.displayName = 'Dock';

export interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  mousex?: any;
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
}

const DockIcon = ({
  children,
  className,
  distance = DEFAULT_DISTANCE,
  magnification = DEFAULT_MAGNIFICATION,
  mousex,
  size,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mousex, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { width: 0, x: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  let width = useSpring(widthSync, {
    damping: 12,
    mass: 0.1,
    stiffness: 150,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        'flex aspect-square cursor-pointer items-center justify-center rounded-full',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = 'DockIcon';

export { Dock, DockIcon, dockVariants };
