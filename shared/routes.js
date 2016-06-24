import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import Twitsection from './container/Twitsection/Twitsection';
import testcontainer from './container/testcontainer/testcontainer';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Twitsection} />
    <Route path="/test" component = {testcontainer} />
  </Route>
);

export default routes;
