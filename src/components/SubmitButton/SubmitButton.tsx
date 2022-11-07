import React from "react";
import { Loading } from "../Loading/Loading";
import "./SubmitButton.scss";

interface SubmitButtonProps {
  loading: boolean;
}

export function SubmitButton({ loading }: SubmitButtonProps) {
  return (
    <button className="SubmitButton" type="submit" disabled={loading}>
      {loading ? <Loading /> : "Submit"}
    </button>
  );
}
