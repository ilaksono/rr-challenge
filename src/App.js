import { lazy } from 'react';
import ErrorBoundary from 'ErrorBoundary';
import RRLazyWrapper from 'components/general/RRLazyWrapper';
import useRemoveInitialLoader from 'hooks/useRemoveInitialLoader'
const MainView = lazy(() => import('views/MainView'));
const Updates = lazy(() => import('components/general/Updates'));

function App() {
 
  useRemoveInitialLoader();

  return (
    <ErrorBoundary>
      <RRLazyWrapper>
        <MainView />
        <Updates />
      </RRLazyWrapper>
    </ErrorBoundary>
  );
}

export default App;
