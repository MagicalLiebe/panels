import { render } from "@testing-library/react";
import Admin from "src/pages/admin";

describe("About page", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<Admin />, {});
    expect(asFragment()).toMatchSnapshot();
  });
});
