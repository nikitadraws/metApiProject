import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import "./BackToTopBtn.scss";

export function BackToTopBtn() {
  const [backToTopBtn, setBackToTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (document.documentElement.scrollTop > 500 && !backToTopBtn) {
        setBackToTopBtn(true);
      } else if (document.documentElement.scrollTop < 500) {
        setBackToTopBtn(false);
      }
    };

    window.addEventListener("scroll", debounce(handleScroll, 50));
    return () =>
      window.removeEventListener("scroll", debounce(handleScroll, 50));
  }, []);

  return (
    <>
      {backToTopBtn && (
        <img
          onClick={() => window.scrollTo(0, 0)}
          className="BackToTopBtn"
          src={require("icons/arrow-small.png")}
        />
      )}
    </>
  );
}
