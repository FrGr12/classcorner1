
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// Define consistent button styles for the application
const appButtonVariants = cva(
  "transition-all font-medium focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2",
  {
    variants: {
      intent: {
        primary: "bg-accent-purple hover:bg-accent-purple/90 text-white",
        secondary: "bg-accent-pink text-accent-purple hover:bg-accent-coral",
        outline: "border border-accent-purple text-accent-purple bg-transparent hover:bg-accent-purple/10",
        ghost: "text-accent-purple hover:bg-accent-purple/10",
        destructive: "bg-red-500 text-white hover:bg-red-600",
      },
      fullWidth: {
        true: "w-full",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        lg: "rounded-lg",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      intent: "primary",
      fullWidth: false,
      rounded: "default",
    },
  }
);

export interface AppButtonProps 
  extends ButtonProps,
    VariantProps<typeof appButtonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const AppButton: React.FC<AppButtonProps> = ({
  className,
  intent,
  fullWidth,
  rounded,
  variant,
  children,
  loading = false,
  disabled,
  icon,
  iconPosition = "left",
  ...props
}) => {
  return (
    <Button
      className={cn(
        appButtonVariants({ intent, fullWidth, rounded }),
        className
      )}
      variant={variant}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!loading && icon && iconPosition === "left" && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {!loading && icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span>
      )}
    </Button>
  );
};

export { AppButton, appButtonVariants };
