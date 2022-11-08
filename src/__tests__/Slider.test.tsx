import React from "react";
import { render } from "@testing-library/react";
import { Slider } from "components/Slider/Slider";

it("should render Slider correctly when data is defined properly", () => {
  const item = {
    GalleryNumber: "string",
    artistBeginDate: "string",
    artistDisplayName: "string",
    artistEndDate: "string",
    department: "string",
    dimensions: "string",
    isHighlight: true,
    isPublicDomain: true,
    medium: "string",
    objectEndDate: 1,
    objectID: 1,
    objectURL: "string",
    primaryImage: "string",
    primaryImageSmall: "string",
    title: "string",
  };
  const data = Array.from({ length: 2881 }, (_el) => item);

  const { container } = render(<Slider data={data} />);

  expect(container).toContainElement(
    container.querySelector("[class='Slider']")
  );
  expect(container).toContainElement(
    container.querySelector("[class='Slider__card']")
  );
  expect(container).toContainElement(
    container.querySelector("[class='Slider__artwork']")
  );
});
