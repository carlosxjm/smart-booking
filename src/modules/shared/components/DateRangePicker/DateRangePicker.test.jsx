import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import DatePicker from "react-datepicker";
import { DateRangePicker } from "./DateRangePicker";
import { formatDateToSave } from "../../utils/date/formatDateToSave";
import { getNextIntervalStartDate } from "../../utils/date/getNextIntervalStartDate";

vi.mock("react-datepicker", () => ({
  default: vi.fn(({ id, placeholderText }) => (
    <input id={id} placeholder={placeholderText} />
  )),
}));

vi.mock("../../utils/date/getNextIntervalStartDate", () => ({
  getNextIntervalStartDate: vi.fn(),
}));

describe("DateRangePicker", () => {
  const mockOnChange = vi.fn();
  const mockValue = ["2024-02-10", "2024-02-12"];
  const mockExcludeDateIntervals = [];
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders properly", () => {
    const { getByPlaceholderText } = render(
      <DateRangePicker
        id="dateRangePicker"
        name="dateRangePicker"
        value={mockValue}
        onChange={mockOnChange}
        excludeDateIntervals={mockExcludeDateIntervals}
      />
    );

    expect(getByPlaceholderText("Select the period")).toBeInTheDocument();
    expect(DatePicker).toHaveBeenCalledWith(
      {
        autoComplete: "off",
        selectsRange: true,
        excludeDateIntervals: [],
        id: "dateRangePicker",
        name: "dateRangePicker",
        onBlur: expect.any(Function),
        onChange: expect.any(Function),
        placeholderText: "Select the period",
        maxDate: null,
        minDate: formatDateToSave(new Date()),
        startDate: "2024-02-10",
        endDate: "2024-02-12",
        value: ["2024-02-10", "2024-02-12"],
      },
      {}
    );
  });

  it("sets today as minDate when start date is empty", () => {
    render(
      <DateRangePicker
        id="dateRangePicker"
        name="dateRangePicker"
        value=""
        onChange={mockOnChange}
        excludeDateIntervals={mockExcludeDateIntervals}
      />
    );

    expect(DatePicker).toHaveBeenCalledWith(
      expect.objectContaining({
        minDate: formatDateToSave(new Date()),
      }),
      {}
    );
  });

  it("sets start date as minDate when start date is defined and end date isn't", () => {
    const startDateMock = "2023-02-01";
    render(
      <DateRangePicker
        id="dateRangePicker"
        name="dateRangePicker"
        value={[startDateMock, null]}
        onChange={mockOnChange}
        excludeDateIntervals={mockExcludeDateIntervals}
      />
    );

    expect(DatePicker).toHaveBeenCalledWith(
      expect.objectContaining({
        minDate: startDateMock,
      }),
      {}
    );
  });

  it("sets maxDate with next interval's start date when start date is defined and end date isn't", () => {
    const nextIntervalStartDate = "2030-01-01";
    getNextIntervalStartDate.mockImplementation(() => nextIntervalStartDate);

    render(
      <DateRangePicker
        id="dateRangePicker"
        name="dateRangePicker"
        value={["2023-03-04", null]}
        onChange={mockOnChange}
        excludeDateIntervals={mockExcludeDateIntervals}
      />
    );

    expect(DatePicker).toHaveBeenCalledWith(
      expect.objectContaining({
        maxDate: nextIntervalStartDate,
      }),
      {}
    );
  });

  it("doesn't set maxDate when start date is not defined", () => {
    render(
      <DateRangePicker
        id="dateRangePicker"
        name="dateRangePicker"
        value={[null, null]}
        onChange={mockOnChange}
        excludeDateIntervals={mockExcludeDateIntervals}
      />
    );

    expect(DatePicker).toHaveBeenCalledWith(
      expect.objectContaining({
        maxDate: null,
      }),
      {}
    );
  });
});
