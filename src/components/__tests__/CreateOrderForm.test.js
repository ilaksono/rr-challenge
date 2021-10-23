import {AppProvider} from "context/AppContext";
import {CreateFormProvider} from "context/CreateFormContext";
import CreateOrderForm from "components/orders/CreateOrderForm";
import { initOrderForm as init } from "utils/initStates";
import SupplierFormElements from 'components/suppliers/SupplierFormElements';

import '@testing-library/jest-dom';
import { render, cleanup } from "@testing-library/react";
afterEach(cleanup);

describe('component test - CreateOrderForm', () => {

  it('renders form', () => {
    const {getByText} = render(
      <AppProvider>
        <CreateFormProvider
          show={true}
          init={init}
        ><CreateOrderForm
          />
        </CreateFormProvider>
      </AppProvider>
    )
    expect(getByText('Cost $')).toBeInTheDocument();
  });

  it('renders SupplierFormElements', () => {
    const {getByText} = render(
      <SupplierFormElements/>
    )

    expect(getByText('First Name')).toBeInTheDocument();
  })


});
