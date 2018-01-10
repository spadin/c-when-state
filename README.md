# `<WhenState/>`

[![Greenkeeper badge](https://badges.greenkeeper.io/spadin/c-when-state.svg)](https://greenkeeper.io/)

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

### Use case

```js
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
```

See [demo/src/index.js][1]

[build-badge]: https://img.shields.io/travis/spadin/c-when-state/master.png?style=flat-square
[build]: https://travis-ci.org/spadin/c-when-state

[npm-badge]: https://img.shields.io/npm/v/c-when-state.png?style=flat-square
[npm]: https://www.npmjs.org/package/c-when-state

[coveralls-badge]: https://img.shields.io/coveralls/spadin/c-when-state/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/spadin/c-when-state

[1]: https://github.com/spadin/c-when-state/blob/master/demo/src/index.js

### Developing

Watch tests

```
$ yarn test:watch
```
