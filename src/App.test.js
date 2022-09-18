/**
 * Customer Rewards App Testing
 * @version 0.1
 * @author Daniel Moret
 *
 * Testing priorities
 *
 * 1. High value features
 * 2. Edge cases in high value features
 * 3. Things that are easy to break
 * 4. Basic React component testing
 *    - User interactions
 *    - Conditional rendering
 *    - Utils / hooks
 */

import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "./App";
import { CustomerProvider } from "providers/CustomerProvider";
import CustomerRewards from "components/modules/CustomerRewards";
import CustomerToolbar from "components/modules/CustomerRewards/CustomerToolbar";

const setup = () => {
  const utils = render(<CustomerToolbar />);
  const input = utils.getByLabelText("Customer ID#:");
  return {
    input,
    ...utils,
  };
};

describe("Loads Compenent :: App", () => {
  test("renders App component", () => {
    render(<App />);
    screen.debug();
  });
});

describe("Loads Provider :: CustomerProvider", () => {
  test("renders CustomerProvider", () => {
    render(<CustomerProvider />);
  });
});

describe("Loads Compenent :: CustomerRewards", () => {
  test("renders CustomerProvider component", () => {
    render(<CustomerRewards />);
    screen.debug();
  });
});

describe("Inital Load :: Compenent :: CustomerRewards", () => {
  test("renders CustomerRewards component", () => {
    render(<App />);

    // Check for title customer rewards
    expect(screen.getByText(/customer rewards/i)).toBeInTheDocument();

    // Check for table loader
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    screen.debug();
  });
});

describe("CustomerToolbar :: Input Field :: Customer ID", () => {
  test("It should not allow letters to be inputted", () => {
    const { input } = setup();
    expect(input.value).toBe(""); // empty before
    fireEvent.change(input, { target: { value: "asd" } });
    expect(input.value).toBe(""); //empty after
  });
});

describe("Compenent :: CustomerRewards :: Get all and single customer", () => {
  test("renders a single customer with rewards into table", async () => {
    await act(async () => {
      render(
        <App>
          <CustomerProvider>
            <CustomerRewards />
          </CustomerProvider>
        </App>
      );
    });

    const input = screen.getByLabelText("Customer ID#:");

    await waitFor(() => {
      // Check if there are any customers loading
      expect(screen.getAllByRole("row").length).toBeGreaterThan(1);
      // Check for 'View Order' button
      expect(screen.getAllByText("View Orders")[0]).toBeInTheDocument();
      //screen.debug();
    });

    await waitFor(() => {
      // Input customer ID to retrieve a single customer
      fireEvent.input(input, { target: { value: "2" } });
      expect(screen.getAllByRole("row").length).toEqual(2);
    });
  });
});

describe("Matches snapshot", () => {
  test("match the snapshot", () => {
    const { asFragment } = render(
      <App>
        <CustomerProvider>
          <CustomerRewards />
        </CustomerProvider>
      </App>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
