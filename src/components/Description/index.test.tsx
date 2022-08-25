import { render, screen } from "@testing-library/react";
import Description from ".";

describe("<Description />", () => {
  test("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(<Description title="title" details="details" />);

    expect(spy).not.toHaveBeenCalled();
  });
  test("Description with title", () => {
    const title = "title";
    const details = "details";
    render(<Description title={title} details={details} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
