import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Main from './components/Main/Main';
import Navbar from './components/Navbar/Navbar';
import ImageContainer from './components/ImageContainer/ImageContainer';
import NotFound from './components/NotFound/NotFound';

// TODO: CHECK WHY THE ROUTES ARE NOT WORKING PROPERLY WHEN DEPLOYING

function App() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
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
    </HashRouter>
  );
}

export default App;
