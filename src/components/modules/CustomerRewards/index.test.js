import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";
import App from "App";
import { CustomerProvider } from "providers/CustomerProvider";
import CustomerRewards from ".";

const setup = () => {
  const utils = render(
    <App>
      <CustomerProvider>
        <CustomerRewards />
      </CustomerProvider>
    </App>
  );
  const inputCustomerId = utils.getByLabelText("Customer ID#:");
  return {
    inputCustomerId,
    ...utils,
  };
};

describe("Compenent :: CustomerRewards", () => {
  test("Initial load renders the title and table loader", () => {
    setup();

    // Check for title customer rewards
    expect(screen.getByText(/customer rewards/i)).toBeInTheDocument();

    // Check for table loader
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("Customer with rewards has rendered into table", async () => {
    const { getByRole, getAllByRole, getAllByText } = setup();

    await waitFor(() => {
      // Check table has loaded
      expect(getByRole("table")).toBeInTheDocument();

      // Check more than a single customer is loading into table
      expect(getAllByRole("row").length).toBeGreaterThan(2);

      // Check for 'View Order' button
      expect(getAllByText("View Orders")[1]).toBeInTheDocument();
    });
  });

  test("Single customer with rewards rendered into table", async () => {
    const { getByRole, getAllByRole, getAllByText } = setup();

    const input = screen.getByLabelText("Customer ID#:");

    await waitFor(() => {
      // Check table has loaded
      expect(getByRole("table")).toBeInTheDocument();

      // Type in customer ID to filter table results
      fireEvent.input(input, { target: { value: "2" } });

      // Check that only a single customer is loading
      expect(getAllByRole("row").length).toEqual(2);

      // Check for 'View Order' button
      expect(getAllByText("View Orders")[0]).toBeInTheDocument();
    });
  });

  test("Customer ID has rendered into table", async () => {
    const { getByRole } = setup();

    await waitFor(() => {
      expect(getByRole("table").querySelector("td.customer-id")).toBeInTheDocument();
    });
  });

  test("Customer name has rendered into table", async () => {
    const { getByRole } = setup();

    await waitFor(() => {
      expect(getByRole("table").querySelector("td.customer-name")).toBeInTheDocument();
    });
  });

  test("customer total spent has rendered into table", async () => {
    const { getByRole } = setup();

    await waitFor(() => {
      expect(getByRole("table").querySelector("td.total-spent")).toBeInTheDocument();
    });
  });

  test("customer reward points has rendered into table", async () => {
    const { getByRole } = setup();

    await waitFor(() => {
      expect(getByRole("table").querySelector("td.reward-points")).toBeInTheDocument();
    });
  });

  test("customer created at has rendered into table", async () => {
    const { getByRole } = setup();

    await waitFor(() => {
      expect(getByRole("table").querySelector("td.created-at")).toBeInTheDocument();
    });
  });

  test("customer updated at has rendered into table", async () => {
    const { getByRole } = setup();

    await waitFor(() => {
      expect(getByRole("table").querySelector("td.updated-at")).toBeInTheDocument();
    });
  });
});
