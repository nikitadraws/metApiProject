import React from "react";
import { Loading } from "components/Loading/Loading";
import { render } from "@testing-library/react";

it("should render spinner with right styles", () => {
  const { container } = render(<Loading />);
  expect(container.firstChild).toHaveClass("Loading");
});
