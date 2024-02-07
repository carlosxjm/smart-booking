import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PropertySelectList } from "./PropertySelectList";
import { properties } from "../../data/properties-mock.json";

vi.mock("react-router-dom", () => ({
  Link: vi.fn(({ children, to }) => (
    <a data-testid="property-link" href={to}>
      {children}
    </a>
  )),
}));

describe("PropertySelectList", () => {
  it("renders a list of properties", () => {
    render(<PropertySelectList />);

    const links = screen.getAllByTestId("property-link");

    properties.forEach((property, index) => {
      expect(links[index].getAttribute("href")).toBe(`/create/${property.id}`);
      expect(screen.getByText(property.title)).toBeInTheDocument();
    });
    expect(links).toHaveLength(properties.length);
  });
});
