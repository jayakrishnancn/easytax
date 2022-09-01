import { fireEvent, render, screen } from "@testing-library/react";
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
  test("show and hide Info modal", () => {
    const title = "title";
    const details = "details";
    const info = "some info about title";
    render(<Description title={title} details={details} info={info} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.queryByText(info)).not.toBeInTheDocument();
    expect(screen.getByLabelText("more-info")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("more-info"));
    expect(screen.getByTestId("more-details-of-info")).toHaveTextContent(info);
    expect(screen.getByTestId("modal")).toHaveTextContent("Close");
    expect(screen.getByTestId("modal-close")).toHaveTextContent("Close");

    fireEvent.click(screen.getByTestId("modal-close"));
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    expect(screen.queryByTestId("modal-close")).not.toBeInTheDocument();
  });
});
