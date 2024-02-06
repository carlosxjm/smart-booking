import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { PropertyCard } from "./PropertyCard";

describe("PropertyCard", () => {
  const mockProperty = {
    title: "Test Property",
    image: "test-image-url",
    location: "Test Location",
    sqft: 1000,
    description: "Test Description",
    price_per_month: 1500,
    bedrooms: 2,
    bathrooms: 2,
    showFullInformations: true,
  };

  it("renders property card with full information", () => {
    const { getByText, getByAltText } = render(
      <PropertyCard {...mockProperty} />
    );

    expect(getByText("Test Property")).toBeInTheDocument();
    expect(getByAltText("Test Property")).toBeInTheDocument();
    expect(getByText("Test Location")).toBeInTheDocument();
    expect(getByText("Test Description")).toBeInTheDocument();
    expect(getByText("1000 sqft")).toBeInTheDocument();
    expect(getByText("$1500/month")).toBeInTheDocument();
    expect(getByText("2 bedrooms")).toBeInTheDocument();
    expect(getByText("2 bathrooms")).toBeInTheDocument();
  });

  it("renders property card without full information", () => {
    const { getByText, queryByText } = render(
      <PropertyCard {...mockProperty} showFullInformations={false} />
    );

    expect(getByText("Test Property")).toBeInTheDocument();
    expect(queryByText("Test Description")).toBeNull();
    expect(queryByText("1000 sqft")).toBeNull();
    expect(queryByText("$1500/month")).toBeNull();
    expect(queryByText("2 bedrooms")).toBeNull();
    expect(queryByText("2 bathrooms")).toBeNull();
  });
});
