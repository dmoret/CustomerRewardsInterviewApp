/**
 * Customer Provider Context
 * @version 0.1
 * @author  Daniel Moret
 */

import { createContext, useContext } from "react";

export const CustomerContext = createContext({
  state: {
    customers: [],
    customersDateRange: "",
    customerId: "",
    customerRewards: [],
  },
  actions: {
    getAllCustomers: () => Promise.resolve([]),
    getSingleCustomer: () => Promise.resolve([]),
    getCustomers: () => Promise.resolve([]),
    setCustomerById: (customerId) => null,
    setCustomersByDateRange: (customersDateRange) => null,
  },
});

CustomerContext.displayName = "CustomerContext";

export function useCustomerContext() {
  return useContext(CustomerContext);
}
