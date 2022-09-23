/**
 * Customer Rewards
 * displays customer record
 * @version 0.1
 * @author Daniel Moret
 */

import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function Customer({ customer }) {
  return (
    <tr>
      <td className="customer-id">{customer.id}</td>
      <td className="customer-name">
        {customer.lastName}, {customer.firstName}
      </td>
      <td className="total-spent">${customer.totalSpent}</td>
      <td className="reward-points">{customer.rewardPoints}</td>
      <td className="created-at">{customer.createdAt}</td>
      <td className="updated-at">{customer.updatedAt}</td>
      <td>
        <Router>
          <Link to="#">View Orders</Link>
        </Router>
      </td>
    </tr>
  );
}
