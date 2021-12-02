import React from 'react';
import Navigation from './src/pages';
import {InitialProvider} from './src/context/Initial';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './src/redux/reducers';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();
const store = createStore(allReducers);
const App = () => {
  return (
    <Provider store={store}>
      <InitialProvider>
        <Navigation />
      </InitialProvider>
    </Provider>
  );
};

export default App;
