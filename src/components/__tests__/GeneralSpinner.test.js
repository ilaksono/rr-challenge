import GeneralSpinner from 'components/general/GeneralSpinner';
import '@testing-library/jest-dom';
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

describe('component test - GeneralSpinner', () => {
  it("renders spinner without crashing", () => {
    const {getByTestId} = render(
      <GeneralSpinner/>
    );
    expect(getByTestId('general-spinner')).toBeInTheDocument();
  });
 
});