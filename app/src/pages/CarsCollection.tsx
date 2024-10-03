import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CarCard from '../components/CarCard';

export interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    available: boolean;
}

const CarsCollection: React.FC = () => {
    const navigation = useNavigation();
    const [carCollectionArray, setCarCollectionArray] = useState<Car[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchCarData = async () => {
        try {
            console.log("Fetching car data...");
            const carData: Car[] = require('../../assets/cars/cars.json');
            console.log("Car data fetched");
            setCarCollectionArray(carData);
        } catch (error) {
          console.error("Error fetching car data:", error);
          setError("Error fetching car data");
        }
      };
    
    useEffect(() => {
        fetchCarData();
    }, []);

    if (error) {
        return (
            <View style={styles.container}>
                <Text>{error}</Text>
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
            <View style={styles.container}>
            {carCollectionArray.length > 0 ? (
                carCollectionArray.map((car: Car) => (
                    <CarCard
                    key={car.id} 
                    car={car} 
                    carCardOptions={{ showPrice: true, showAvailability: true, shinyBorder: true }}  />
                ))
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default CarsCollection;

const styles = StyleSheet.create({
    safeArea: {
        paddingTop: StatusBar.currentHeight,
    },
    container: {
        paddingTop: 50,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2c2c2e',
        width: '100%',
        gap: 10,
    }
});