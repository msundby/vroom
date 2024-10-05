import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CarsCollection from './src/pages/CarsCollection';
import LoginComponent from './src/pages/Login';
import Register from './src/pages/Register';
import NavBar from './src/components/NavBar';
import Profile from './src/pages/Profile'
import Booking from './src/pages/Booking';
import { RootStackParamList } from './src/navigation/types';

const Stack = createStackNavigator<RootStackParamList>();
const clear = AsyncStorage.clear();

const App: React.FC = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="CarsCollection">
          <Stack.Screen name="CarsCollection" component={CarsCollection} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false}}></Stack.Screen>
          <Stack.Screen name="Login" component={LoginComponent} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Booking" component={Booking} options={{ headerShown: false }} />
        </Stack.Navigator>
      <NavBar />
    </NavigationContainer>
  );
}

export default App;