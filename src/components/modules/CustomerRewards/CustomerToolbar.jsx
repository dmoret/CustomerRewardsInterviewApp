/**
 * Customer Rewards Table
 * displays customer record
 * @version 0.1
 * @author Daniel Moret
 */

import React from "react";
import { useCustomerContext } from "providers/CustomerProvider";

export default function CustomerToolbar() {
  const { state, actions } = useCustomerContext();

  const onInputChange = async (customerId) => {
    actions.setCustomerById(customerId);
  };

  const onHandleFocus = (event) => event.target.select();

  return (
    <div className="customer-toolbar">
      <form>
        <label>
          Customer ID#:
          <input
            type="text"
            value={state.customerId}
            onInput={(event) => onInputChange(event.target.value)}
            onFocus={onHandleFocus}
          />
        </label>
      </form>
    </div>
  );
}
