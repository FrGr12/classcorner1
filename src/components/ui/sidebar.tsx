import * as React from "react";
import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, children, ...props }: SidebarProps) {
  return (
    <div
      className={cn("w-64 border-r border-border bg-background", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({
  className,
  children,
  ...props
}: SidebarContentProps) {
  return (
    <div className={cn("flex flex-col h-full", className)} {...props}>
      {children}
    </div>
  );
}

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroup({
  className,
  children,
  ...props
}: SidebarGroupProps) {
  return (
    <div className={cn("px-2 py-2", className)} {...props}>
      {children}
    </div>
  );
}

interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroupLabel({
  className,
  children,
  ...props
}: SidebarGroupLabelProps) {
  return (
    <div
      className={cn("px-4 py-2 text-sm font-medium text-muted-foreground", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface SidebarGroupContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroupContent({
  className,
  children,
  ...props
}: SidebarGroupContentProps) {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {children}
    </div>
  );
}

interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenu({
  className,
  children,
  ...props
}: SidebarMenuProps) {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {children}
    </div>
  );
}

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenuItem({
  className,
  children,
  ...props
}: SidebarMenuItemProps) {
  return (
    <div className={cn("px-2", className)} {...props}>
      {children}
    </div>
  );
}

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function SidebarMenuButton({
  className,
  asChild = false,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? React.Fragment : "button";
  return (
    <Comp
      className={cn(
        "flex w-full items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    />
  );
}

interface SidebarProviderProps {
  children: React.ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  return <>{children}</>;
}