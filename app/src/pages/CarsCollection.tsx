import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import CarCard from '../components/CarCard';
import { Car } from '../interfaces/Car';
import { RootStackParamList } from '../navigation/types';

const CarsCollection: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const handleViewDetails = (car: Car) => {   
        navigation.navigate('CarInformation', { car });
    }
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
                    carCardOptions={{ showPrice: true, showAvailability: true, shinyBorder: true }}
                    onViewDetails={() => handleViewDetails(car)}     
                    />
                    
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
        backgroundColor: '#2c2c2e',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        gap: 10,
        paddingTop: 12,
    }
});