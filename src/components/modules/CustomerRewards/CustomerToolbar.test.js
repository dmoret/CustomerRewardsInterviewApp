import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CustomerProvider } from "providers/CustomerProvider";
import CustomerToolbar from "components/modules/CustomerRewards/CustomerToolbar";

const setup = () => {
  const user = userEvent.setup();
  const utils = render(
    <CustomerProvider>
      <CustomerToolbar />
    </CustomerProvider>
  );

  const inputCustomerId = utils.getByLabelText("Customer ID#:");

  return {
    inputCustomerId,
    user,
    ...utils,
  };
};

describe("CustomerToolbar", () => {
  describe("Input Field :: Customer ID", () => {
    const { inputCustomerId } = setup();

    test("Input field renders", () => {
      expect(inputCustomerId).toBeInTheDocument();
    });

    test("Input field has the correct ID", () => {
      expect(inputCustomerId).toHaveAttribute("id", "customer-id");
    });

    test("Allow numbers to be inputted", async () => {
      const { user, inputCustomerId } = setup();

      await user.type(inputCustomerId, "2");

      expect(inputCustomerId.value).toBe("2");
    });

    test("Do not allow letters to be inputted", async () => {
      const { user, inputCustomerId } = setup();

      expect(inputCustomerId.value).toBe("");

      await user.type(inputCustomerId, "asd");

      expect(inputCustomerId.value).toBe("");
    });
  });
});
