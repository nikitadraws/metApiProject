import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContext } from "contexts/AuthContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { act, getByText } from "@testing-library/react";
import { Authbar } from "components/Navbar/Authbar/Authbar";
import { User } from "firebase/auth";

let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("should render loading state while user is undefined", () => {
  const currentUser = undefined;

  const logout: any = undefined;
  const signup: any = undefined;
  const login: any = undefined;

  act(() => {
    ReactDOM.createRoot(container).render(
      <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
        <MemoryRouter initialEntries={["/test"]}>
          <Routes>
            <Route path="/" element={<div className="test-child"></div>} />
            <Route path="/test" element={<Authbar />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  });
  expect(container).toContainElement(
    container.querySelector("[class='Loading']")
  );
});

it("should render logout button if user is defined; shouldn't render links to /registration and /login", () => {
  const currentUser = {} as User;

  const logout: any = undefined;
  const signup: any = undefined;
  const login: any = undefined;

  act(() => {
    ReactDOM.createRoot(container).render(
      <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
        <MemoryRouter initialEntries={["/test"]}>
          <Routes>
            <Route path="/" element={<div className="test-child"></div>} />
            <Route path="/test" element={<Authbar />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  });

  expect(container).toContainElement(
    container.querySelector("[class='LogoutBtn']")
  );
  expect(container).not.toContainElement(
    container.querySelector("[class='Authbar__Navlink']")
  );
});

it("should render login and registration links; shouldn't render logout button; click login should navigate to login page; click registration should navigate to registration page; ", () => {
  const currentUser = null;

  const logout: any = undefined;
  const signup: any = undefined;
  const login: any = undefined;

  act(() => {
    ReactDOM.createRoot(container).render(
      <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
        <MemoryRouter initialEntries={["/test"]}>
          <Routes>
            <Route
              path="/login"
              element={
                <div className="test-child-login">
                  <Authbar />
                </div>
              }
            />
            <Route
              path="/registration"
              element={<div className="test-child-registration"></div>}
            />

            <Route path="/test" element={<Authbar />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  });

  expect(container).toContainElement(getByText(container, "Login"));
  expect(container).toContainElement(getByText(container, "Registration"));
  expect(container).not.toContainElement(
    container.querySelector("[class='LogoutBtn']")
  );

  const loginLink = getByText(container, "Login");
  act(() => {
    loginLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(container).toContainElement(
    container.querySelector("[class='test-child-login']")
  );

  const registrationLink = getByText(container, "Registration");

  act(() => {
    registrationLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(container).toContainElement(
    container.querySelector("[class='test-child-registration']")
  );
});
