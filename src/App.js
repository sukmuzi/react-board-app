import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BoardListComponent from './components/BoardListComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={BoardListComponent}></Route>
            <Route path="/board" exact component={BoardListComponent}></Route>
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
