import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./page";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    mockPush.mockClear();
    global.fetch = jest.fn();
  });

  it("renders the email and password fields and the sign in button", () => {
    render(<LoginPage />);

    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("lets the user type into the email and password fields", () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("you@example.com");
    const passwordInput = screen.getByPlaceholderText("Your password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("shows a loading state and disables the button while submitting", async () => {
    global.fetch.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: () => Promise.resolve({ access_token: "a", refresh_token: "b" }),
              }),
            50,
          ),
        ),
    );

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(await screen.findByText("Signing in...")).toBeInTheDocument();
  });

  it("shows an error message when login fails", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: "Invalid credentials" }),
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your password"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });
});