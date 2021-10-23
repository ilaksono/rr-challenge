
import { AppProvider } from 'context/AppContext';
import OrderUpload from 'components/orders/OrderUpload';
import '@testing-library/jest-dom';
import { render, cleanup, fireEvent } from "@testing-library/react";
afterEach(cleanup);

describe('component tests - OrderUpload', () => {

  it('renders upload link without crashing', () => {
    render(
      <AppProvider>
        <OrderUpload/>
      </AppProvider>
    )
  });
  it('opens upload modal when clicking Upload', () => {
    const {getByText} = render(
      <AppProvider>
        <OrderUpload/>
      </AppProvider>
    )
    const uploadBtn = getByText('Upload');
    fireEvent.click(uploadBtn);
    expect(getByText('Create and Update Orders - Upload CSV')).toBeInTheDocument();
  });


});
