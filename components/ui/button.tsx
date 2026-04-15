"use client";

import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { motion } from "motion/react";
import { cn } from "@/utils/cn";

type ButtonProps = PropsWithChildren<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> & {
    variant?: "primary" | "secondary" | "ghost" | "danger" | "glass" | "accent";
  }
>;

const styles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
  ghost: "hover:bg-muted hover:text-foreground",
  danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  glass: "glass-dark text-white hover:bg-white/10",
  accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
};

export const Button = ({
  children,
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    type={type}
    className={cn(
      "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
      styles[variant],
      className
    )}
    {...props}
  >
    {children}
  </motion.button>
);
