import { useMemo } from "react";
import { useCustomerContext } from "providers/CustomerProvider";
import Select from "react-select";
import "styles/components/common/Form/SelectDateRange.css";

export default function SelectDateRange({ selectId = "select-date-range" }) {
  const { state, actions } = useCustomerContext();

  const options = useMemo(() => {
    return [
      {
        value: 1,
        label: "1 Month",
      },
      {
        value: 3,
        label: "3 Months",
      },
      {
        value: 6,
        label: "6 Months",
      },
      {
        value: 0,
        label: "All Months",
      },
    ];
  }, []);

  const onCustomersDateRangeChange = (customersDateRange) => {
    actions.setCustomersByDateRange(customersDateRange);
  };

  return (
    <label>
      Date Range:
      <Select
        id={selectId}
        options={options}
        value={state.customersDateRange}
        onChange={onCustomersDateRangeChange}
      />
    </label>
  );
}
