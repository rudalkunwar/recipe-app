import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("./utils/axiosInstance", () => ({
  get: jest.fn(() => Promise.resolve({ data: { meals: [] } })),
}));

test("renders Recipe App branding", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/recipe app/i)).toBeInTheDocument();
});
