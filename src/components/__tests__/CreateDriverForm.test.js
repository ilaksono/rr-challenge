import {AppProvider} from "context/AppContext";
import {CreateFormProvider} from "context/CreateFormContext";
import CreateDriverForm from "components/drivers/CreateDriverForm";

import '@testing-library/jest-dom';
import { render, cleanup } from "@testing-library/react";
afterEach(cleanup);

describe('component test - CreateDriverForm', () => {

  it('renders form', () => {
    const {getByText} = render(
      <AppProvider>
        <CreateFormProvider
          show={true}
          init={{
            fname: '',
            lname: '',
            make: '',
            model: '',
            year: 2020,
            driver_insurance: ''
          }}
        >
          <CreateDriverForm
          />
        </CreateFormProvider>
      </AppProvider>
    )
    expect(getByText('First Name *')).toBeInTheDocument();
  });

});
