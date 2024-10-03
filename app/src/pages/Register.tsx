import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';


const Register: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Full name"
          style={styles.input}
          placeholderTextColor="white"
        />
        <TextInput
          placeholder="Address"
          style={styles.input}
          placeholderTextColor="white"
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="white"
        />
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          placeholderTextColor="white"
        />
        <TextInput
          placeholder="Driver License Number"
          style={styles.input}
          placeholderTextColor="white"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    backgroundColor: '#2c2c2e'
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    color: "white"
  },
  form: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#b8860b',
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#3a3a3c'
  },
});

export default Register;