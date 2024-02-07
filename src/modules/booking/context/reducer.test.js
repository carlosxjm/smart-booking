import { describe, expect, it } from "vitest";
import { reducer } from "./reducer";
import { ADD_BOOKING, REMOVE_BOOKING, UPDATE_BOOKING } from "./actionTypes";

describe("Reducer", () => {
  window.crypto = {
    randomUUID: () => "mock-uuid",
  };

  const initialState = {
    bookings: [],
    editingBooking: null,
  };

  it("adds a booking", () => {
    const action = {
      type: ADD_BOOKING,
      payload: { id: "1", guestName: "John Doe" },
    };

    const state = reducer(initialState, action);

    expect(state.bookings).toHaveLength(1);
    expect(state.bookings[0]).toEqual(
      expect.objectContaining({ id: "1", guestName: "John Doe" })
    );
  });

  it("removes a booking", () => {
    const initialStateWithBooking = {
      bookings: [{ id: "1", guestName: "John Doe" }],
      editingBooking: null,
    };

    const action = {
      type: REMOVE_BOOKING,
      payload: "1",
    };

    const state = reducer(initialStateWithBooking, action);

    expect(state.bookings).toHaveLength(0);
  });

  it("updates a booking", () => {
    const initialStateWithBooking = {
      bookings: [{ id: "1", guestName: "John Doe" }],
      editingBooking: { id: "1", guestName: "John Doe" },
    };

    const action = {
      type: UPDATE_BOOKING,
      payload: { id: "1", guestName: "Jane Doe" },
    };

    const state = reducer(initialStateWithBooking, action);

    expect(state.bookings[0]).toEqual(
      expect.objectContaining({ id: "1", guestName: "Jane Doe" })
    );
  });

  it("returns initial state for unknown action type", () => {
    const unknownAction = {
      type: "UNKNOWN_ACTION",
      payload: { id: "1", guestName: "John Doe" },
    };

    const state = reducer(initialState, unknownAction);

    expect(state).toEqual(initialState);
  });
});
