import React, { forwardRef } from "react";
import { LabelInfo } from "../label-info";
import "./text-box.scss";

interface TextBoxProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  containerClassName?: string;
  type?: string;
}

export const TextBox = forwardRef<HTMLInputElement, TextBoxProps>(
  (
    {
      value,
      onChange,
      placeholder,
      label,
      required,
      containerClassName,
      type = "text",
    },
    ref
  ) => {
    const isFileInput = type === "file";

    return (
      <div className={`text-box-wrapper ${containerClassName || ""}`}>
        {label && <LabelInfo text={label} />}
        <input
          ref={ref}
          type={type}
          className="text-box"
          placeholder={placeholder}
          required={required}
          {...(!isFileInput && {
            value: value ?? "",
            onChange,
          })}
        />
      </div>
    );
  }
);

TextBox.displayName = "TextBox";
