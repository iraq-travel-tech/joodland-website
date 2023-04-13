import React, { useEffect, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";

type PasswordInputProps = {
  value: string;
  setValue?: any;
  placeholder?: string;
  required?: boolean;
};

export default function PasswordInput(props: PasswordInputProps) {
  const [Focused, setFocused] = useState(false);
  const [Error, setError] = useState<false | string>(false);

  useEffect(() => {
    if (props.value) {
      setFocused(true);
    } else if (props.value === "" && !Focused) {
      setFocused(false);
    }
  }, [props.value]);

  const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    props.setValue(inputValue);
    setFocused(true);

    if (props.required && !inputValue) {
      setError(`${props.placeholder} is required`);
    } else {
      setError(false);
    }
  };

  const BlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!props.value) {
      setFocused(false);
    }

    if (props.required && !props.value) {
      setError(`${props.placeholder} is required`);
    }
  };

  return (
    <div className="relative">
      <input
        value={props.value}
        onChange={ChangeHandler}
        onFocus={() => setFocused(true)}
        onBlur={BlurHandler}
        data-focused={Focused}
        name={props.placeholder}
        type="password" // Set type to "password" to hide input value
        className="rounded-lg 
        py-2 px-4 border border-zinc-300 bg-white placeholder:text-zinc-400 
        
        transition-all
        focus:!outline-blue-600
        "
      />

      <label
        data-focused={Focused}
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
        {props.placeholder} {props.required && Focused && "*"}
      </label>

      <p
        className={`absolute  text-xs left-0 text-red-600 capitalize flex gap-1 items-center
          bottom-1
          opacity-0
          transition-all
          ${Error && "!-bottom-5 opacity-100"}
        `}
      >
        <RiErrorWarningFill size={14} />
        {Error}
      </p>
    </div>
  );
}
