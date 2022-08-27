import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../store";
export function renderWithStore(component: ReactNode) {
  return render(<Provider store={store}>{component}</Provider>);
}

export async function waitForStore(time = 5) {
  await new Promise((r) => setTimeout(r, 5));
}
