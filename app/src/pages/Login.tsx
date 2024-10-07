import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../interfaces/User';
import { useRoute, RouteProp, useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type LoginRouteProp = RouteProp<RootStackParamList, 'Login'>;

const LoginComponent: React.FC = () => {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [storedUser, setStoredUser] = useState<User | null>(null);

  const route = useRoute<LoginRouteProp>();
  const { redirectTo, car } = route.params || {};
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('@user');
        if (userData) {
          setStoredUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
    
  }, []);

  navigation.addListener('focus', () => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('@user');
        if (userData) {
          setStoredUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }; 
    
    fetchUser();
  });

  const handleLogin = async () => {
    if (storedUser) {
      if (username === storedUser.name && password === storedUser.password) {
        await AsyncStorage.setItem('@logged_user', JSON.stringify(storedUser));
        Alert.alert('Success', 'Logged in successfully!');
        if (redirectTo === 'Booking' && car) {
          navigation.navigate('Booking', { car });
        } else {
          navigation.navigate('CarsCollection');
        }
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    } else {
      Alert.alert('Error', 'No registered user found. Please register first.');
    }
  };

    return (
      <View style={styles.loginContainer}>
        <View style={styles.loginBox}>
          <TextInput
            style={styles.inputField}
            placeholder="Username"
            placeholderTextColor="white"
            value={username}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="white"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.forgotPassword} onPress={() => {
              Alert.alert('Holdkæft hvor er du dum at glemme dit password!')
          }}>
            <Text style={styles.loginLink}>Forgot password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.signupLink}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Register')
            }}>
              <Text style={styles.loginLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  export default LoginComponent;

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c2c2e',
      },

      loginBox: {
        alignItems: 'center',
        backgroundColor: '#2c2c2e', 
        padding: 20,
        borderRadius: 10,
      },

      inputField: {
        width: 300,
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 16,
        backgroundColor: '#3a3a3c',
        borderColor: '#b8860b',
        color: 'white'
      },

      forgotPassword: {
        alignSelf: 'flex-end',
        marginVertical: 5,
      },

      loginButton: {
        backgroundColor: '#b8860b',
        padding: 15,
        width: '100%',
        borderRadius: 5,
        fontSize: 18,
        marginTop: 10,
        alignItems: 'center',
      },

      loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold'
      },

      signupLink: {
        marginTop: 10,
        flexDirection: 'row',
      },

      loginLink: {
        color: '#b8860b',
      },

      signupText: {
        color: 'white'
      }
})