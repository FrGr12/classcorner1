
import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "button" | "card" | "avatar" | "badge" | "input" | "media" | "chart";
  width?: number | string;
  height?: number | string;
  animation?: "pulse" | "wave" | "shimmer" | "none";
  className?: string;
}

export const Skeleton = ({
  variant = "rectangular",
  width,
  height,
  animation = "shimmer",
  className,
  ...props
}: SkeletonProps) => {
  // Determine animation class
  const animationClass = 
    animation === "pulse" 
      ? "animate-pulse" 
      : animation === "wave" 
        ? "animate-skeleton-wave" 
        : animation === "shimmer"
          ? "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent"
          : "";
  
  const baseClasses = "bg-neutral-200 dark:bg-neutral-700";
  
  const variantClasses = {
    text: "h-4 rounded w-full",
    circular: "rounded-full",
    rectangular: "rounded",
    button: "rounded-md",
    card: "rounded-xl",
    avatar: "rounded-full h-10 w-10",
    badge: "h-6 w-16 rounded-full",
    input: "h-10 rounded-md",
    media: "rounded-md h-40 w-full",
    chart: "h-40 rounded-md",
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClass,
        className
      )}
      style={{
        width: width,
        height: height,
      }}
      role="status"
      aria-busy="true"
      aria-label="Loading"
      {...props}
    />
  );
};

