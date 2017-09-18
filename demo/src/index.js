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
const WhenLoggedIn = ({children}) => (
  <WhenState predicate={isLoggedIn}>
    {children}
  </WhenState>
);

const notLoggedIn = ({loggedIn} = {}) => (!loggedIn);
const WhenNotLoggedIn = ({children}) => (
  <WhenState predicate={notLoggedIn}>
    {children}
  </WhenState>
);

const Demo = () => (
  <Provider store={store}>
    <div>
      <h1>c-when-state Demo</h1>
      <WhenLoggedIn>
        <span>
          Logged in, cool! <Logout/>
        </span>
      </WhenLoggedIn>

      <WhenNotLoggedIn>
        <span>
          Not logged in, bummer. <Login/>
        </span>
      </WhenNotLoggedIn>
    </div>
  </Provider>
);

render(<Demo/>, document.querySelector('#demo'))
