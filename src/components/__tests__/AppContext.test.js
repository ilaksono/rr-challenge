
import {AppProvider} from 'context/AppContext';
import '@testing-library/jest-dom';
import { render, cleanup } from "@testing-library/react";
import MainView from 'views/MainView';
afterEach(cleanup);

describe('context test - AppContext', () => {

  const customRender = (ui) => {
    return render(
      <AppProvider>{ui}
      </AppProvider>
    )
  }

  it('renders children crashing', () => {
    const {getByText} = render(
      <AppProvider>
        <div>Test App</div>
      </AppProvider>
    )
      expect(getByText('Test App')).toBeInTheDocument();
  });
  it('provides values to children', () => {
  
    const {getByText} = customRender(
      <MainView />
    )
    expect(getByText(`Trans-It`)).toBeInTheDocument();

  })
});
