/**
 * SelectDateRange Tests
 * @version 0.1
 * @author Daniel Moret
 * */

import React from "react";
import { within, render, queryByAttribute } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectDateRange from "./SelectDateRange";

//const getById = queryByAttribute.bind(null, "id");
const setup = () => {
  const user = userEvent.setup();
  const utils = render(<SelectDateRange />);
  const selectDateRange = utils.container.querySelector("#select-date-range");

  return {
    user,
    selectDateRange,
    ...utils,
  };
};

describe("Component :: SelectDateRange", () => {
  test("Check length of options", () => {
    const { selectDateRange } = setup();
    expect(within(selectDateRange).getAllByRole("option").length).toBe(4);
  });

  test("Check default option 3 months", () => {
    const { selectDateRange } = setup();
    expect(within(selectDateRange).getByRole("option", { name: "3 Months" }).value).toBe("3");
  });

  test("Check all months option", () => {
    const { user, selectDateRange } = setup();
    user.selectOptions(selectDateRange, "0");
    expect(within(selectDateRange).getByRole("option", { name: "All Months" }).value).toBe("0");
  });

  test("Check 1 month option", () => {
    const { user, selectDateRange } = setup();
    user.selectOptions(selectDateRange, "1");
    expect(within(selectDateRange).getByRole("option", { name: "1 Month" }).value).toBe("1");
  });

  test("Check 6 months option", () => {
    const { user, selectDateRange } = setup();
    user.selectOptions(selectDateRange, "6");
    expect(within(selectDateRange).getByRole("option", { name: "6 Months" }).value).toBe("6");
  });
});
