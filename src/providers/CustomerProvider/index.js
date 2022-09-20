/**
 * Customer Provider
 * @version 0.1
 * @author  Daniel Moret
 */

import React, { useState, useEffect } from "react";
import CustomerService from "services/customers";
import { CustomerContext } from "./context";
export * from "./context";

export const CustomerProvider = (props) => {
  const { children } = props;
  const [customerId, setCustomerId] = useState("");
  const [customers, setCustomers] = useState([]);
  const [customerRewards, setCustomerRewards] = useState([]);

  /**
   * Get All Customers
   * @returns void
   */
  const getAllCustomers = async () => {
    const result = await CustomerService.getCustomers();
    setCustomers(result);
  };

  /**
   * Get Single Customer
   * @param customerId string  Required. The customer ID coming from the field input
   * @returns void
   */
  const getSingleCustomer = async (customerId) => {
    const result = await CustomerService.getCustomers(customerId);
    setCustomers(result);
  };

  /**
   * Set Customer ID
   * convert customer ID string to number and set
   * @param customerId string  Required. The customer ID
   * @returns void
   */
  const setCustomerById = (customerId) => {
    customerId = parseInt(customerId);
    isNaN(customerId) ? setCustomerId("") : setCustomerId(customerId);
  };

  // Set context value
  const value = {
    state: {
      customerId,
      customers,
      customerRewards,
    },
    actions: {
      getAllCustomers,
      getSingleCustomer,
      setCustomerById,
    },
  };

  // Get all customers or single customer by ID
  useEffect(() => {
    (async () => {
      if (parseInt(customerId)) {
        await getSingleCustomer(customerId);
      } else {
        await getAllCustomers();
      }
    })();
  }, [customerId]);

  // Get and calculate customer rewards from loaded customers
  useEffect(() => {
    if (customers.length) {
      const rewards = CustomerService.getCustomerRewards(customers);
      setCustomerRewards(rewards);
    }
  }, [customers]);

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
};
