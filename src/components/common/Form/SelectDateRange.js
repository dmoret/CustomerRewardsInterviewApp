import { useMemo } from "react";
import { useCustomerContext } from "providers/CustomerProvider";
import { SelectDateRangeOptions } from "./SelectDateRangeOptions";
import "styles/components/common/Form/SelectDateRange.css";

export default function SelectDateRange({ selectId = "select-date-range" }) {
  const { state, actions } = useCustomerContext();

  const options = useMemo(() => {
    return SelectDateRangeOptions;
  }, []);

  const handleOnChange = (event) => {
    const value = parseInt(event.target.value);
    actions.setCustomersByDateRange(value);
  };

  return (
    <>
      <label htmlFor={selectId}>Date Range:</label>
      <select
        id={selectId}
        name={selectId}
        value={state.customersDateRange.value}
        onChange={handleOnChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/*
      <Select
        id={selectId}
        name={selectId}
        options={options}
        defaultValue={defaultValue}
        onChange={onChange}
      />
  */}
    </>
  );
}
