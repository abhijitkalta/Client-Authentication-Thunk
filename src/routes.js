import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/app';
import SignIn from './components/auth/signin';
import SignOut from './components/auth/signout';
import SignUp from './components/auth/signup';
import Feature from './components/feature';
import Welcome from './components/welcome';
import requireAuth from './components/higherOrderComponents/requireAuthentication';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Welcome} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/signout" component={SignOut} />
    <Route path="/feature" component={requireAuth(Feature)} />
  </Route>
);
