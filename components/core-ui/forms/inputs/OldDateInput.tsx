import React, { useEffect, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";

type OldDateInputProps = {
  value: string;
  setValue?: any;
  placeholder?: string;
  required?: boolean;
  name?: string;
};

export default function OldDateInput(props: OldDateInputProps) {
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState<false | string>(false);

  useEffect(() => {
    if (props.value) {
      setFocused(true);
    } else if (props.value === "" && !focused) {
      setFocused(false);
    }
  }, [props.value]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const inputElement = e.target;
    const cursorPosition = inputElement.selectionStart; // Get current cursor position
    let formattedValue = inputValue.replace(/\D/g, ""); // Remove all non-numeric characters

    // Add "-" separator between month, day, and year while typing
    if (formattedValue.length >= 2 && formattedValue.length < 5) {
      formattedValue =
        formattedValue.slice(0, 2) + "-" + formattedValue.slice(2);
    } else if (formattedValue.length >= 5) {
      formattedValue =
        formattedValue.slice(0, 2) +
        "-" +
        formattedValue.slice(2, 4) +
        "-" +
        formattedValue.slice(4);
    }

    // Limit the input to a maximum of 10 characters
    if (formattedValue.length > 10) {
      formattedValue = formattedValue.slice(0, 10);
    }

    props.setValue(formattedValue);

    setFocused(true);

    if (props.required && !inputValue) {
      setError(`${props.placeholder} is required`);
    } else {
      setError(false);
    }

    // Check if the entered date is valid
    const parts = formattedValue.split("-");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);

    if (day > 31 || month > 12) {
      setError("Please enter a valid date");
    } else {
      setError(false);
    }

    // Set cursor position back to the original position, unless at the beginning of "12-"
    const newCursorPosition =
      formattedValue.length === 3
        ? 2
        : // @ts-ignore
          cursorPosition + (formattedValue.length - inputValue.length);
    inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
  };

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!props.value) {
      setFocused(false);
    }

    // Re-add "-" separator between month, day, and year when the component loses focus
    if (props.value) {
      let formattedValue = props.value.replace(/\D/g, ""); // Remove all non-numeric characters
      if (formattedValue.length >= 2) {
        formattedValue =
          formattedValue.slice(0, 2) + "-" + formattedValue.slice(2);
      }
      if (formattedValue.length >= 5) {
        formattedValue =
          formattedValue.slice(0, 5) + "-" + formattedValue.slice(5);
      }
      props.setValue(formattedValue);
    }

    if (props.required && !props.value) {
      setError(`${props.placeholder} is required`);
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={!props.value && focused ? "DD-MM-YYYY" : ""}
        value={props.value}
        onChange={changeHandler}
        onFocus={() => setFocused(true)}
        onBlur={blurHandler}
        data-focused={focused}
        name={props.name}
        className="rounded-lg 
        py-2 px-4 border border-zinc-300 bg-white placeholder:text-zinc-400 
        
        transition-all
        focus:!outline-blue-600 w-full
        "
      />

      <label
        data-focused={focused}
        htmlFor={props.placeholder}
        className="
          pointer-events-none
          absolute  
          transition-all
          data-[focused=false]:top-2 
          data-[focused=false]:left-4
          data-[focused=false]:text-zinc-400
          px-1
          left-3
          -top-3
          text-sm
          bg-white
          text-blue-600
        "
      >
        {props.placeholder} {props.required && focused && "*"}
      </label>

      <p
        className={`absolute  text-xs left-0 text-red-600 capitalize flex gap-1 items-center
          bottom-1
          opacity-0
          transition-all
          ${error && "!-bottom-5 opacity-100"}
        `}
      >
        <RiErrorWarningFill size={14} />
        {error}
      </p>
    </div>
  );
}
