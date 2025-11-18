import { useState } from "react";
import type { FormInputProps } from "../../../Types/UI.types";
import "./FormInput.Style.css";

function FormInput({
  type,
  placeholder,
  register,
  name,
  options,
  error,
}: FormInputProps) {
  const [isView, setIsView] = useState<boolean>(false);

  return (
    <div className="FormInput-Div">
      {type !== "password" && (
        <input
          className="FormInput-Input"
          type={type}
          placeholder={placeholder}
          {...register(name, options)}
        />
      )}

      {type == "password" && (
        <div className="PasswordInput-Div">
          <input
            className="FormInput-Input"
            type={isView ? "text" : "password"}
            placeholder={placeholder}
            {...register(name, options)}
          />
          <span
            className="PasswordInput-Toggle"
            onClick={() => setIsView(!isView)}
          >
            {isView ? "🙈" : "👁️"}
          </span>
        </div>
      )}

      {error && <p className="FormInput-Error">{error}</p>}
    </div>
  );
}

export default FormInput;
