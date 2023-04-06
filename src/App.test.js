import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import App from "./App";

test("renders AddressForm component", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const addressFormElement = screen.getByTestId("address-form");
  expect(addressFormElement).toBeInTheDocument();
});

test("renders DepartementAverage component when navigating to /departement/:departement", () => {
  const testDepartement = "24";

  render(
    <MemoryRouter initialEntries={[`/departement/${testDepartement}`]}>
      <App />
    </MemoryRouter>
  );

  const departementAverageElement = screen.getByTestId("departement-average");
  expect(departementAverageElement).toBeInTheDocument();
});
