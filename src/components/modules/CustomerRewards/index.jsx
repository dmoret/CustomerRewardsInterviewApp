/**
 * Customer Rewards
 * calculates and displays customer rewards
 * @version 0.1
 * @author Daniel Moret
 */

import React from "react";
import { useCustomerContext } from "providers/CustomerProvider";
import CustomerRewardsTable from "components/modules/CustomerRewards/CustomerRewardsTable";
import LoadingPlaceholder from "components/common/LoadingPlaceholder";
import CustomerToolbar from "./CustomerToolbar";

export default function CustomerRewards() {
  const { state } = useCustomerContext();
  return (
    <div className="container">
      <h2>Customer Rewards</h2>
      <CustomerToolbar />
      {state.customerRewards.length ? <CustomerRewardsTable /> : <LoadingPlaceholder />}
    </div>
  );
}
