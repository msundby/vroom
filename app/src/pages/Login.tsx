import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../interfaces/User';
import { useNavigation } from '@react-navigation/native';

const LoginComponent: React.FC = () => {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [storedUser, setStoredUser] = useState<User | null>(null);

  const navigation = useNavigation();

  const storeTestUser = async () => {
    const testUser = {
      name: 'lasse',
      adress: '123 Main St',
      password: '1234',
      email: 'john.doe@example.com',
      driverLicenseNumber: 123456,
      phoneNumber: 9876543210,
      profileImagePath: null
    };
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(testUser));
      console.log('Test user stored successfully');
    } catch (error) {
      console.error('Error storing test user:', error);
    }
  };
  
  // Run this function by calling it from inside your component's useEffect, like:
  useEffect(() => {
    storeTestUser();
  }, []);
  

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

  const handleLogin = () => {
    if (storedUser) {
      if (username === storedUser.name && password === storedUser.password) {
        Alert.alert('Success', 'Logged in successfully!');
        navigation.navigate('CarsCollection');
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