import '@testing-library/jest-dom';
import { render, cleanup, fireEvent } from "@testing-library/react";

import ConfirmModal from 'components/general/ConfirmModal';
import TemplateAlert from 'components/general/TemplateAlert'
import ErrorToast from 'components/general/ErrorToast';
afterEach(cleanup);


describe('Update modals, alerts, and toasts', () => {

  it('renders without crashing', () => {
    render(<ConfirmModal 
      conMod={{show: true}}
    />)
    render(<TemplateAlert 
      alert={{show: true}}
    />)
    render(<ErrorToast 
      show={true}
    />)
  });

  it('should fire reset modal handler', () => {
    const resetConfirmModal = jest.fn();
    const { getByText } = render(
        <ConfirmModal
        conMod={{
          btnText:'Submit',
          show: true
        }}
        resetConfirmModal={resetConfirmModal}
        />
    );
    fireEvent.click(getByText(/Submit/ig));
    expect(resetConfirmModal).toHaveBeenCalledTimes(1);
  });

  it('should fire confirm function callback', () => {
    const confirm = jest.fn();
    const resetConfirmModal = jest.fn();
    const { getByText } = render(
      // <AppProvider>
        <ConfirmModal
        conMod={{
          btnText:'Submit',
          show: true,
          confirm
        }}
        resetConfirmModal={resetConfirmModal}
        />
      // </AppProvider>
    );
    fireEvent.click(getByText(/Submit/ig));
    expect(confirm).toHaveBeenCalledTimes(1);
  });

});
