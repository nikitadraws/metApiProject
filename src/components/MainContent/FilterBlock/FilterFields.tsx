import React, { useEffect, useState } from "react";
import { URLSearchParamsInit } from "react-router-dom";
import "./FilterFields.scss";

interface FilterFieldsProps {
  setSearchParams: (
    nextInit: URLSearchParamsInit,
    navigateOptions?:
      | {
          replace?: boolean | undefined;
          state?: any;
        }
      | undefined
  ) => void;
  modifiedQuery: (arg: object) => {};
  slider: string | null;
  isHighlight: string | null;
  isPublicDomain: string | null;
}

export default function FilterFields({
  setSearchParams,
  modifiedQuery,
  slider,
  isHighlight,
  isPublicDomain,
}: FilterFieldsProps) {
  const [sliderValue, setSliderValue] = useState<[string, string]>([
    "-2575",
    "1931",
  ]);
  const [toggleFilter, setToggleFilter] = useState(false);
  const [trigger, setTrigger] = useState<string | boolean>("");

  useEffect(() => {
    if (!slider) {
      setSliderValue(["-2575", "1931"]);
    } else if (slider) {
      setToggleFilter(true);
      const year = slider.split(" ");
      if (
        parseInt(year[0], 10) < -2575 ||
        parseInt(year[1], 10) > 1931 ||
        parseInt(year[0], 10) > parseInt(year[1], 10)
      ) {
        return;
      }
      setSliderValue([year[0], year[1]]);
    }
  }, [slider]);

  const sliderFn = () => {
    if (trigger === "") {
      return;
    }
    setSearchParams(
      modifiedQuery({
        slider: `${sliderValue[0]} ${sliderValue[1]}`,
        currentPage: 1,
      }),
      {
        replace: true,
      }
    );
  };

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      sliderFn();
    }, 800);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [trigger]);

  useEffect(() => {
    if ((slider && slider !== "-2575 1931") || isHighlight || isPublicDomain) {
      setToggleFilter(true);
    }
  }, []);

  const handleReset = () => {
    setSliderValue(["-2575", "1931"]);
    setSearchParams({});
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.type === "checkbox") {
      setSearchParams(
        modifiedQuery({ [e.target.name]: e.target.checked, currentPage: 1 }),
        {
          replace: true,
        }
      );
    } else if (e.target.id === "objectEndDateMin") {
      if (parseInt(e.target.value, 10) > parseInt(sliderValue[1], 10)) {
        setSliderValue((prev) => [prev[1], prev[1]]);
      } else {
        setSliderValue((prev) => [e.target.value, prev[1]]);
      }
      setTrigger((state) => !state);
    } else if (e.target.id === "objectEndDateMax") {
      if (parseInt(e.target.value, 10) < parseInt(sliderValue[0], 10)) {
        setSliderValue((prev) => [prev[0], prev[0]]);
      } else {
        setSliderValue((prev) => [prev[0], e.target.value]);
      }
      setTrigger((state) => !state);
    }
  };

  const left =
    ((parseInt(sliderValue[0], 10) - -2575) / (1931 - -2575)) * 150 - 25;

  const right =
    -((parseInt(sliderValue[1], 10) - -2575) / (1931 - -2575)) * 150 + 120;

  return (
    <>
      <p
        onClick={() => setToggleFilter((state) => !state)}
        className="FilterFields__title"
      >
        Filter
      </p>
      {toggleFilter && (
        <>
          <div className="FilterFields__filter-checkbox">
            <label className="FilterFields__filter-label" htmlFor="isHighlight">
              {" "}
              <div className="FilterFields__filter-icon-box">
                {isHighlight === "true" && (
                  <img
                    className="FilterFields__filter-icon"
                    src={require("icons/check.png")}
                  />
                )}
              </div>
              <div>Highlight</div>
            </label>
            <input
              id="isHighlight"
              name="isHighlight"
              type="checkbox"
              onChange={handleFilter}
              checked={isHighlight === "true" ? true : false}
            />
          </div>

          <div className="FilterFields__filter-checkbox">
            <label
              className="FilterFields__filter-label"
              htmlFor="isPublicDomain"
            >
              {" "}
              <div className="FilterFields__filter-icon-box">
                {" "}
                {isPublicDomain === "true" && (
                  <img
                    className="FilterFields__filter-icon"
                    src={require("icons/check.png")}
                  />
                )}
              </div>
              <div>Public Domain</div>
            </label>
            <input
              id="isPublicDomain"
              name="isPublicDomain"
              type="checkbox"
              onChange={handleFilter}
              checked={isPublicDomain === "true" ? true : false}
            />
          </div>
          <p className="FilterFields__text">Timeline of art</p>

          <div className="FilterFields__slider">
            <div className="FilterFields__slider-left">
              <input
                className="FilterFields__slider-input"
                id="objectEndDateMin"
                name="objectEndDateMin"
                type="range"
                min="-2575"
                max="1931"
                onChange={handleFilter}
                value={sliderValue[0]}
              />
              <div
                className="FilterFields__year-left"
                style={
                  {
                    "--left": left,
                  } as React.CSSProperties
                }
              >
                {sliderValue[0]}
              </div>
            </div>

            <div className="FilterFields__slider-right">
              <div
                className="FilterFields__year-right"
                style={
                  {
                    "--right": right,
                  } as React.CSSProperties
                }
              >
                {sliderValue[1]}
              </div>
              <input
                className="FilterFields__slider-input"
                id="objectEndDateMax"
                name="objectEndDateMax"
                type="range"
                min="-2575"
                max="1931"
                onChange={handleFilter}
                value={sliderValue[1]}
              />
            </div>

            <button className="FilterFields__button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </>
      )}
    </>
  );
}
