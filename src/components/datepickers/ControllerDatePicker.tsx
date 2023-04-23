/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Control, Controller, FieldErrors } from "react-hook-form";
import clsxm from "../../lib/clsxm";

interface ControllerDatePickerProps
  extends Omit<ReactDatePickerProps, "selected" | "onChange"> {
  control: Control<any>;
  name: string;
  rules?: { [key: string]: any };
  placeholder?: string;
  className?: string;
  errors?: FieldErrors;
  disabled?: boolean;
  label?: string;
}

const ControllerDatePicker = ({
  control,
  name,
  rules,
  placeholder,
  dateFormat = "yyyy-MM-dd",
  isClearable = true,
  className,
  disabled,
  label,
}: ControllerDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange } }) => (
        <div className={clsxm("flex flex-col text-xs mt-2", className)}>
          {label && (
            <div className="flex justify-between py-2 font-bold leading-normal">
              <label className="leading-relaxed">{label}</label>
            </div>
          )}
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => {
              setSelectedDate(date);
              onChange(date);
            }}
            disabled={disabled}
            dateFormat={dateFormat}
            isClearable={isClearable}
            placeholderText={placeholder}
            className={clsxm(
              "w-full px-2",
              "relative indent-[2px]",
              "h-[40px]",
              "text-base",
              `border`,
              `hover:cursor-pointer`
            )}
          />
        </div>
      )}
    />
  );
};

export default ControllerDatePicker;
