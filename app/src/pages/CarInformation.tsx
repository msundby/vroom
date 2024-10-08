import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';
import { Car } from '../interfaces/Car';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import { RootStackParamList } from '../navigation/types';

// Define the pparameter list type for your stack
type BookingRouteProp = RouteProp<RootStackParamList, 'CarInformation'>;

const CarInformation: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'CarInformation'>>();
  const route = useRoute<BookingRouteProp>();
  const { params } = route;
  const handleBookNow = async () => {
    try {
    const userData = await AsyncStorage.getItem('@logged_user');
    if (userData) {
        if (params?.car) {
            navigation.navigate('Booking', { car: params.car });
        } else {
            console.error('Car information is missing');
        }
    } else {
        navigation.navigate('Login', { redirectTo: 'Booking', car: params?.car });
    }
    } catch (error) {
    console.error('Error checking login status:', error);
    }
};
  
  if (!params || !params.car) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No car information found</Text>
      </View>
    );
  }

  const { car } = params;


    return (
        <View style={styles.container}>
          <Text style={styles.title}>Car Information</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={{ uri: car.image }} style={styles.carImage} />
          </TouchableOpacity>
          <Text style={styles.label}>Make: {car.make}</Text>
          <Text style={styles.label}>Model: {car.model}</Text>
          <Text style={styles.label}>Year: {car.year}</Text>
          <Text style={styles.label}>Price: ${car.price}</Text>
          <Text style={[styles.label, { color: car.available ? 'green' : 'red' }]}>
                Availability: {car.available ? 'Available' : 'Not Available'}
          </Text>
          <Text style={styles.description}>Description: {car.description}</Text>
          <TouchableOpacity style={styles.bookingButton}>
            <Button  title="Book Now" onPress={handleBookNow} />
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
              <View style={styles.modalBackground}>
                <TouchableOpacity style={styles.modalContainer} onPress={() => setModalVisible(false)}>
                  <Image source={{ uri: car.image }} style={styles.enlargedImage} />
                </TouchableOpacity>
              </View>
            </Modal>
        </View>

    );
       
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#2c2c2e',
      alignItems: 'center',
    },
    carImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
      resizeMode: 'stretch',
      marginRight: 10,
  },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#b8860b',
      marginTop: 20,
    },
    label: {
      fontSize: 18,
      marginBottom: 10,
      color: 'gray',
    },
    description: {
      fontSize: 16,
      marginTop: 20,
      color: 'white',
    },
    bookingButton: {
      marginTop: 20,
      width: '100%',
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)', // Transparent black background
    },
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    enlargedImage: {
      width: 300,
      height: 300,
      resizeMode: 'contain', // Ensure the image is fully visible and scaled appropriately
      borderRadius: 10,
    }
  });
  
  export default CarInformation;
