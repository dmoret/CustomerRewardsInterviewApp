/**
 * Customer Provider
 * @version 0.1
 * @author  Daniel Moret
 */

import React, { useState, useEffect } from "react";
import CustomerService from "services/customers";
import { CustomerContext } from "./context";
import { CUSTOMER_DATE_RANGE } from "utils/constants";
export * from "./context";

export const CustomerProvider = (props) => {
  const { children } = props;
  const [customers, setCustomers] = useState([]);
  const [customersDateRange, setCustomersDateRange] = useState({ value: 3, label: "3 Months" });
  const [customerId, setCustomerId] = useState("");
  const [customerRewards, setCustomerRewards] = useState([]);

  /**
   * Get All Customers
   * @returns void
   */
  const getAllCustomers = async () => {
    const result = await CustomerService.getCustomers(customersDateRange);
    setCustomers(result);
  };

  /**
   * Get Single Customer
   * @param customerId string  Required. The customer ID coming from the field input
   * @returns void
   */
  const getSingleCustomer = async () => {
    const result = await CustomerService.getCustomers(customerId);
    setCustomers(result);
  };

  /**
   * Get All or Single Customer
   * @returns void
   */
  const getCustomers = async () => {
    if (parseInt(customerId)) {
      await getSingleCustomer();
    } else {
      await getAllCustomers();
    }
  };

  /**
   * Set Customers Date Range
   * default is set to 3 months
   * @param dateRange integer  Required. The date range in months
   * @returns void
   */
  const setCustomersByDateRange = (dateRange) => {
    const month = parseInt(dateRange.value);

    if (isNaN(month)) {
      setCustomersDateRange({
        value: CUSTOMER_DATE_RANGE,
        label: `${CUSTOMER_DATE_RANGE} Months`,
      });
    } else {
      let label = dateRange.label;

      switch (month) {
        case 0:
          label = "All Months";
          break;
        case 1:
          label = `${month} Month`;
          break;
        default:
          label = dateRange.label;
          break;
      }

      setCustomersDateRange({ value: month, label: label });
    }
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
      customers,
      customersDateRange,
      customerId,
      customerRewards,
    },
    actions: {
      getAllCustomers,
      getSingleCustomer,
      setCustomersByDateRange,
      setCustomerById,
    },
  };

  // Get all customers or single customer by ID
  useEffect(() => {
    (async () => {
      getCustomers();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  // Get and calculate customer rewards from loaded customers
  useEffect(() => {
    if (customers.length) {
      const rewards = CustomerService.getCustomerRewards(customers);
      setCustomerRewards(rewards);
    }
  }, [customers]);

  // Get customers on customer date range change
  useEffect(() => {
    (async () => {
      getCustomers();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customersDateRange]);

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
};
