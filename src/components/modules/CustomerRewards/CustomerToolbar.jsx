/**
 * Customer Rewards Table
 * displays customer record
 * @version 0.1
 * @author Daniel Moret
 */

import React from "react";
import { useCustomerContext } from "providers/CustomerProvider";
import SelectDateRange from "components/common/Form/SelectDateRange";
import "styles/components/modules/CustomerRewards/CustomerToolbar.css";

export default function CustomerToolbar() {
  const { state, actions } = useCustomerContext();

  const onInputCustomerIDChange = (customerId) => {
    actions.setCustomerById(customerId);
  };

  const onHandleFocus = (event) => event.target.select();

  return (
    <form id="customer-toolbar-form">
      <label>
        Customer ID#:
        <input
          name="customer-id"
          type="text"
          value={state.customerId}
          onInput={(event) => onInputCustomerIDChange(event.target.value)}
          onFocus={onHandleFocus}
        />
      </label>

      <SelectDateRange />
    </form>
  );
}
