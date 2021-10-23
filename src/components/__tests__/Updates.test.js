import '@testing-library/jest-dom';
import { render, cleanup, fireEvent } from "@testing-library/react";

import LoadingModal from 'components/general/LoadingModal';
import ConfirmModal from 'components/general/ConfirmModal';
import TemplateAlert from 'components/general/TemplateAlert'
import ErrorToast from 'components/general/ErrorToast';
afterEach(cleanup);


describe('component tests- Update modals, alerts, and toasts', () => {

  it('renders without crashing', () => {
    const confirmModal = render(<ConfirmModal 
      conMod={{show: true}}
    />)
    const templateAlert = render(<TemplateAlert 
      alert={{show: true}}
    />)
    const errorToast = render(<ErrorToast 
      show={true}
    />)
    const loadingModal = render(<LoadingModal
    show={true}
    />)
    expect(confirmModal.getByTestId('confirm-modal')).toBeInTheDocument();
    expect(templateAlert.getByTestId('template-alert')).toBeInTheDocument();
    expect(errorToast.getByTestId('error-toast')).toBeInTheDocument();
    expect(loadingModal.getByTestId('loading-modal')).toBeInTheDocument();
    

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
