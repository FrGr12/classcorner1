
import { toast } from "sonner";

type ErrorOptions = {
  title?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  description?: string;
  position?: "top-center" | "top-right" | "bottom-center" | "bottom-right";
  variant?: "default" | "destructive";
};

/**
 * Standardized error handling function for consistent UI error feedback
 */
export const handleError = (error: unknown, options?: ErrorOptions) => {
  console.error(error);
  
  // Extract error message
  let errorMessage = "An unexpected error occurred";
  
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else if (error && typeof error === "object" && "message" in error) {
    errorMessage = String((error as any).message);
  }

  // Display toast notification
  toast.error(options?.title || "Error", {
    description: options?.description || errorMessage,
    duration: options?.duration || 5000,
    action: options?.action,
    position: options?.position || "top-center",
  });

  return errorMessage;
};

/**
 * Wrap an async function with standardized error handling
 */
export const withErrorHandling = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options?: ErrorOptions
): ((...args: Parameters<T>) => Promise<ReturnType<T> | undefined>) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error, options);
      return undefined;
    }
  };
};

/**
 * Create a custom error with additional context
 */
export class AppError extends Error {
  constructor(message: string, public context?: Record<string, any>) {
    super(message);
    this.name = "AppError";
  }
}
