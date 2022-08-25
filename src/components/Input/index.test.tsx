import { render } from "@testing-library/react";
import Input from ".";

describe("<Input />", () => {
  test("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(<Input value="test" min={0} max={0} disabled onChange={() => {}} />);
    expect(spy).not.toHaveBeenCalled();
  });
});
