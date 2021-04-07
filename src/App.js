import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/Main/Main';
import Navbar from './components/Navbar/Navbar';
import ImageContainer from './components/ImageContainer/ImageContainer';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/image/:imageName">
              <ImageContainer />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
