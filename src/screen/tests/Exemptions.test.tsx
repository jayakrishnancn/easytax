import { renderWithStore } from "../../util/testUtil";
import ExemptionsTab from "../ExemptionsTab";

describe("<ExemptionsTab />", () => {
  test("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    renderWithStore(<ExemptionsTab />);
    expect(spy).not.toHaveBeenCalled();
  });
});
