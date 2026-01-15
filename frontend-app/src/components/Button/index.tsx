import { FC, ReactNode, useMemo } from "react";
import "./button.scss";

export type ButtonVariant =
  | "primary"
  | "success"
  | "default"
  | "danger"
  | "info"
  | "warning"
  | "transparent"
  | "default-bordered"
  | "success-bordered"
  | "link";


interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
  variant?: ButtonVariant;

}

export const Button: FC<ButtonProps> = ({
  variant =  "default",
  children,
  type = "button",
  onClick,
  disabled,
  size,
  className,
}) => {
   const buttonClassName = useMemo<string>(() => {
      switch (variant) {
        case "primary":
          return "primary-button";
        case "success":
          return "success-button";
        case "danger":
          return "danger-button";
        case "warning":
          return "warning-button";
        case "info":
          return "info-button";
        case "success-bordered":
          return "success-bordered-button";
        case "transparent":
          return "transparent-button";
        case "default-bordered":
          return "default-bordered-button";
        case "link":
          return "link";
        default:
          return "default-button";
      }
    }, [variant]);
  return (
    <button
      className={`button ${buttonClassName} ${size} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
