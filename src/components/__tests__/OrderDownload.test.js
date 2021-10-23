
import { AppProvider } from 'context/AppContext';
import OrderDownload from 'components/orders/OrderDownload';
import '@testing-library/jest-dom';
import { render, cleanup } from "@testing-library/react";
afterEach(cleanup);

describe('component tests - OrderDownload', () => {

  it('renders download link without crashing', () => {
    render(
      <AppProvider>
        <OrderDownload/>
      </AppProvider>
    )
  });
});
