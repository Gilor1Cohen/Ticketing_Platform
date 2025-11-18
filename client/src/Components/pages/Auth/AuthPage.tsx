import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import FormInput from "../../UI/FormInput/FormInput";
import BtnOne from "../../UI/Btns/BtnOne/BtnOne";
import type {
  AuthFormType,
  AuthPageProps,
  AuthRes,
} from "../../../Types/Auth.types";
import "./AuthPage.style.css";
import axios from "axios";

function AuthPage({ setAuth }: AuthPageProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState(
    location.pathname === "/signup" ? "Sign Up" : "Log In"
  );

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<AuthFormType>({ mode: "onTouched" });

  useEffect(() => {
    setTitle(location.pathname === "/signup" ? "Sign Up" : "Log In");
    reset();
  }, [location.pathname]);

  async function onFormSubmit(data: AuthFormType): Promise<void> {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post<AuthRes>(
        `http://localhost:3001/${title === "Sign Up" ? "signup" : "login"}`,
        data,
        { withCredentials: true }
      );

      reset();

      if (res.status === 200) {
        setLoading(false);
        setAuth({ AuthState: true, UserId: res.data.UserId });
        navigate("/");
      }
    } catch (error: any) {
      setLoading(false);
      if (error && error.response) {
        setError(error.response.data.message);
      }
    }
  }

  return (
    <section id="AuthPage-Section">
      <h1 id="AuthPage-Title">{title}</h1>
      <form id="AuthPage-Form" onSubmit={handleSubmit(onFormSubmit)}>
        {title === "Sign Up" && (
          <FormInput
            type="text"
            placeholder="User Name"
            register={register}
            name="UserName"
            options={{
              required: "UserName is required",
              minLength: { value: 4, message: "At least 4 characters" },
            }}
            error={errors.UserName?.message}
          />
        )}
        <FormInput
          type="email"
          placeholder="Email"
          register={register}
          name="Email"
          options={{ required: "Email is required" }}
          error={errors.Email?.message}
        />
        <FormInput
          type="password"
          placeholder="Password"
          register={register}
          name="Password"
          options={{
            required: "Password is required",
            minLength: { value: 8, message: "At least 8 characters" },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d).+$/,
              message: "Use a number and a capital letter",
            },
          }}
          error={errors.Password?.message}
        />

        <BtnOne Text={title} Type="submit" Disabled={!isValid || loading} />

        {title === "Sign Up" ? (
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        ) : (
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        )}

        {error && <p className="AuthPage-Error">{error}</p>}
      </form>
    </section>
  );
}

export default AuthPage;
