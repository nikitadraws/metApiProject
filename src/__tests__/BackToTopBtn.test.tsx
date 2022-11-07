import React from "react";
import { BackToTopBtn } from "components/BackToTopBtn/BackToTopBtn";
import { render } from "@testing-library/react";

// здесь еще нужен тест на эвент при скролле;
// так как jest не рендерит ничего в браузере, а только симулирует структуру DOM'а;
// то проще протестировать это e2e тестом;

it("should not show back-to-top button on first page render", () => {
  const { container } = render(<BackToTopBtn />);

  expect(container).not.toContainElement(
    container.querySelector("[class='BackToTopBtn']")
  );
});
