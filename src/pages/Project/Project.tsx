import React, { useState } from "react";
import "./Project.scss";

export function Project() {
  const [language, setLanguage] = useState(true);

  return (
    <>
      <p className="Project__language" onClick={() => setLanguage(true)}>
        ru
      </p>
      <p className="Project__language" onClick={() => setLanguage(false)}>
        en
      </p>
      <div className="Project">
        {language && (
          <>
            <h3>О проекте:</h3>
            <p className="Project__description">
              Проект сделан на основе api Метрополитен-музея (Нью-Йорк). С
              сервера приходит ~3500 объектов. Запрос делается через RTK Query,
              после чего дата во время сессии хранится в store. Для авторизации
              пользователя используется Firebase и реакт контекст. Все кастомное
              кроме анимации.
            </p>
            <p className="Project__stroke">
              <span className="Project__span">Язык:</span> Typescript
            </p>
            <p className="Project__stroke">
              <span className="Project__span">Библиотеки:</span> React (все на
              функциональных компонентах), Redux, Redux Toolkit (RTK Query),
              React Redux
            </p>
            <p className="Project__stroke">
              <span className="Project__span">Верстка:</span> SCSS (Sass), BEM,
              адаптивная (target - 320, 768, 1024), кроссбраузерная (Safari,
              Chrome, Edge, Firefox, Opera, Yandex)
            </p>
            <p className="Project__stroke">
              <span className="Project__span">Рутинг:</span> React Router
            </p>
            <p className="Project__stroke">
              <span className="Project__span">Авторизация:</span> Firebase
            </p>
            <p className="Project__stroke">
              <span className="Project__span">Тесты:</span> Jest
            </p>
            <p className="Project__stroke">
              <span className="Project__span">Доп. библиотеки:</span>{" "}
              react-flip-toolkit (анимация), query-string, debounce из lodash
            </p>
          </>
        )}
        {!language && (
          <>
            <h3>About project:</h3>
            <p className="Project__description">
              This project is based on official Metropolitan Museum (NYC) api.
              There are about 3500 objects came from server. Data is fetching
              using RTK Query and then spread across app by redux store.
              Authorization by Firebase and react context api. Everything is
              custom except animation.
            </p>
            <p className="Project__stroke">
              <span className="Project__span">Language:</span> Typescript
            </p>
            <p className="Project__stroke">
              <span className="Project__span">Libraries:</span> React (hooks),
              Redux, Redux Toolkit (RTK Query), React Redux
            </p>
            <p className="Project__stroke">
              <span className="Project__span">Styles:</span> SCSS (Sass), BEM,
              adaptive (target - 320, 768, 1024), crossbrowser (Safari, Chrome,
              Edge, Firefox, Opera, Yandex)
            </p>
            <p className="Project__stroke">
              <span className="Project__span">Routing:</span> React Router
            </p>
            <p className="Project__stroke">
              <span className="Project__span">Authorization:</span> Firebase
            </p>
            <p className="Project__stroke">
              <span className="Project__span">Tests:</span> Jest
            </p>
            <p className="Project__stroke">
              <span className="Project__span">Third-party libraries:</span>{" "}
              react-flip-toolkit (animation), query-string, debounce from lodash
            </p>
          </>
        )}
      </div>
    </>
  );
}
