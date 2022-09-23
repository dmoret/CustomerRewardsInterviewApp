import { render, screen } from "@testing-library/react";
import CustomerRewards from ".";

describe("Compenent :: CustomerRewards", () => {
  test("Initial load renders the title and table loader", () => {
    render(<CustomerRewards />);

    // Check for title customer rewards
    expect(screen.getByText(/customer rewards/i)).toBeInTheDocument();

    // Check for table loader
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
