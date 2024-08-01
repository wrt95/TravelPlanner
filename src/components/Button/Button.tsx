import { ReactNode, ReactElement, ButtonHTMLAttributes } from "react";
import classes from "./button.module.css";
import cn from "classnames";

type ButtonVariant = "default" | "danger";
type IconPlacement = "left" | "right";

type ButtonProps = {
  variant?: ButtonVariant;
  icon: ReactNode;
  iconPlacement?: IconPlacement;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = "default",
  icon,
  iconPlacement = "left",
  className,
  ...rest
}: ButtonProps): ReactElement => {
  const IconComponent = (
    <span aria-hidden className={classes.iconWrapper}>
      {icon}
    </span>
  );
  return (
    <button
      className={cn(classes.button, classes[variant], className)}
      {...rest}
    >
      {icon && iconPlacement === "left" && IconComponent}
      {children}
      {icon && iconPlacement === "right" && IconComponent}
    </button>
  );
};
