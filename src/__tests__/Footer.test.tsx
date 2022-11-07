import React from "react";
import { render } from "@testing-library/react";
import Footer from "components/Footer/Footer";

it("should render spinner with right styles", () => {
  const { container } = render(<Footer />);
  expect(container.firstChild).toHaveClass("Footer");
});
