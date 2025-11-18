"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const AnimatedElement = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    if (!inView) {
      setIsVisible(false);
    }
  }, [inView]);

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
    }
  }, [inView, isVisible]);

  return (
    <div
      ref={ref}
      className={`opacity-0 transition-all duration-700 ease-in-out ${className} ${
      isVisible ? "opacity-100 transform translate-y-0" : ""
      }`}
    >
      {children}
    </div>
  );
};
