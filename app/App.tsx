import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CarsCollection from './src/pages/CarsCollection';
import NavBar from './src/components/NavBar';


const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CarsCollection">
        <Stack.Screen name="CarsCollection" component={CarsCollection} options={{ headerShown: false }} />
      </Stack.Navigator>
      <NavBar />
    </NavigationContainer>
  );
}

export default App;