import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Car } from '../components/Car';
import { RouteProp } from '@react-navigation/native';

// Define the pparameter list type for your stack
type RootStackParamList = {
    CarInformation: { car: Car };
};
type CarInformationRouteProp = RouteProp<RootStackParamList, 'CarInformation'>;

interface CarInformationProps {
  route: CarInformationRouteProp
};

const CarInformation: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'CarInformation'>>();
  const { car } = route.params;
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Car Information</Text>
          <Text style={styles.label}>Make: {car.make}</Text>
          <Text style={styles.label}>Model: {car.model}</Text>
          <Text style={styles.label}>Year: {car.year}</Text>
          <Text style={styles.label}>Price: ${car.price}</Text>
          <Text style={styles.label}>Availability: {car.available ? 'Available' : 'Not Available'}</Text>
          <Text style={styles.description}>Description: {car.description}</Text>
        </View>
    );
       
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    label: {
      fontSize: 18,
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      marginTop: 20,
    },
  });
  
  export default CarInformation;
