import React from "react";
import "./Contacts.scss";

export function Contacts() {
  return (
    <>
      <div className="Contacts-card">
        <img
          className="Contacts-card__img"
          src="https://www.metmuseum.org/-/media/images/visit/plan-your-visit/individual-locations/fifth-avenue/fifthave_1520x1520.jpg?as=1&mh=3040&mw=3040&sc_lang=en&hash=BFF78F8B47EA58D354A9FE842B717611"
        />
        <div className="Contacts-card__description">
          <h2 className="Contacts-card__title">The Met Fifth Avenue</h2>
          <h3 className="Contacts-card__headline">Hours</h3>
          <p className="Contacts-card__text">
            Sunday–Tuesday and Thursday: 10 am–5 pm
          </p>
          <p className="Contacts-card__text">Friday and Saturday: 10 am–9 pm</p>
          <p className="Contacts-card__text">Closed Wednesday </p>
          <p className="Contacts-card__text">
            Closed Thanksgiving Day, December 25, January 1, and the first
            Monday in May.
          </p>
          <h3 className="Contacts-card__headline">Address</h3>
          <a
            className="Contacts-card__link"
            href="https://goo.gl/maps/MtLxGMeG8c52"
            target="_blank"
          >
            1000 Fifth Avenue
          </a>
          <p className="Contacts-card__text"> at 82nd Street </p>
          <p className="Contacts-card__text">New York, NY 10028</p>
        </div>
      </div>

      <div className="Contacts-card">
        <img
          className="Contacts-card__img"
          src="https://www.metmuseum.org/-/media/images/visit/plan-your-visit/individual-locations/cloisters/cloisters-locations-met-museum-photos-brett-beyer-32-jpg-original-300dpi.jpg?as=1&mh=3040&mw=3040&sc_lang=en&hash=25D078D65C37EBFC9F7718E099A4C0DF"
        />
        <div className="Contacts-card__description">
          <h2 className="Contacts-card__title">The Met Cloisters</h2>
          <h3 className="Contacts-card__headline">Hours</h3>
          <p className="Contacts-card__text">Thursday–Tuesday: 10 am–5 pm</p>
          <p className="Contacts-card__text">Closed Wednesday </p>
          <h3 className="Contacts-card__headline">Address</h3>
          <a
            className="Contacts-card__link"
            href="https://goo.gl/maps/KhVXTpUgSBo"
            target="_blank"
          >
            99 Margaret Corbin Drive
          </a>
          <p className="Contacts-card__text">Fort Tryon Park</p>
          <p className="Contacts-card__text">New York, NY 10040</p>
        </div>
      </div>
    </>
  );
}
