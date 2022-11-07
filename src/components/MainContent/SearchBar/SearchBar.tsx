import React, { useEffect, useRef, useState } from "react";
import { URLSearchParamsInit, useNavigate } from "react-router-dom";
import { Item } from "store/api-slice";
import "./SearchBar.scss";

interface SearchBarProps {
  setSearchParams: (
    nextInit: URLSearchParamsInit,
    navigateOptions?:
      | {
          replace?: boolean | undefined;
          state?: any;
        }
      | undefined
  ) => void;
  data: Item[];
}

export const SearchBar = React.memo(function SearchBar({
  setSearchParams,
  data,
}: SearchBarProps) {
  const [searchInput, setSearchInput] = useState("");
  const [artists, setArtists] = useState<Item[]>([]);
  const [artworks, setArtworks] = useState<Item[]>([]);
  const [toggleSearch, setSearchToggle] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // функция для работы с клавиатурой в выпадающем меню поиска
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const element = e.target as HTMLElement;
    const ul = document.getElementsByClassName("SearchBar__list")[0];

    if (e.code === "Escape") {
      element.blur();
      setSearchToggle(false);
    }

    if (
      e.code === "ArrowDown" &&
      element.className === "SearchBar__input" &&
      ul
    ) {
      const li = ul.getElementsByTagName("li")[0];
      li.focus();
    }
    if (e.code === "ArrowUp" && ul) {
      const input = document.getElementsByClassName(
        "SearchBar__input"
      )[0] as HTMLElement;
      input.focus();
    }
    if (e.code === "Enter") {
      e.preventDefault();
      element.click();
    }

    if (e.code === "ArrowUp" && element.previousElementSibling) {
      e.preventDefault();
      (element.previousElementSibling as HTMLElement).focus();
    }
    if (e.code === "ArrowDown" && element.nextElementSibling) {
      e.preventDefault();
      (element.nextElementSibling as HTMLElement).focus();
    }
  };

  useEffect(() => {
    const handleClickOutside = (ev: MouseEvent) => {
      const clickedElement = ev.target as HTMLElement;
      if (!containerRef.current?.contains(clickedElement)) {
        setSearchToggle(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // функция самого поиска; вызывается с задержкой 0.1сек после последнего ввода символа
  const searchHandle = () => {
    setArtists([]);
    setArtworks([]);

    const searchRegExp = `(^|\\W)${searchInput.trim()}`;
    const regExp = new RegExp(searchRegExp, "gi");

    data.filter((el) => {
      return (
        (regExp.test(el.artistDisplayName.toLowerCase()) &&
          setArtists((prev) => {
            if (
              prev.length > 4 ||
              prev.some(
                (element) => element.artistDisplayName === el.artistDisplayName
              )
            ) {
              return [...prev];
            } else return prev.length ? [...prev, el] : [el];
          })) ||
        (regExp.test(el.title.toLowerCase()) &&
          setArtworks((prev) => {
            if (prev.length > 4) {
              return [...prev];
            } else return prev.length ? [...prev, el] : [el];
          }))
      );
    });
  };

  // debounce функции поиска
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      searchHandle();
    }, 100);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [searchInput]);

  return (
    <div className="SearchBar" ref={containerRef}>
      {searchInput && (
        <img
          onClick={() => setSearchInput("")}
          className="SearchBar__cross-icon"
          src={require("icons/cross.png")}
        />
      )}
      <input
        className="SearchBar__input"
        type="text"
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        onFocus={() => setSearchToggle(true)}
        value={searchInput}
        onKeyDown={handleKeyDown}
      />
      <img
        onClick={() => {
          const input = document.getElementsByClassName(
            "SearchBar__input"
          )[0] as HTMLElement;
          input.focus();
        }}
        className="SearchBar__magnifier-icon"
        src={require("icons/magnifier.png")}
      />
      {searchInput && toggleSearch && (
        <div className="SearchBar__list-container">
          <ul className="SearchBar__list">
            {!artists.length && !artworks.length && (
              <li className="SearchBar__list-item">No results</li>
            )}
            {!!artists.length &&
              artists.map((el, i) => (
                <li
                  tabIndex={i + 1}
                  className="SearchBar__list-item"
                  key={el.objectID}
                  onClick={() => {
                    setSearchParams({
                      artist: el.artistDisplayName.toLocaleLowerCase(),
                    });
                    setSearchToggle(false);
                    setSearchInput("");
                  }}
                  onKeyDown={handleKeyDown}
                >
                  <img
                    className="SearchBar__artwork-icon"
                    src={require("icons/artist.png")}
                  />
                  {el.artistDisplayName}
                </li>
              ))}
            {!!artworks.length &&
              artworks.map((el, i) => (
                <li
                  className="SearchBar__list-item"
                  tabIndex={i + 6}
                  key={el.objectID}
                  onClick={() => {
                    navigate(`/${el.objectID.toString()}`);
                    setSearchToggle(false);
                    setSearchInput("");
                  }}
                  onKeyDown={handleKeyDown}
                >
                  <img
                    className="SearchBar__artwork-icon"
                    src={require("icons/artwork.png")}
                  />
                  {el.title}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
});
