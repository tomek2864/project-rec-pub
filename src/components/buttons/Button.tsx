import * as React from "react";
import { ImSpinner2 } from "react-icons/im";
import clsxm from "../../lib/clsxm";

enum ButtonVariant {
  "primary",
}

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: keyof typeof ButtonVariant;
} & React.ComponentPropsWithRef<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      type = "button",
      variant = "primary",
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={clsxm(
          "min-h-[32px]",
          "bg-slate-800",
          "py-0.5 inline-flex items-center px-4 font-normal",
          "shadow-sm",
          "transition-all duration-75",
          //*=========== Variants ===========
          [
            variant === "primary" && [
              "text-sm font-bold",
              "rounded-lg",
              "text-white",
              "hover:bg-slate-700",
              "active:bg-slate-600",
              "disabled:bg-slate-300",
            ],
          ],
          //*======== Variants ===========
          "disabled:cursor-not-allowed",
          isLoading &&
            "relative text-transparent transition-none hover:text-transparent disabled:cursor-wait",
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              {
                "text-white": ["primary", "dark"].includes(variant),
                "text-black": ["light"].includes(variant),
                "text-primary-500": ["outline", "ghost"].includes(variant),
              }
            )}
          >
            <ImSpinner2 className="animate-spin" />
          </div>
        )}
        {children}
      </button>
    );
  }
);

export default Button;
