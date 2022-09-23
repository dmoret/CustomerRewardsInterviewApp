import React from "react";
import { within, render, queryByAttribute, fireEvent } from "@testing-library/react";
import SelectDateRange from "./SelectDateRange";

const getById = queryByAttribute.bind(null, "id");

describe("Component :: SelectDateRange", () => {
  const { container } = render(<SelectDateRange />);
  const select = getById(container, "select-date-range");
  test("Check length of options", () => {
    expect(within(select).getAllByRole("option").length).toBe(4);
  });

  test("Check default option 3 months", () => {
    expect(within(select).getByRole("option", { name: "3 Months" }).value).toBe("3");
  });

  test("Check all months option", () => {
    fireEvent.change(select, {
      target: { value: "0" },
    });
    expect(within(select).getByRole("option", { name: "All Months" }).value).toBe("0");
  });

  test("Check 1 month option", () => {
    fireEvent.change(select, {
      target: { value: "1" },
    });
    expect(within(select).getByRole("option", { name: "1 Month" }).value).toBe("1");
  });

  test("Check 6 months option", () => {
    fireEvent.change(select, {
      target: { value: "6" },
    });
    expect(within(select).getByRole("option", { name: "6 Months" }).value).toBe("6");
  });
});
