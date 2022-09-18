/**
 * Customer Provider
 * @version 0.1
 * @author  Daniel Moret
 */

import React, { useState, useEffect } from "react";
import { handleResponse } from "api/methods";
import { CustomerContext } from "./context";
export * from "./context";

export const rewardPriceFirstTier = 50;
export const rewardPriceSecondTier = 100;

export const CustomerProvider = (props) => {
  const { children } = props;
  const [customerId, setCustomerId] = useState("");
  const [customers, setCustomers] = useState([]);
  const [customerRewards, setCustomerRewards] = useState([]);

  /**
   * Get all customers
   * mock up API call, no auth set
   * @param   id  integer  Optional. Customer ID
   * @returns res array    All or single customer
   */
  const getCustomers = async (id = "") => {
    console.log("CustomerProvider ::  getCustomers .... ");
    return fetch(`${process.env.REACT_APP_API_URL}/customers/${id}`).then(async (response) => {
      let res = await handleResponse(response);
      res = Array.isArray(res) ? res : [res];
      setCustomers(res);
    });
  };

  /**
   * Set Customer ID
   * convert customer ID string to number and set
   * @param customerId string  Required. The customer ID
   */
  const setCustomerById = (customerId) => {
    customerId = parseInt(customerId);
    isNaN(customerId) ? setCustomerId("") : setCustomerId(customerId);
  };

  const value = {
    state: {
      customerId,
      customers,
      customerRewards,
    },
    actions: {
      getCustomers,
      setCustomerById,
    },
  };

  // Get and calculate customer rewards from loaded customers
  useEffect(() => {
    if (customers.length) {
      const getCustomerRewards = () => {
        console.log("CustomerProvider :: getCustomerRewards :: customers :: ", customers);
        if (customers.length) {
          const customerRewardsResult = customers.map((customer) => {
            const totalSpent = customer.totalSpent / 100;
            let rewardCalcAmount = Math.floor(totalSpent);
            const totalSpentFloor = rewardCalcAmount;

            // Reward 1 point for every dollar if customer spent over fist tier amount
            if (rewardCalcAmount > rewardPriceFirstTier) {
              rewardCalcAmount = rewardCalcAmount - 50;
              // Get amount to reward if price is over second tier amount
              if (totalSpentFloor > rewardPriceSecondTier) {
                const amount = totalSpentFloor - rewardPriceSecondTier;
                rewardCalcAmount = rewardCalcAmount - amount;
              }
              customer.rewardPoints += 1 * rewardCalcAmount;
            }

            // Reward 2 points for every dollar if customer spent over $100
            if (totalSpentFloor > rewardPriceSecondTier) {
              const amount = totalSpentFloor - rewardPriceSecondTier;
              customer.rewardPoints += amount * 2;
            }

            // Format customer data for display
            customer.totalSpent = totalSpent.toFixed(2);
            // I usually use moment.js for these calculations, but the assesment asked to avoid using unnecessary 3rd party libraries
            // I do feel its necessary for scalability, but haven't included it since this app its for an assesement test by interviewers.
            customer.createdAt = new Date(customer.createdAt * 1000).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            customer.updatedAt = new Date(customer.updatedAt * 1000).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            return customer;
          });

          setCustomerRewards(customerRewardsResult);
        }
      };
      getCustomerRewards();
    }
  }, [customers]);

  // Get all customers or single customer by ID
  useEffect(() => {
    (async () => {
      //await getCustomers(customerId);
      console.debug("parseInt(customerId) :: ", parseInt(customerId));
      if (parseInt(customerId)) {
        console.debug("CustomerProvider :: useEffect :: state.customerId :: ", customerId);
        await getCustomers(customerId);
      } else {
        console.debug("CustomerProvider :: useEffect :: state.customerId :: ", customerId);
        await getCustomers();
      }
    })();
  }, [customerId]);

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
};
