import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Check all text on Login page", () => {
  beforeEach(async () => {
    render(<App />);
  });

  test("Renders the heading Webbiskools Ltd", () => {
    const linkElement = screen.getByTestId("heading");
    expect(linkElement).toBeInTheDocument();
  });

  test("Renders the heading Login", () => {
    const linkElement = screen.getByTestId("login");
    expect(linkElement).toBeInTheDocument();
  });

  test("Renders the username label", () => {
    const linkElement = screen.getByTestId("username");
    expect(linkElement).toBeInTheDocument();
  });

  test("Renders the password label", () => {
    const linkElement = screen.getByTestId("password");
    expect(linkElement).toBeInTheDocument();
  });
});

describe("Check elements on the page", () => {
  beforeEach(async () => {
    render(<App />);
  });

  test("Renders an input for username", () => {
    const linkElement = screen.getByTestId("username-input");
    expect(linkElement).toBeInTheDocument;
  });

  test("Renders an input for password", () => {
    const linkElement = screen.getByTestId("password-input");
    expect(linkElement).toBeInTheDocument();
  });

  test("Renders an login button", () => {
    const linkElement = screen.getByTestId("submit");
    expect(linkElement).toBeInTheDocument();
  });
});
