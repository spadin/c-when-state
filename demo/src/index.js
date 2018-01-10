import React from 'react'
import WhenState from '../../src/WhenState';
import {connect, Provider} from 'react-redux';
import {bindActionCreators, createStore} from 'redux';
import {render} from 'react-dom'

const LOGIN = 'login';
const LOGOUT = 'logout';

const reducer = (_, {type}) => ({
  [LOGIN]:  {loggedIn: true},
  [LOGOUT]: {loggedIn: false},
}[type]);

const store = createStore(reducer);

const login = () => ({type: LOGIN});
const logout = () => ({type: LOGOUT});

let Login = ({login}) => (
  <button onClick={login}>
    login
  </button>
);
Login = connect(null, (dispatch) => bindActionCreators({login}, dispatch))(Login);

let Logout = ({logout}) => (
  <button onClick={logout}>
    logout
  </button>
);

Logout = connect(null, (dispatch) => bindActionCreators({logout}, dispatch))(Logout);

const isLoggedIn = ({loggedIn} = {}) => (loggedIn);
const WhenLoggedIn = ({render}) => (
  <WhenState
    predicate={isLoggedIn}
    render={render}
  />
);

const notLoggedIn = ({loggedIn} = {}) => (!loggedIn);
const WhenNotLoggedIn = ({render}) => (
  <WhenState
    predicate={notLoggedIn}
    render={render}
  />
);

const Demo = () => (
  <Provider store={store}>
    <div>
      <h1>c-when-state Demo</h1>
      <WhenLoggedIn
        render={() => (
          <span>
            Logged in, cool! <Logout/>
          </span>
        )}
      />

      <WhenNotLoggedIn
        render={() => (
          <span>
            Not logged in, bummer. <Login/>
          </span>
        )}
      />
    </div>
  </Provider>
);

render(<Demo/>, document.querySelector('#demo'))
