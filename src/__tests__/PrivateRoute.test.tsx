import React from "react";
import store from "store";
import { render } from "@testing-library/react";
import { PrivateRoute } from "components/PrivateRoute";
import { AuthContext } from "contexts/AuthContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { User } from "firebase/auth";
import { Login } from "pages/Login/Login";
import { Home } from "pages/Home/Home";
import { Provider } from "react-redux";

it("should render loading state while user is undefined", () => {
  const currentUser = undefined;

  const signup: any = undefined;
  const login: any = undefined;
  const logout: any = undefined;

  const { container } = render(
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      <PrivateRoute haveToBeLogged={true}>
        <div></div>
      </PrivateRoute>
    </AuthContext.Provider>
  );

  expect(container).toContainElement(
    container.querySelector("[class='Loading']")
  );
});

it("should render private pages when user is defined", () => {
  const currentUser = {} as User;

  const signup: any = undefined;
  const login: any = undefined;
  const logout: any = undefined;

  const { container } = render(
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute haveToBeLogged={true}>
                <div className="test-child"></div>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  expect(container.firstChild).toHaveClass("test-child");
});

it("should render login and signup pages when user is not defined", () => {
  const currentUser = null;

  const signup: any = undefined;
  const login: any = undefined;
  const logout: any = undefined;

  const { container } = render(
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute haveToBeLogged={false}>
                <div className="test-child"></div>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  expect(container.firstChild).toHaveClass("test-child");
});

it("should render (navigate to) login page when user is not defined, while trying to get private page", () => {
  const currentUser = null;

  const signup: any = undefined;
  const login: any = undefined;
  const logout: any = undefined;

  const { container } = render(
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      <MemoryRouter initialEntries={["/test"]}>
        <Routes>
          <Route
            path="/test"
            element={
              <PrivateRoute haveToBeLogged={true}>
                <div className="test-child"></div>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  expect(container).toContainElement(
    container.querySelector("[class='LoginForm']")
  );
});

it("should render (navigate to) home page when user is defined, while trying to get login or signup pages", () => {
  const currentUser = {} as User;

  const signup: any = undefined;
  const login: any = undefined;
  const logout: any = undefined;

  const { container } = render(
    <Provider store={store}>
      <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
        <MemoryRouter initialEntries={["/test"]}>
          <Routes>
            <Route
              path="/test"
              element={
                <PrivateRoute haveToBeLogged={false}>
                  <div className="test-child"></div>
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    </Provider>
  );

  expect(container).toContainElement(
    container.querySelector("[class='Home-container']")
  );
});
