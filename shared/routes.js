import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import PostContainer from './container/PostContainer/PostContainer';
import PostDetailView from './container/PostDetailView/PostDetailView';
import Twitsection from './components/Twitsection/Twitsection';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Twitsection} />
    <Route path="/post/:slug" component={PostDetailView}/>
  </Route>
);

export default routes;
