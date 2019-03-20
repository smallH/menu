import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { AuthScreen, MenuListScreen, FoodScreen } from './components';

var wilddog = require('wilddog');
const navigator = createStackNavigator(
  {
    Auth: { screen: AuthScreen },
    MenuList: { screen: MenuListScreen },
    Food: { screen: FoodScreen }
  },
  {
    initialRouteName: 'Auth'
  }
);

const AppNavigatorContainer  = createAppContainer(navigator);
class App extends Component {
    UNSAFE_componentWillMount() {
      wilddog.initializeApp({
        authDomain: 'wd7987125199skghmy.wilddog.com',
        syncURL: 'https://wd7987125199skghmy.wilddogio.com/'
      });
    }

    render() {
      return (
        <Provider store={createStore(reducers, {}, applyMiddleware(thunk))}>
          <AppNavigatorContainer />
        </Provider>
      );
  }
}

export default App;