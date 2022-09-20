/**
 * Customer Services
 * @version 0.1
 * @author Daniel Moret
 */

import { REWARD_PRICE_FIRST_TIER, REWARD_PRICE_SECOND_TIER } from "utils/constants";
import { handleResponse } from "utils/api-methods";

/**
 * Get all customers
 * mock up API call, no auth set
 * @param   id  integer  Optional. Customer ID
 * @returns res array    All or single customer
 */
const getCustomers = async (id = "") => {
  return fetch(`${process.env.REACT_APP_API_URL}/customers/${id}`).then(async (response) => {
    const res = await handleResponse(response);
    return Array.isArray(res) ? res : [res];
  });
};

/**
 * Get customer rewards
 * @param   customers array  Required. An array of customers to calculate rewards
 * @returns rewards   array  An array of rewarded customers
 */
const getCustomerRewards = (customers) => {
  if (customers.length) {
    const rewards = customers.map((customer) => {
      // Divide by 100 to get decimal amount
      const totalSpent = customer.totalSpent / 100;
      // Round down to the nearest integer
      let rewardCalcAmount = Math.floor(totalSpent);
      const totalSpentFloor = rewardCalcAmount;

      // Reward 1 point for every dollar if customer spent over fist tier amount
      if (rewardCalcAmount > REWARD_PRICE_FIRST_TIER) {
        rewardCalcAmount = rewardCalcAmount - 50;
        // Get amount to reward if price is over second tier amount
        if (totalSpentFloor > REWARD_PRICE_SECOND_TIER) {
          const amount = totalSpentFloor - REWARD_PRICE_SECOND_TIER;
          rewardCalcAmount = rewardCalcAmount - amount;
        }
        customer.rewardPoints += 1 * rewardCalcAmount;
      }

      // Reward 2 points for every dollar if customer spent over $100
      if (totalSpentFloor > REWARD_PRICE_SECOND_TIER) {
        const amount = totalSpentFloor - REWARD_PRICE_SECOND_TIER;
        customer.rewardPoints += amount * 2;
      }

      // Format customer data for display
      customer.totalSpent = totalSpent.toFixed(2);

      /**
       * I usually use moment.js for these calculations, but the assesment asked
       * to avoid using unnecessary 3rd party libraries. I do feel its necessary for scalability,
       * but haven't included it since this app its for an assesement test by interviewers
       */
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

    return rewards;
  }
};

const CustomerServices = { getCustomers, getCustomerRewards };

export default CustomerServices;
