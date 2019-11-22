/* NPM modules */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
/* Material UI */
/* Own modules */
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { UserProvider } from '../../context/UserContext';
import AdvertDetail from '../AdvertDetail/AdvertDetail';
import AdvertEdit from '../AdvertEdit/AdvertEdit';
import LocalStorage from '../../utils/Storage';
import Error404 from '../Error404/Error404';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Home from '../Home/Home';
import Session from '../../models/Session';
/* Assets */
/* CSS */

/**
 * Main App
 */
export default class App extends Component {
  /**
   * Constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    // Intento recuperar la sesión del storage
    let user = LocalStorage.readLocalStorage();
    if (!user) {
      // Si no hay nada en el local storage, creo un objeto sesión vacio correcto
      user = new Session();
    }
    this.state = {
      session: user,
    };
  }

  /**
   * Render
   */
  render() {
    return (
      <ErrorBoundary>
        <UserProvider value={this.state}>
          <Router>
            <Switch>
              <Route path="/register" exact component={Register} />
              <PrivateRoute path="/profile" exact component={Profile} />
              <PrivateRoute
                path="/advert/create"
                exact
                render={props => <AdvertEdit {...props} mode="new" />}
              />
              <PrivateRoute
                path="/advert/:id/edit"
                exact
                render={props => <AdvertEdit {...props} mode="edit" />}
              />
              <PrivateRoute path="/advert/:id" exact component={AdvertDetail} />
              <PrivateRoute path="/" exact component={Home} />
              <PrivateRoute component={Error404} />
            </Switch>
          </Router>
        </UserProvider>
      </ErrorBoundary>
    );
  }
}
