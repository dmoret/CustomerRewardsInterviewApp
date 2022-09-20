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
    getAllCustomers: () => Promise.resolve([]),
    getSingleCustomer: (customerId) => Promise.resolve([]),
    setCustomerById: (customerId) => null,
  },
});

CustomerContext.displayName = "CustomerContext";

export function useCustomerContext() {
  return useContext(CustomerContext);
}
