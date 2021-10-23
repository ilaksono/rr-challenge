import Modal from 'components/Modal';

import '@testing-library/jest-dom';
import { render, cleanup } from "@testing-library/react";
afterEach(cleanup);

describe('component test - Modal', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  it('opens modal with assigned modalTitle', () => {
    const { getByText } = render(
      <Modal
        show={true}
        modalTitle='Test Modal'
      ></Modal>
    )
    expect(getByText('Test Modal')).toBeInTheDocument();
  });
  it('modal has passed children', () => {
    const { getByText } = render(
      <Modal
        show={true}
        modalTitle='Test Modal'
      >
        <div>Test Child</div>
      </Modal>
    )
    expect(getByText('Test Child')).toBeInTheDocument();
  });
  it('closes when show is false', () => {
    const { queryAllByText } = render(
      <Modal
        show={false}
        modalTitle='Test Modal'
      >
        <div>Test Child</div>
      </Modal>
    )
    expect(queryAllByText('Test Modal').length).toEqual(0);
  });


});
