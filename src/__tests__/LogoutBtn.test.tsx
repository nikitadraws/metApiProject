import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContext } from "contexts/AuthContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { LogoutBtn } from "components/Navbar/Authbar/LogoutBtn";
import { act } from "@testing-library/react";

let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("button should be enabled and navigate on promise resolve to '/' page after click", async () => {
  const logout: () => Promise<void> = async () => {
    await new Promise((resolve) => resolve(1));
  };

  const currentUser: any = undefined;
  const signup: any = undefined;
  const login: any = undefined;

  await act(async () => {
    ReactDOM.createRoot(container).render(
      <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
        <MemoryRouter initialEntries={["/test"]}>
          <Routes>
            <Route path="/" element={<div className="test-child"></div>} />
            <Route path="/test" element={<LogoutBtn />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  });

  const button = container.querySelector("[class='LogoutBtn']");

  expect(button).not.toBeDisabled();

  await act(async () => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(container).toContainElement(
    container.querySelector("[class='test-child']")
  );
});

it("button should be enabled and be disable on promise reject after click", async () => {
  const logout: () => Promise<void> = async () => {
    await new Promise((_resolve, reject) => reject("error"));
  };

  const currentUser: any = undefined;
  const signup: any = undefined;
  const login: any = undefined;

  await act(async () => {
    ReactDOM.createRoot(container).render(
      <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
        <MemoryRouter initialEntries={["/test"]}>
          <Routes>
            <Route path="/" element={<div className="test-child"></div>} />
            <Route path="/test" element={<LogoutBtn />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  });

  const button = container.querySelector("[class='LogoutBtn']");

  expect(button).not.toBeDisabled();

  await act(async () => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(button).toBeDisabled();

  expect(container).toContainElement(
    container.querySelector("[class='LogoutBtn']")
  );
});
