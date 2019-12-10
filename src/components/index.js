import React, { Component, Suspense } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Stripe
import { StripeProvider } from 'react-stripe-elements';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from '../reducers';

// Wrapper Components
import AuthListener from './authListener';

// Higher Order Components
// import RequireAuth from './hocs/requireAuth';
// import RequireUnauth from './hocs/requireUnauth';
// import RequireAdmin from './hocs/requireAdmin';
// import RequireInstructor from './hocs/requireInstructor';

// Standard Components / Pages
const Home = React.lazy(() => import('./home'));
const CoursePreview = React.lazy(() => import('./coursePreview'));
const CourseViewer = React.lazy(() => import('./courseViewer'));
const StreamingTest = React.lazy(() => import('./streamingTest'));

const Loading = () => (
  <div
    style={{
      background: '#000',
    }}
  />
);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.hashLinkScroll = this.hashLinkScroll.bind(this);
    this.scrollRestore = this.scrollRestore.bind(this);
  }

  scrollRestore() {
    window.scrollTo(0, 0);
  }

  hashLinkScroll() {
    // Enables hash-based scrolling when routing
    const { hash } = window.location;
    if (hash !== '') {
      // Push onto callback queue so it runs after the DOM is updated,
      // this is required when navigating from a different page so that
      // the element is rendered on the page before trying to getElementById.
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();
      }, 0);
    }
  }

  render() {
    // Create redux store
    const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
    const store = createStoreWithMiddleware(
      Reducers,
      {},
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
    /* Add the following HOCs for auth routing:
      <IndexRoute component={RequireUnauth(Login)} />
      <Route component={RequireAuth(Container)}>
    */
    return (
      <StripeProvider apiKey="pk_test_eT5ipOGQVLdsEyixNbb5S6QP00p5nA6wPN">
        <Provider store={store}>
          <Suspense fallback={<Loading />}>
            <Router history={browserHistory} onUpdate={this.hashLinkScroll}>
              <Route path="/" component={AuthListener}>
                <IndexRoute component={Home} onEnter={this.scrollRestore} />
                <Route path="streaming" component={StreamingTest} onEnter={this.scrollRestore} />
                <Route
                  path="preview/:urlSlug"
                  component={CoursePreview}
                  onEnter={this.scrollRestore}
                />
                <Route
                  path="courses/:urlSlug/:lessonNumber"
                  component={CourseViewer}
                  onEnter={this.scrollRestore}
                />
              </Route>
            </Router>
          </Suspense>
        </Provider>
      </StripeProvider>
    );
  }
}
