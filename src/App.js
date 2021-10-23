import { lazy } from 'react';
import ErrorBoundary from 'ErrorBoundary';
import RRLazyWrapper from 'components/general/RRLazyWrapper';
import useRemoveInitialLoader from 'hooks/useRemoveInitialLoader'
import Updates from 'components/general/Updates';
const MainView = lazy(() => import('views/MainView'));

function App() {

  useRemoveInitialLoader();

  return (
    <ErrorBoundary>
      <RRLazyWrapper>
        <MainView />
      </RRLazyWrapper>
      <Updates />
    </ErrorBoundary>
  );
}

export default App;
