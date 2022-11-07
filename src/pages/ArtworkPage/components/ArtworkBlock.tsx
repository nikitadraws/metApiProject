import React, { useState } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import { Item } from "store/api-slice";
import { FavoriteButton } from "./FavoriteButton";
import "./ArtworkBlock.scss";

interface ArtworkBlockProps {
  artworkData: Item;
}

export function ArtworkBlock({ artworkData }: ArtworkBlockProps) {
  const [fullScreen, setFullScreen] = useState(false);

  return (
    <Flipper flipKey={fullScreen}>
      <FavoriteButton objectID={artworkData.objectID} />
      <div className="ArtworkBlock">
        <Flipped flipId="square">
          <div
            onClick={() => setFullScreen((prevState) => !prevState)}
            className={
              fullScreen
                ? "ArtworkBlock__image-container--fullscreen"
                : "ArtworkBlock__image-container"
            }
          >
            <img
              className="ArtworkBlock__image"
              src={artworkData.primaryImage}
            />
          </div>
        </Flipped>
        <div
          className={
            fullScreen
              ? "ArtworkBlock__description ArtworkBlock__description--fullscreen"
              : "ArtworkBlock__description"
          }
        >
          {artworkData.isHighlight && (
            <div className="ArtworkBlock__filter-checkbox">
              <label
                className="ArtworkBlock__filter-label"
                htmlFor="isHighlight"
              >
                {" "}
                <div className="ArtworkBlock__filter-icon-box">
                  {artworkData.isPublicDomain && (
                    <img
                      className="ArtworkBlock__filter-icon"
                      src={require("icons/check.png")}
                    />
                  )}
                </div>
                <div>Highlight</div>
              </label>
            </div>
          )}
          {artworkData.isPublicDomain && (
            <div className="ArtworkBlock__filter-checkbox">
              <label
                className="ArtworkBlock__filter-label"
                htmlFor="isPublicDomain"
              >
                {" "}
                <div className="ArtworkBlock__filter-icon-box">
                  {" "}
                  {artworkData.isPublicDomain && (
                    <img
                      className="ArtworkBlock__filter-icon"
                      src={require("icons/check.png")}
                    />
                  )}
                </div>
                <div>Public Domain</div>
              </label>
            </div>
          )}
          <p>
            <span className="ArtworkBlock__title">Title:</span>
            {artworkData.title}
          </p>
          <p>
            <span className="ArtworkBlock__title">Artist:</span>
            {artworkData.artistDisplayName
              ? artworkData.artistDisplayName
              : "unknown"}{" "}
            ({artworkData.artistBeginDate ? artworkData.artistBeginDate : "??"}-
            {artworkData.artistEndDate ? artworkData.artistEndDate : "??"})
          </p>
          <p>
            <span className="ArtworkBlock__title">Dimensions:</span>
            {artworkData.dimensions ? artworkData.dimensions : "unknown"}
          </p>
          <p>
            <span className="ArtworkBlock__title">Medium:</span>
            {artworkData.medium}
          </p>
          <p>
            <span className="ArtworkBlock__title">Year:</span>
            {artworkData.objectEndDate}
          </p>
          <p>
            <span className="ArtworkBlock__title">Department:</span>
            {artworkData.department}
          </p>
          <p>
            <span className="ArtworkBlock__title">ID:</span>{" "}
            {artworkData.objectID}
          </p>
          <p>
            <span className="ArtworkBlock__title">Gallery number:</span>{" "}
            {artworkData.GalleryNumber}
          </p>
          <p>
            <span className="ArtworkBlock__title">URL:</span>
            <a
              href={artworkData.objectURL}
              target="_blanc"
              className="ArtworkBlock__link"
            >
              {artworkData.objectURL}
            </a>
          </p>
        </div>
      </div>
    </Flipper>
  );
}
