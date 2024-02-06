import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MainFooter } from "./MainFooter";

describe("MainFooter", () => {
  it("renders footer with correct content", () => {
    const { getByText } = render(<MainFooter />);

    const footerElement = getByText("Powered by");
    expect(footerElement).toBeInTheDocument();

    const linkElement = getByText("@carlosxjm");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/carlosxjm/"
    );
    expect(linkElement).toHaveAttribute("target", "__blank");
  });
});
