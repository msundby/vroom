import React from 'react';
import { View, Text, TextInput, StyleSheet,Image } from 'react-native';
import Button from '../components/Button';


const Register: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      
      <View style={styles.backgroundContainer}>
        <Image source={require('../../assets/AddProfileImageGold.png')} style={styles.addPhoto}/>
      </View>

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
        <View style={styles.button}>
        <Button
      title="Upload Drivers License"
      onPress={() => {
        console.log('Button pressed');
      }} />
        <View style={styles.button}>
        <Button
      title="Register"
      onPress={() => {
        console.log('Button pressed');
      }} />
      </View>
      
      </View>
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
  backgroundContainer: {
    width: '100%',
    alignItems: 'center',
    padding: '2%'
  },
  addPhoto: {
    width: 100, 
    height: 100, 
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    color: "white"
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 30,
    color: "white",
  },
  form: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#b8860b',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 2,
    backgroundColor: '#3a3a3c'
  },
  button: {
    marginTop: 20
  }
});

export default Register;