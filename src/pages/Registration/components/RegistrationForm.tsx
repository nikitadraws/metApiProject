import React, { useState } from "react";
import { SubmitButton } from "components/SubmitButton/SubmitButton";
import { useFormAnimation } from "hooks/useFormAnimation";
import { useAuth } from "contexts/AuthContext";
import { auth } from "FirebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import "./RegistrationForm.scss";

export function RegistrationForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPasword] = useState<string>("");
  const [passwordConfirm, setPaswordConfirm] = useState<string>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const context = useAuth();
  const navigate = useNavigate();

  // анимация маунта формы
  const formRef = useFormAnimation();

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      console.log(error);
      return setError("Passwords don't match");
    }
    try {
      setError("");
      setLoading(true);
      if (!context) {
        return setError("Something went wrong, please try again");
      }
      await context.signup(auth, email, password);
      navigate("/", { replace: true });
    } catch {
      setError("Failed to create new account, please try again");
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      <form ref={formRef} className="RegistrationForm" onSubmit={handleSubmit}>
        <p className="RegistrationForm__text">Email</p>
        <input
          className="RegistrationForm__input"
          autoComplete="new-password"
          type="email"
          required
          onChange={(e) => {
            if (error) {
              if (error) {
                setError("");
              }
            }
            setEmail(e.target.value);
          }}
        />
        <p className="RegistrationForm__text">Password</p>
        <input
          className="RegistrationForm__input"
          autoComplete="new-password"
          type="password"
          required
          onChange={(e) => {
            if (error) {
              if (error) {
                setError("");
              }
            }
            setPasword(e.target.value);
          }}
        />
        <p className="RegistrationForm__text">Сonfirm password</p>
        <input
          className="RegistrationForm__input"
          autoComplete="new-password"
          type="password"
          required
          onChange={(e) => {
            if (error) {
              setError("");
            }
            setPaswordConfirm(e.target.value);
          }}
        />
        {error && <p className="RegistrationForm__text--error">{error}</p>}
        <SubmitButton loading={loading} />
        <Link className="RegistrationForm__link" to="/login">
          Already have account?
        </Link>
      </form>
    </>
  );
}
