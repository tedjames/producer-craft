import React, { Component, Suspense } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Firebase
import firebase from 'firebase';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from '../reducers';

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

const firebaseConfig = {
  apiKey: 'AIzaSyC51eVN6j-fJoqVvNiig3v3hUdeQdvNdVE',
  authDomain: 'producer-craft.firebaseapp.com',
  databaseURL: 'https://producer-craft.firebaseio.com',
  projectId: 'producer-craft',
  storageBucket: 'producer-craft.appspot.com',
  messagingSenderId: '495964428761',
  appId: '1:495964428761:web:ca7330892d6cd34c',
};

const Loading = () => (
  <div
    style={{
      background: '#000',
    }}
  />
);

export default class App extends Component {
  componentWillMount() {
    // Firebase initialization
    firebase.initializeApp(firebaseConfig);
    const app = firebase.app();
    const features = ['auth', 'functions'].filter(feature => typeof app[feature] === 'function');
    console.log(`Firebase SDK loaded with ${features.join(', ')}. App Object: `, app);
  }

  scrollRestore() {
    window.scrollTo(0, 0);
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
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <Router history={browserHistory}>
            <Route path="/">
              <IndexRoute component={Home} onEnter={this.scrollRestore} />
              <Route path="streaming" component={StreamingTest} onEnter={this.scrollRestore} />
              <Route path="preview">
                <Route
                  path="scott-storch-teaches-music-production"
                  component={CoursePreview}
                  onEnter={this.scrollRestore}
                />
              </Route>
              <Route path="courses">
                <Route
                  path="scott-storch-teaches-music-production"
                  component={CourseViewer}
                  onEnter={this.scrollRestore}
                />
              </Route>
            </Route>
          </Router>
        </Suspense>
      </Provider>
    );
  }
}
