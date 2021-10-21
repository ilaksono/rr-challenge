import React from "react";
import { AppProvider } from 'context/AppContext';
import App from "App";
import '@testing-library/jest-dom';
import { render, cleanup, fireEvent } from "@testing-library/react";

afterEach(cleanup);

describe('Launch application tests and jest', () => {
  it("renders without crashing", () => {
    // ignore network errors from axios
    console.error = () => { };
    render(
      <AppProvider>
        <App />
      </AppProvider>
    );
  });
  it('doens\'t call the function', () => {
    const fn = jest.fn();
    expect(fn).toHaveBeenCalledTimes(0);
  });
  it("uses the mock implementation", () => {
    const fn = jest.fn((a, b) => 42);
    fn(1, 2);
    expect(fn).toHaveReturnedWith(42);
  });
});