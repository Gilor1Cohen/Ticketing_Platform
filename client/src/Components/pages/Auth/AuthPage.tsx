import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import FormInput from "../../UI/FormInput/FormInput";
import BtnOne from "../../UI/Btns/BtnOne/BtnOne";
import type { AuthFormType, AuthRes } from "../../../Types/Auth.types";
import "./AuthPage.style.css";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";

function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState(
    location.pathname === "/signup" ? "Sign Up" : "Log In"
  );

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const auth = useContext(AuthContext);

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
        auth ? auth.login(res.data.UserId) : null;
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
            formType="Auth"
            type="text"
            placeholder="User Name"
            register={register}
            name="UserName"
            options={{
              required: "UserName is required",
              minLength: { value: 4, message: "At least 4 characters" },
            }}
            errors={errors.UserName?.message}
          />
        )}
        <FormInput
          formType="Auth"
          type="email"
          placeholder="Email"
          register={register}
          name="Email"
          options={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          errors={errors.Email?.message}
        />
        <FormInput
          formType="Auth"
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
          errors={errors.Password?.message}
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
