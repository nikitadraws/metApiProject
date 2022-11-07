import React, { useEffect, useMemo, useState } from "react";
import { Item } from "store/api-slice";
import { randomizer } from "utils/randomizer";
import arrow from "icons/arrow1.png";
import "./Slider.scss";

export const Slider = React.memo(function Slider({ data }: { data: Item[] }) {
  const [active, setActive] = useState(2);

  const sliceNumbers = useMemo(
    () => randomizer([Math.floor(Math.random() * 2881)], 2881),
    []
  );

  useEffect(() => {
    const shuffleInterval = setInterval(
      () =>
        setActive((num) => {
          return num < 17 ? num + 1 : 2;
        }),
      5000
    );

    return () => clearInterval(shuffleInterval);
  });

  const sliderItems = sliceNumbers.map((num) => (
    <div className="Slider__card">
      <img
        key-id={data[num].objectID}
        src={data[num].primaryImageSmall}
        alt="artwork"
        className="Slider__artwork"
      />
    </div>
  ));

  return (
    <div className="Slider">
      {active > 0 && (
        <button
          className="Slider__button Slider__button--left"
          onClick={() => setActive((i) => i - 1)}
        >
          <img src={arrow} className={"Slider__arrow-left"} />
        </button>
      )}
      {sliderItems.map((child: JSX.Element, i: number) => (
        <div
          key={i}
          className="Slider__card-container"
          style={
            {
              "--active": i === active ? 1 : 0,
              "--offset": (active - i) / 3,
              "--direction": Math.sign(active - i),
              "--abs-offset": Math.abs(active - i) / 3,
              pointerEvents: active === i ? "auto" : "none",
              opacity: Math.abs(active - i) >= 3 ? "0" : "1",
              display: Math.abs(active - i) > 3 ? "none" : "block",
            } as React.CSSProperties
          }
        >
          {child}
        </div>
      ))}
      {active < sliceNumbers.length - 1 && (
        <button
          className="Slider__button Slider__button--right"
          onClick={() => setActive((i) => i + 1)}
        >
          <img src={arrow} className={"Slider__arrow-right"} />
        </button>
      )}
    </div>
  );
});
