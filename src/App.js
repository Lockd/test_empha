import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Route, Switch } from 'react-router';

import Auth from './Containers/Auth/Auth';
import UsersList from './Containers/UsersList/UsersList';
import Header from './Components/Header/Header';
import Logout from './Containers/Auth/Logout/Logout';

import * as actions from './store/actions';

import './App.scss';

class App extends Component {
  componentDidMount() {
    this.props.autoSignUp();
  }

  render() {
    return (
      <div className="App">
        {this.props.isLoggedIn ? <Header /> : null}
        <Switch>
          <Route path='/users' component={UsersList} />
          <Route path='/logout' component={Logout} />
          <Route path='/' component={Auth} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoSignUp: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
