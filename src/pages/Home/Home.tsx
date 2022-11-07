import React, { useEffect, useState } from "react";
import { Loading } from "components/Loading/Loading";
import { useClickListener } from "hooks/useClickListener";
import { Flipped, Flipper } from "react-flip-toolkit";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Item } from "store/api-slice";
import { randomizer } from "utils/randomizer";
import "./Home.scss";

export function Home() {
  const apiData = useSelector((state: RootState) => state.data);
  const [itemSlice, setItemSlice] = useState<Item[] | null>(null);
  const [animation, setAnimation] = useState<number[]>([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  ]);

  // слушатель событий для навигации по клику на страницу с объектом
  const [ulRef, _str] = useClickListener();

  // анимация - создает слайс объектов и запускает анимацию
  const shuffleList = () => {
    if (apiData) {
      const numberSlice = randomizer([Math.floor(Math.random() * 2881)], 2881);
      setAnimation((prev) => prev.sort(() => Math.random() - 0.5));

      numberSlice.forEach((num) => {
        setItemSlice((prev) => {
          if (prev && prev.length < 20) {
            return [...prev, apiData[num]];
          } else {
            return [apiData[num]];
          }
        });
      });
    }
  };

  // первая анимация при маунте компонента
  useEffect(() => {
    shuffleList();
  }, [apiData]);

  // последующие анимации с заданным интервалом
  useEffect(() => {
    const shuffleInterval = setInterval(shuffleList, 6000);
    return () => clearInterval(shuffleInterval);
  }, [apiData]);

  return (
    <>
      <Flipper
        className="Home-container"
        flipKey={animation.join("")}
        spring="veryGentle"
        staggerConfig={{
          default: {
            reverse: false,
            speed: 0.9,
          },
          namedStagger: { speed: 1, reverse: false },
        }}
      >
        <ul id="flipList" ref={ulRef} className="Home-container__grid">
          {apiData ? (
            animation.map((num) => (
              <Flipped key={num} flipId={num} spring="noWobble">
                <li
                  className={
                    num === 0 ? "Home-container__logo" : "Home-container__tile"
                  }
                >
                  {itemSlice && (
                    <div className="Home-container__box">
                      <img
                        key-id={itemSlice[num].objectID}
                        src={
                          num === 0
                            ? require("icons/met-logo.png")
                            : itemSlice[num].primaryImageSmall
                        }
                        alt={num === 0 ? "met-logo" : "artwork"}
                        className={
                          num === 0
                            ? "Home-container__logo Home-container__logo--image"
                            : "Home-container__artwork"
                        }
                      />
                    </div>
                  )}
                </li>
              </Flipped>
            ))
          ) : (
            <>
              <div></div>
              <div></div>
              <Loading />
            </>
          )}
        </ul>
      </Flipper>
    </>
  );
}
