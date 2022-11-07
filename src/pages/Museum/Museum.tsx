import React from "react";
import "./Museum.scss";

export function Museum() {
  return (
    <div className="Museum-box">
      <img
        alt="photo-of-museum"
        className="Museum-box__image"
        src="https://i.imgur.com/9fQubdU.jpeg"
      />
      <h1 className="Museum-box__headline">About The Met</h1>
      <p className="Museum-box__text">
        The Met presents over 5,000 years of art from around the world for
        everyone to experience and enjoy.
      </p>
      <br />
      <br />
      <h3 className="Museum-box__headline">About the Museum</h3>
      <p className="Museum-box__text">
        The Metropolitan Museum of Art presents over 5,000 years of art from
        around the world for everyone to experience and enjoy. The Museum lives
        in two iconic sites in New York City—
        <a
          className="Museum-box__link"
          href="https://www.metmuseum.org/visit/plan-your-visit/met-fifth-avenue"
          target="_blank"
        >
          The Met Fifth Avenue
        </a>{" "}
        and{" "}
        <a
          className="Museum-box__link"
          href="https://www.metmuseum.org/visit/plan-your-visit/met-cloisters"
          target="_blank"
        >
          The Met Cloisters
        </a>
        . Millions of people also take part in The Met experience online. Since
        its founding in 1870, The Met has always aspired to be more than a
        treasury of rare and beautiful objects. Every day, art comes alive in
        the Museum's galleries and through its exhibitions and events, revealing
        new ideas and unexpected connections across time and across cultures.
      </p>
      <br />
      <br />
      <h3 className="Museum-box__headline">Mission Statement</h3>
      <p className="Museum-box__text">
        The Metropolitan Museum of Art collects, studies, conserves, and
        presents significant works of art across time and cultures in order to
        connect all people to creativity, knowledge, ideas, and one another.
      </p>
    </div>
  );
}
