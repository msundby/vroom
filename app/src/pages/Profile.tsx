import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'react-native';

const Profile: React.FC = () => {
  const route = useRoute();
  const { username } = (route.params as { username: string }) || 'Guest';

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(username || 'Anders Andersen');
  const [address, setAddress] = useState('Andersvejen 1');
  const [email, setEmail] = useState('anders@and.dk');
  const [phoneNumber, setPhoneNumber] = useState('+45 12345678');
  const [driversLicenseNumber, setDriversLicenseNumber] = useState('123456789');
  const [driversLicenseImage, setDriversLicenseImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setDriversLicenseImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    // TODO opdater ændringer til profiles.json
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.heading}>Profile</Text>

          <TouchableOpacity 
            onPress={() => setIsEditing(!isEditing)} 
            style={styles.editIcon}
          >
            <Feather name="edit" size={24} color="#b8860b" />
          </TouchableOpacity>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={[styles.input, isEditing && styles.inputEditable]}
              value={name}
              onChangeText={setName}
              editable={isEditing}
              placeholder="Enter your name"
              placeholderTextColor="#b3b3b3"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, isEditing && styles.inputEditable]}
              value={address}
              onChangeText={setAddress}
              editable={isEditing}
              placeholder="Enter your address"
              placeholderTextColor="#b3b3b3"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, isEditing && styles.inputEditable]}
              value={email}
              onChangeText={setEmail}
              editable={isEditing}
              keyboardType="email-address"
              placeholder="Enter your email"
              placeholderTextColor="#b3b3b3"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[styles.input, isEditing && styles.inputEditable]}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              editable={isEditing}
              keyboardType="phone-pad"
              placeholder="Enter your phone number"
              placeholderTextColor="#b3b3b3"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Drivers License Number</Text>
            <TextInput
              style={[styles.input, isEditing && styles.inputEditable]}
              value={driversLicenseNumber}
              onChangeText={setDriversLicenseNumber}
              editable={isEditing}
              keyboardType="numeric"
              placeholder="Enter your drivers license number"
              placeholderTextColor="#b3b3b3"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Driver's License</Text>
            {driversLicenseImage ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: driversLicenseImage }} style={styles.image} resizeMode="contain" />
              </View>
            ) : (
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <Text style={styles.uploadButtonText}>Upload Driver's License</Text>
              </TouchableOpacity>
            )}
          </View>

          {isEditing && (
            <TouchableOpacity 
              style={styles.button}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2c2c2e',
    paddingTop: StatusBar.currentHeight
  },
  scrollContainer: {
    paddingBottom: 58,
  },
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#2c2c2e',
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#b8860b',
  },
  editIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  inputGroup: {
    marginVertical: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#b8860b',
  },
  input: {
    borderWidth: 1,
    borderColor: '#b8860b',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#3a3a3c',
    color: 'white',
  },
  inputEditable: {
    borderColor: '#d4af37',
    backgroundColor: '#444446',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#b8860b',
    marginTop: 30,
  },
  buttonText: {
    color: '#2c2c2e',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#b8860b',
    overflow: 'hidden',
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 5, 
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3, 
    borderRadius: 8, 
  },
  uploadButton: {
    padding: 15,
    backgroundColor: '#b8860b',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  uploadButtonText: {
    color: '#2c2c2e',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
