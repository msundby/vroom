import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, RouteProp, useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';


const Register: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [user, setUser] = useState({
    id: '', 
    name: '', 
    address: '', 
    password: '', 
    email: '', 
    driverLicenseNumber: '', 
    phoneNumber: '', 
    profileImagePath: '', 
    driverLicenseImage: ''
  });

  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [driversLicenseImg, setDriversLicenseImg] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  if(user == null){

  }

  const storeUser = async (id: number, name: string, address: string, password: string, email: string, driverLicenseNumber: number, phoneNumber:number, profileImagePath: string, driverLicenseImage: string ) => {
    const user = {
      id: id,
      name: name,
      address: address,
      password: password,
      email: email,
      driverLicenseNumber: driverLicenseNumber,
      phoneNumber: phoneNumber,
      profileImagePath: profileImagePath,
      driverLicenseImage: driverLicenseImage
    };
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      console.log('Test user stored successfully');
    } catch (error) {
      console.error('Error storing test user:', error);
    }
  };

  const pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImg(result.assets[0].uri);
      setUser((prevUser) => ({ ...prevUser, profileImagePath: result.assets[0].uri }));
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
      setUser((prevUser) => ({ ...prevUser, driverLicenseImage: result.assets[0].uri }));
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
          value={user.name}
          onChangeText={(text) => setUser((prevUser) => ({ ...prevUser, name: text }))}
            
        />
        <TextInput
          placeholder="Address"
          style={styles.input}
          placeholderTextColor="white"
          value={user.address}
          onChangeText={(text) => setUser((prevUser) => ({ ...prevUser, address: text }))}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          placeholderTextColor="white"
          value={user.password}
          onChangeText={(text) => setUser((prevUser) => ({ ...prevUser, password: text }))}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="white"
          value={user.email}
          onChangeText={(text) => setUser((prevUser) => ({ ...prevUser, email: text }))}
        />
        <TextInput
          placeholder="Driver License Number"
          style={styles.input}
          placeholderTextColor="white"
          value={user.driverLicenseNumber.toString()}
          onChangeText={(text) => setUser((prevUser) => ({ ...prevUser, driverLicenseNumber: text }))}
        />
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          placeholderTextColor="white"
          value={user.phoneNumber.toString()}
          onChangeText={(text) => setUser((prevUser) => ({ ...prevUser, phoneNumber: text }))}
        />     
        <View style={styles.button}>
        
        <Button title="Upload Driver's License" onPress={pickDriversLicenseImage} />
        <View style={styles.containerImage}>
          {driversLicenseImg && <Image source={{ uri: driversLicenseImg }} style={styles.image} />}
          </View>
        </View>

        {showSuccessMessage && (
        <View style={styles.successMessageBox}>
          <Text style={styles.successMessageText}>User created successfully!</Text>
        </View>
      )}

        <View style={styles.button}>
        <Button
          title="Register"
          onPress={() => {
            storeUser(
              1, 
              user.name, 
              user.address, 
              user.password, 
              user.email, 
              parseInt(user.driverLicenseNumber), 
              parseInt(user.phoneNumber), 
              user.profileImagePath, 
              user.driverLicenseImage);

              setShowSuccessMessage(true);

              setTimeout(()=>{
                  navigation.navigate('Login')
                  
              
              }, 1000)
      }} />
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
  containerImage: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  backgroundContainer: {
    width: '100%',
    alignItems: 'center',
    padding: '2%'
  },
  successMessageBox: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  successMessageText: {
    color: 'white',
    textAlign: 'center'
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
    backgroundColor: '#3a3a3c',
    color: 'white'
  },
  button: {
    marginTop: 5,
    marginBottom: 20
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Register;