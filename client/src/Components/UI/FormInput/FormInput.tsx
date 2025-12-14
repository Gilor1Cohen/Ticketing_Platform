import { useState } from "react";
import type { FormInputProps } from "../../../Types/UI.types";
import "./FormInput.Style.css";

function FormInput({
  formType,
  type,
  placeholder,
  register,
  errors,
  options,
  name,
}: FormInputProps) {
  const [isView, setIsView] = useState(false);

  function renderInput() {
    if (formType === "Auth") {
      return (
        <input
          className="FormInput-Input"
          type={
            type === "password" && !isView
              ? "password"
              : type == "password"
              ? "text"
              : type
          }
          placeholder={placeholder}
          {...register(name, options)}
        />
      );
    }

    return (
      <input
        className="FormInput-Input"
        type={
          type === "password" && !isView
            ? "password"
            : type == "password"
            ? "text"
            : type
        }
        placeholder={placeholder}
        {...register(name, options)}
      />
    );
  }

  return (
    <div className="FormInput-Div">
      {type !== "password" && renderInput()}

      {type === "password" && (
        <div className="PasswordInput-Div">
          {renderInput()}
          <span
            className="PasswordInput-Toggle"
            onClick={() => setIsView((prev) => !prev)}
          >
            {isView ? "🙈" : "👁️"}
          </span>
        </div>
      )}

      {errors && <p className="FormInput-Error">{errors}</p>}
    </div>
  );
}

export default FormInput;
