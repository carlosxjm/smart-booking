import { describe, expect, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("renders modal when isOpen is true", () => {
    const onClose = vi.fn();
    const { getByRole } = render(
      <Modal title="Test Modal" isOpen={true} onClose={onClose}>
        <p>Modal Content</p>
      </Modal>
    );

    const modalElement = getByRole("dialog");
    expect(modalElement).toBeInTheDocument();
    expect(modalElement).toHaveAttribute("aria-modal", "true");

    const closeButton = getByRole("button", { name: "Close Modal" });
    expect(closeButton).toBeInTheDocument();
  });

  it("does not render modal when isOpen is false", () => {
    const onClose = vi.fn();
    const { queryByRole } = render(
      <Modal title="Test Modal" isOpen={false} onClose={onClose}>
        <p>Modal Content</p>
      </Modal>
    );

    const modalElement = queryByRole("dialog");
    expect(modalElement).toBeNull();
  });

  it("calls onClose when clicking on close button", () => {
    const onClose = vi.fn();
    const { getByRole } = render(
      <Modal title="Test Modal" isOpen={true} onClose={onClose}>
        <p>Modal Content</p>
      </Modal>
    );

    const closeButton = getByRole("button", { name: "Close Modal" });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it.todo("calls onClose when pressing Escape key");
});
