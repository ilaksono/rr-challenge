
import AddressPopover from 'components/popovers/AddressPopover';
import CompanyPopover from 'components/popovers/CompanyPopover';
import OrderTimePopover from 'components/popovers/OrderTimePopover';
import TimeLegendPopover from 'components/popovers/TimeLegendPopover';
import UploadInstructionPopover from 'components/popovers/UploadInstructionPopover';

import '@testing-library/jest-dom';
import { render, cleanup } from "@testing-library/react";
afterEach(cleanup);

describe('component tests - Popovers', () => {

  it('renders AddressPopover successfully', () => {
    const { getByText } = render(
      <AddressPopover/>
    )
    expect(getByText('city:')).toBeInTheDocument();
  });
  it('renders CompanyPopover successfully', () => {
    const { getByText } = render(
      <CompanyPopover/>
    )
    expect(getByText('name:')).toBeInTheDocument();
  });
  it('renders OrderTimePopover successfully', () => {
    const { getByText } = render(
      <OrderTimePopover/>
    )
    expect(getByText('start time:')).toBeInTheDocument();
  });
  it('renders TimeLegendPopover successfully', () => {
    const { getByText } = render(
      <TimeLegendPopover/>
    )
    expect(getByText('In Transit')).toBeInTheDocument();
  });
  it('renders UploadInstructionPopover successfully', () => {
    const { getByText } = render(
      <UploadInstructionPopover/>
    )
    expect(getByText('Steps')).toBeInTheDocument();
  });


});
