import React from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

const LoginComponent = () => {
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
            <Text style={styles.forgotPasswordText}>Forgot password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.signupLink}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.signupText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footerMenu}>
          <View style={styles.footerItem}>
            <Text style={styles.footerIcon}>🚗</Text>
            <Text>Browse Cars</Text>
          </View>
          <View style={styles.footerItem}>
            <Text style={styles.footerIcon}>📅</Text>
            <Text>View Bookings</Text>
          </View>
          <View style={[styles.footerItem, styles.activeFooterItem]}>
            <Text style={styles.footerIcon}>⚙️</Text>
            <Text>Profile</Text>
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
        backgroundColor: '#808080', // Gray background
      },

      loginBox: {
        alignItems: 'center',
        backgroundColor: '#ccc', // Lighter gray for input fields
        padding: 20,
        borderRadius: 10,
      },

      inputField: {
        width: 300,
        padding: 15,
        marginVertical: 10, // margin-top and margin-bottom combined
        borderRadius: 5,
        borderWidth: 0, // React Native doesn't have 'border: none', so use borderWidth: 0
        fontSize: 16,
        backgroundColor: '#fff', // Add a background color to make input visible
      },

      forgotPassword: {
        alignSelf: 'flex-end',
        marginVertical: 5,
      },

      forgotPasswordText: {
        color: 'blue',
      },

      loginButton: {
        backgroundColor: '#ddd', // Slightly darker than inputs
        padding: 15,
        width: '100%', // React Native uses percentage strings
        borderRadius: 5,
        fontSize: 18,
        marginTop: 10,
        alignItems: 'center', // Center text in the button
      },

      loginButtonText: {
        fontSize: 18,
      },

      signupLink: {
        marginTop: 10,
        flexDirection: 'row',
      },

      signupText: {
        color: 'blue',
      },

      footerMenu: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#d3d3d3', // Light gray
        width: '100%',
        justifyContent: 'space-around',
        padding: 10,
      },

      footerItem: {
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 12,
      },

      footerIcon: {
        fontSize: 24,
        marginBottom: 5,
      },

      activeFooterItem: {
        color: 'black',
      }
})