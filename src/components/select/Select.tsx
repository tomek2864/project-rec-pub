import * as React from "react";
import clsxm from "../../lib/clsxm";

enum SelectVariant {
  "text",
}

type SelectProps = {
  id: string;
  label?: string;
  list: Array<{ id: string; name: string }>;
  variant?: keyof typeof SelectVariant;
} & React.ComponentPropsWithRef<"select">;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, label = "", className, disabled, list = [], ...rest }, ref) => {
    return (
      <div className={clsxm("flex flex-col text-xs mt-2", className)}>
        {label && (
          <div className="flex justify-between py-2 font-bold leading-normal">
            <label htmlFor={id} className="leading-relaxed">
              {label}
            </label>
          </div>
        )}
        <select
          ref={ref}
          id={id}
          disabled={disabled}
          className={clsxm(
            "relative indent-[2px]",
            "h-[40px] pl-1.5",
            "text-base",
            `border`,
            `hover:cursor-pointer`,
            disabled && "text-black disabled:bg-[#999]"
          )}
          {...rest}
        >
          {list.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
