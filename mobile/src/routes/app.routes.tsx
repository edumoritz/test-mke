import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Register from '../pages/Register';
import Category from '../pages/Category';
import Search from '../pages/Search';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#C0C0C0'}
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Register" component={Register} />
    <App.Screen name="Category" component={Category} />
    <App.Screen name="Search" component={Search} />
  </App.Navigator> 
);

export default AppRoutes;