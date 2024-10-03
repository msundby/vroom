import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Car } from '../pages/CarsCollection';

/*
const car = {
    id: '1',
    make: 'Toyota',
    model: 'Corolla',
    year: 2019,
    price: 20000,
    image: 'https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2021/corolla/1J9/1.png?q=85&fm=jpg&w=1024&fit=max&cs=strip&bg=fff',
    description: 'The 2021 Toyota Corolla is a compact sedan that seats five passengers. It is available in five trim levels: L, LE, SE, XLE and XSE. The Corolla is powered by a 1.8-liter four-cylinder engine (139 horsepower, 126 lb-ft of torque) or a 2.0-liter four-cylinder engine (169 hp, 151 lb-ft of torque).', 
    color: 'Red',
};
*/

interface CarInformationProps {
    car: Car;
}

const CarInformation: React.FC<CarInformationProps> = ({car}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{car.make} {car.model}</Text>
            <Text style={styles.label}>Year: {car.year}</Text>
            <Text style={styles.label}>Price: ${car.price}</Text>
            <Text style={styles.label}>Description:</Text>
            <Text>{car.description}</Text>
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
  });
  
  export default CarInformation;
