
import DriverDisplayItem from 'components/drivers/DriverDisplayItem';
import SupplierDisplayItem from 'components/suppliers/SupplierDisplayItem';
import '@testing-library/jest-dom';
import { AppProvider } from 'context/AppContext';
import { CreateFormProvider } from 'context/CreateFormContext';

import { render, cleanup } from "@testing-library/react";
afterEach(cleanup);

describe('component tests - Popovers', () => {
 
  it('renders DriverDisplayItem with props successfully', () => {
    const { getByText } = render(
      <AppProvider>
    <CreateFormProvider>
      <DriverDisplayItem
        driver_fname='John'
      />
    </CreateFormProvider>
    </AppProvider>
    )
    expect(getByText('John')).toBeInTheDocument();
  });
  it('renders SupplierDisplayItem with props successfully', () => {
    const { getByText } = render(
      <AppProvider>
    <CreateFormProvider>
      <SupplierDisplayItem
        supp_fname='Jane'
        type='supplier'
      />
    </CreateFormProvider>
    </AppProvider>
    )
    expect(getByText('Jane')).toBeInTheDocument();
  });

});
