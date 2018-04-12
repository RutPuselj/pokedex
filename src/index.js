import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import './index.css';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import PokemonDetailsPage from './pages/PokemonDetails';
import PokemonMainPage from './pages/PokemonMain';
import AuthorizedContainer from './components/AuthorizedContainer/AuthorizedContainer';
import {Provider} from 'mobx-react';
import {useStrict} from 'mobx';
import store from './state/store.js';

useStrict(true);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route component={AuthorizedContainer} >
        <Route path="/pokedex" component={PokemonMainPage} />
        <Route path="/pokemon/:id" component={PokemonDetailsPage} />
      </Route>
    </Router>
  </Provider>, document.querySelector('.js-app'));
