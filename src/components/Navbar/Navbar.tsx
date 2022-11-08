import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { Loading } from "components/Loading/Loading";
import { shallowEqual, useSelector } from "react-redux";
import { About } from "pages/About/About";
import { Slider } from "components/Slider/Slider";
import { RootState } from "store";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { Authbar } from "components/Navbar/Authbar/Authbar";
import "./Navbar.scss";

export function Navbar() {
  const ref = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const [mobileDevise, setMobileDevice] = useState(false);
  const apiData = useSelector((state: RootState) => state.data, shallowEqual);
  const [burger, setBurger] = useState(true);
  const navigate = useNavigate();

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width < 768) {
      setMobileDevice(true);
      setBurger(false);
    } else {
      setMobileDevice(false);
      setBurger(true);
    }
  }, [width]);

  if (currentUser === undefined || !apiData) {
    return (
      <div className="Navbar__loading-box">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {mobileDevise && (
        <div className="Navbar__header">
          <img
            onClick={() => {
              setBurger(false);
              navigate("/", { replace: false });
            }}
            className="Navbar__icon-logo"
            src={require("icons/met-logo.png")}
          />

          {burger ? (
            <img
              onClick={() => {
                setBurger((state) => !state);
              }}
              className="Navbar__header-icon--fixed"
              src={require("icons/cross.png")}
            />
          ) : (
            <img
              onClick={() => {
                setBurger((state) => !state);
              }}
              className="Navbar__header-icon"
              src={require("icons/burger.png")}
            />
          )}
        </div>
      )}
      <Slider data={apiData} />
      <nav
        onClick={() => {
          if (mobileDevise) {
            setBurger(false);
          }
        }}
        className={mobileDevise ? "Navbar-mobile" : "Navbar-desktop"}
        ref={ref}
        style={
          {
            "--screen-width": { width },
          } as React.CSSProperties
        }
      >
        {burger && (
          <ul
            className={
              mobileDevise ? "Navbar-mobile__ul" : "Navbar-desktop__ul"
            }
            onClick={() => {
              if (mobileDevise) {
                setBurger(false);
              }
            }}
          >
            <Authbar />
            <li>
              <NavLink className="Navbar__navlink" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="Navbar__navlink" to="/collection">
                Collection
              </NavLink>
            </li>
            <li>
              <NavLink
                className="Navbar__navlink"
                to={currentUser ? "/mycollection" : "/login"}
              >
                My collection
              </NavLink>
            </li>
            {mobileDevise && (
              <>
                <li>
                  <NavLink className="Navbar__navlink" to="/about/museum">
                    Museum
                  </NavLink>
                </li>
                <li>
                  <NavLink className="Navbar__navlink" to="/about/project">
                    Project
                  </NavLink>
                </li>
                <li>
                  <NavLink className="Navbar__navlink" to="/about/contacts">
                    Contacts
                  </NavLink>
                </li>
              </>
            )}
            <li onMouseLeave={() => setDropdownToggle(false)}>
              <div
                className="Navbar__dropdown"
                onMouseEnter={() => {
                  setDropdownToggle(true);
                }}
              >
                {!mobileDevise && (
                  <>
                    <NavLink className="Navbar__navlink" to="/about">
                      About
                    </NavLink>
                    {dropdownToggle && <About className={"dropdown"} />}
                  </>
                )}
              </div>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
}
