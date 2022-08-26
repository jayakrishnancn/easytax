import { render, screen } from "@testing-library/react";
import App from "./App";
import { renderWithStore } from "./util/testUtil";

test("renders learn react link", () => {
  renderWithStore(<App />);
  const linkElement = screen.getByText(/Simple Tax/);
  expect(linkElement).toBeInTheDocument();
});
