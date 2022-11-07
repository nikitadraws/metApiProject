import React from "react";
import { render } from "@testing-library/react";
import { ErrorBoundary } from "components/ErrorBoundary/ErrorBoundary";

it("should render error boundary component when there is an error", () => {
  const Child = () => {
    throw new Error();
  };

  const { getByText } = render(
    <ErrorBoundary>
      <Child />
    </ErrorBoundary>
  );
  const errorMessage = getByText("Sorry.. there was an error");
  expect(errorMessage).toBeDefined();
});
