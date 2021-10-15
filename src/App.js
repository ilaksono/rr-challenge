import logo from './logo.svg';
import './App.css';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import ErrorBoundary from 'ErrorBoundary';
import routes from 'routes'

function App() {

  const parsedRoutes = routes.map(each => 
    <Route {...each}/>)
  return (
    <ErrorBoundary>
      <Router>
        <Switch>
          {parsedRoutes}
        </Switch>
      </Router>

      
    </ErrorBoundary>
  );
}

export default App;
