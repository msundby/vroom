import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet,Image, ScrollView } from 'react-native';
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';


const Register: React.FC = () => {

  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [driversLicenseImg, setDriversLicenseImg] = useState<string | null>(null);

  const pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImg(result.assets[0].uri);
    }
  };

  const pickDriversLicenseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setDriversLicenseImg(result.assets[0].uri);
    }
  };

  return (
  

    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      
      <View style={styles.backgroundContainer}>
        <TouchableOpacity onPress={pickProfileImage}>
          {
          profileImg ? 
          (<Image source={{ uri: profileImg }} style={styles.addedPhoto} />) 
          : 
          (<Image source={require('../../assets/AddProfileImageGold.png')} style={styles.addPhoto} />)
          }
        </TouchableOpacity>
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
      <View style={styles.container}>

      <Button title="Upload Driver's License" onPress={pickDriversLicenseImage} />
      {driversLicenseImg && <Image source={{ uri: driversLicenseImg }} style={styles.image} />}
      </View>

        <View style={styles.button}>
        <Button
      title="Register"
      onPress={() => {
        console.log('Button pressed');
      }} />
      </View>
      
      </View>
      </View>
      
    </ScrollView>
  );
};












const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  addedPhoto: {
    width: 100, 
    height: 100,
    borderRadius: 20 
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
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Register;