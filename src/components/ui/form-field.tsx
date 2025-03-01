
import React from "react";
import { Input, InputProps } from "@/components/ui/input";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface FormFieldBaseProps {
  id: string;
  label?: string;
  error?: FieldError;
  description?: string;
  required?: boolean;
  showValidation?: boolean;
  isValid?: boolean;
  className?: string;
}

interface InputFieldProps extends FormFieldBaseProps, Omit<InputProps, "id"> {}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  error,
  description,
  required = false,
  showValidation = true,
  isValid = false,
  className,
  ...props
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <Label 
            htmlFor={id} 
            className={cn(
              error ? "text-red-500" : ""
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        </div>
      )}
      <div className="relative">
        <Input
          id={id}
          aria-invalid={!!error}
          aria-describedby={description ? `${id}-description` : undefined}
          className={cn(
            error ? "border-red-500 pr-10" : "",
            isValid && showValidation ? "border-green-500 pr-10" : "",
            props.disabled ? "bg-neutral-100" : ""
          )}
          {...props}
        />
        {error && showValidation && (
          <AlertCircle className="h-4 w-4 text-red-500 absolute right-3 top-1/2 -translate-y-1/2" />
        )}
        {isValid && showValidation && !error && (
          <CheckCircle2 className="h-4 w-4 text-green-500 absolute right-3 top-1/2 -translate-y-1/2" />
        )}
      </div>
      {description && !error && (
        <p id={`${id}-description`} className="text-sm text-neutral-500">
          {description}
        </p>
      )}
      {error && (
        <p className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

interface TextareaFieldProps extends FormFieldBaseProps, Omit<TextareaProps, "id"> {}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  id,
  label,
  error,
  description,
  required = false,
  showValidation = true,
  isValid = false,
  className,
  ...props
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label 
          htmlFor={id} 
          className={cn(
            error ? "text-red-500" : ""
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <div className="relative">
        <Textarea
          id={id}
          aria-invalid={!!error}
          aria-describedby={description ? `${id}-description` : undefined}
          className={cn(
            error ? "border-red-500" : "",
            isValid && showValidation ? "border-green-500" : "",
            props.disabled ? "bg-neutral-100" : ""
          )}
          {...props}
        />
        {error && showValidation && (
          <div className="absolute top-3 right-3">
            <AlertCircle className="h-4 w-4 text-red-500" />
          </div>
        )}
        {isValid && showValidation && !error && (
          <div className="absolute top-3 right-3">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </div>
        )}
      </div>
      {description && !error && (
        <p id={`${id}-description`} className="text-sm text-neutral-500">
          {description}
        </p>
      )}
      {error && (
        <p className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};
