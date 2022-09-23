import { screen, render, fireEvent, act, waitFor } from "@testing-library/react";
import CustomerToolbar from "components/modules/CustomerRewards/CustomerToolbar";
import userEvent from "@testing-library/user-event";

const setup = () => {
  const utils = render(<CustomerToolbar />);
  const input = utils.getByLabelText("Customer ID#:");
  return {
    input,
    ...utils,
  };
};

describe("CustomerToolbar", () => {
  describe("Input Field :: Customer ID", () => {
    const { input } = setup();
    test("Customer ID input field renders", () => {
      expect(input).toBeInTheDocument();
    });

    test("Customer ID field has the correct field ID", () => {
      expect(input).toHaveAttribute("id", "customer-id");
    });
    /*
    test("Allow numbers to be inputted", async () => {
      const { input } = setup();
      //await userEvent.type(input, "asd");

      //await fireEvent.change(input, { target: { value: 23 } });

      act(() => {
        fireEvent.change(input, { target: { value: "25" } });
      });

      expect(input.value).toBe("25");
    });
*/
    test("Do not allow letters to be inputted", async () => {
      const { input } = setup();

      expect(input.value).toBe("");

      act(() => {
        fireEvent.input(input, { target: { value: "asd" } });
      });

      // await waitFor(() => {
      expect(input.value).toBe("");
      // });
    });
  });
});
