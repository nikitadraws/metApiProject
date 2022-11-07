import React from "react";
import { useAuth } from "contexts/AuthContext";
import { Navigate } from "react-router";
import { Loading } from "./Loading/Loading";

interface PrivateRouteProps {
  children: JSX.Element;
  haveToBeLogged: boolean;
}

export function PrivateRoute({ children, haveToBeLogged }: PrivateRouteProps) {
  const { currentUser } = useAuth();

  if (currentUser === undefined) {
    return <Loading />;
  }

  if (haveToBeLogged) {
    return currentUser ? children : <Navigate to="/login" />;
  } else {
    return !currentUser ? children : <Navigate to="/" />;
  }
}
