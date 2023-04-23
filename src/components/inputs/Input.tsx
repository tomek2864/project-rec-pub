import * as React from "react";

import clsxm from "../../lib/clsxm";

enum InputVariant {
  "text",
}

type InputProps = {
  type?: string;
  placeholder?: string;
  label?: string;
  errorMsg?: string;
  externalUrl?: { url: string; label: string };
  isLoading?: boolean;
  isError?: boolean;
  variant?: keyof typeof InputVariant;
} & React.ComponentPropsWithRef<"input">;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      placeholder = "",
      label = "",
      errorMsg = "",
      isError = false,
      className,
      disabled: inputDisabled,
      variant = "text",
      ...rest
    },
    ref
  ) => {
    const disabled = inputDisabled;

    return (
      <div className={clsxm("flex flex-col text-xs font-bold mt-2", className)}>
        {label && (
          <div className="flex justify-between py-2 leading-normal">
            <label className="leading-relaxed">{label}</label>
          </div>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={clsxm("inline-flex items-center px-3 py-1 font-normal", [
            variant === "text" && [
              "h-[40px]",
              "text-base",
              `border`,
              "focus:bg-sky-100",
            ],
            (errorMsg || isError) && "border-red-300 bg-red-50",
          ])}
          {...rest}
        />
        {errorMsg && (
          <div className="flex">
            <label className="font-normal leading-loose text-red-500">
              {errorMsg}
            </label>
          </div>
        )}
      </div>
    );
  }
);

export default Input;
