import React, {Suspense} from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Main from './views/MainPage/Main';
import Login from './views/LoginPage/Login';
import Signup from './views/SignupPage/SignUp';
import {CssBaseline} from '@material-ui/core';
function App() {
  return (
    <>
      <CssBaseline />
      <Suspense fallback={(<div>로딩중 ...</div>)}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
