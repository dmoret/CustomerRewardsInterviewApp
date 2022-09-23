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

import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Loads Compenent :: App", () => {
  test("renders App component", () => {
    render(<App />);
  });
});

describe("Matches snapshot", () => {
  test("match the snapshot", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
