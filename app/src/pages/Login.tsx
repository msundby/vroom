import React from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

const LoginComponent: React.FC = () => {
    return (
      <View style={styles.loginContainer}>
        <View style={styles.loginBox}>
          <TextInput
            style={styles.inputField}
            placeholder="Username"
          />
          <TextInput
            style={styles.inputField}
            placeholder="Password"
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.loginLink}>Forgot password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.signupLink}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity>
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