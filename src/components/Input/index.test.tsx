import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from ".";

describe("<Input />", () => {
  test("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(<Input value={5} min={0} max={10} disabled onChange={() => {}} />);
    expect(spy).not.toHaveBeenCalled();
  });

  test("value < min  or value > max", () => {
    const onChange = jest.fn();
    render(
      <Input value={1000} min={0} max={10} onChange={onChange} testId="test" />
    );

    userEvent.paste(screen.getByTestId("input-test"), "500");
    userEvent.paste(screen.getByTestId("input-test"), "-500");

    expect(onChange).not.toBeCalled();

    userEvent.paste(screen.getByTestId("input-test"), "8");
  });
});
