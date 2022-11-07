import React, { useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { auth } from "FirebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { useFormAnimation } from "hooks/useFormAnimation";
import { SubmitButton } from "components/SubmitButton/SubmitButton";
import "./LoginForm.scss";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const userContext = useAuth();
  const navigate = useNavigate();

  // анимация маунта формы
  const formRef = useFormAnimation();

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    try {
      setLoading(true);
      if (!userContext) {
        setError("Something went wrong, please try again");
        setEmail("");
        setPasword("");
      }
      await userContext.login(auth, email, password);
      navigate(-1);
    } catch {
      setEmail("");
      setPasword("");
      setError("Failed to login, please try again");
    }
    setLoading(false);
  }

  return (
    <>
      <form ref={formRef} className="LoginForm" onSubmit={handleSubmit}>
        <p className="LoginForm__text">Email</p>{" "}
        <input
          className="LoginForm__input"
          type="email"
          required
          onChange={(e) => {
            if (error) {
              setError("");
            }
            setEmail(e.target.value);
          }}
          value={email}
        />
        <p className="LoginForm__text">Password</p>
        <input
          className="LoginForm__input"
          type="password"
          required
          onChange={(e) => {
            if (error) {
              setError("");
            }
            setPasword(e.target.value);
          }}
          value={password}
        />
        {error && <p className="LoginForm__text--error">{error}</p>}
        <SubmitButton loading={loading} />
        <Link className="LoginForm__link" to="/registration">
          Create new account
        </Link>
      </form>
    </>
  );
}
