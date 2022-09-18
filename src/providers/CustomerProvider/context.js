/**
 * Customer Provider Context
 * @version 0.1
 * @author  Daniel Moret
 */

import { createContext, useContext } from "react";

export const CustomerContext = createContext({
  state: {
    customerId: "",
    customers: [],
    customerRewards: [],
  },
  actions: {
    getCustomers: (customerId) => Promise.resolve([]),
    getCustomerRewards: () => null,
    setCustomerById: (customerId) => null,
  },
});

CustomerContext.displayName = "CustomerContext";

export function useCustomerContext() {
  return useContext(CustomerContext);
}
