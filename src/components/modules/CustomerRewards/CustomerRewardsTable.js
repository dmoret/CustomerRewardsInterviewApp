/**
 * Customer Rewards Table
 * displays customer record
 * @version 0.1
 * @author Daniel Moret
 */

import React from "react";
import Customer from "./Customer";
import { useCustomerContext } from "providers/CustomerProvider";

export default function CustomerRewardsTable() {
  const { state } = useCustomerContext();
  return (
    <div>
      <table id="table-customer-rewards">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Total Spent</th>
            <th>Reward Points</th>
            <th>Date Created</th>
            <th>Date Updated</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.customerRewards.length &&
            state.customerRewards.map((customer) => (
              <Customer key={customer.id} customer={customer} />
            ))}
        </tbody>
      </table>
    </div>
  );
}
