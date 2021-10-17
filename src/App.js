import logo from './logo.svg';
import './App.css';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import ErrorBoundary from 'ErrorBoundary';
import routes from 'routes'
import Updates from 'components/general/Updates';

function App() {

  const parsedRoutes = routes.map(each => 
    <Route 
    key={each.path}
    {...each}/>)
  return (
    <ErrorBoundary>
      <Router>
        <Switch>
          {parsedRoutes}
        </Switch>
        <Updates/>
      </Router>

      
    </ErrorBoundary>
  );
}

export default App;
