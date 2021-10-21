import '@testing-library/jest-dom';
import { render, cleanup, fireEvent } from "@testing-library/react";

import OrderList from 'components/orders/OrderList';
import data from './data.json';
import { AppProvider } from 'context/AppContext';
import { CreateFormProvider } from 'context/CreateFormContext';
afterEach(cleanup);

describe('OrderList and OrderListItems', () => {

  it('renders unassigned order list without crashing', () => {
    console.error = () => {}
    render(
      <AppProvider>
        <CreateFormProvider>
          <OrderList
            list={data.orders.unassigned}
          />
        </CreateFormProvider>
      </AppProvider>
    )
  });

  it("renders 1 list item with 2 '1.00' text elements", () => {
    const {queryAllByText} = render(
      <AppProvider>
        <CreateFormProvider>
          <OrderList
            list={data.orders.unassigned}
          />
        </CreateFormProvider>
      </AppProvider>
    );
    expect(queryAllByText("1.00").length).toEqual(2);
  });

});
