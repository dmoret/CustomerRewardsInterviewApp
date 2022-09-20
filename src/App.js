/**
 * Customer Rewards App
 * @version 0.1
 * @author Daniel Moret
 */

import React from "react";
import { CustomerProvider } from "providers/CustomerProvider";
import CustomerRewards from "components/modules/CustomerRewards";
import "styles/App.css";

export default function App() {
  return (
    <div className="App">
      <CustomerProvider>
        <CustomerRewards />
      </CustomerProvider>
    </div>
  );
}
