import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import PrivateRoute from '../Navigation/PrivateRoute.js';
import { withFirebase } from '../Firebase';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      authenticated: false,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? (
            this.setState({ authenticated: true, authUser: authUser })

          ) : (
            this.setState({ authenticated: false, authUser: null })
          )
      },
    );
  }


  componentWillUnmount() {
    this.listener();
  }


  render() {
    const authUser = this.props.authUser;
    return (
      <Router>
        <div>
          {/* <PrivateRoute exact path="/" component={Home} /> */}
          <PrivateRoute
            authenticated={this.state.authenticated}
            authUser={this.state.authUser}
          />
        </div>
      </Router>
    );
  }
}

export default withFirebase(App);