import React from "react";
import { render } from "@testing-library/react";
import { SubmitButton } from "components/SubmitButton/SubmitButton";

it("should render button with 'submit' text if clickable (enabled)", () => {
  const { getByText } = render(<SubmitButton loading={false} />);

  expect(getByText("Submit")).toBeDefined();
  expect(getByText("Submit")).toBeEnabled();
});

it("should render button with spinner if unclickable (disabled)", () => {
  const { container } = render(<SubmitButton loading={true} />);

  expect(container).toContainElement(
    container.querySelector("[class='Loading']")
  );
  expect(container.firstChild).toBeDisabled();
});
