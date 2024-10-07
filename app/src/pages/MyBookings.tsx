import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { useRoute, RouteProp, useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Booking {
    bookingID: number,
    customerID: number,
    carID: number,
    carModel: string,
    startDate: string,
    endDate: string,
    totalPrice: string
}
type LoginRouteProp = RouteProp<RootStackParamList, 'MyBookings'>;

const MyBookings: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const storedBookings = await AsyncStorage.getItem('@bookings');
                const loggedUser = await AsyncStorage.getItem('@logged_user');
                if (storedBookings && loggedUser) {
                    const bookingsArray: Booking[] = JSON.parse(storedBookings);
                    const loggedUserObject = JSON.parse(loggedUser);
                    const userBookings = bookingsArray.filter(
                        (booking) => booking.customerID === loggedUserObject.id
                    );
                    setBookings(userBookings);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchBookings();
    }, []);
    
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.heading}>My Bookings</Text>
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <View key={booking.bookingID} style={styles.bookingCard}>
                                <Text style={styles.carModel}>{booking.carModel}</Text>
                                <Text style={styles.bookingDetails}>Booking ID: {booking.bookingID}</Text>
                                <Text style={styles.bookingDetails}>Date: {booking.startDate} - {booking.endDate}</Text>
                                <Text style={styles.bookingDetails}>Total Price: ${booking.totalPrice}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noBookingsText}>You have no bookings</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MyBookings;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#2c2c2e',
        paddingTop: StatusBar.currentHeight
    },
    scrollContainer: {
        paddingBottom: 58
    },
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: '#2c2c2e',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#b8860b',
    },
    bookingCard: {
        width: '100%',
        backgroundColor: '#3a3a3c',
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {width:0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.8,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#b8860b',
        borderRadius: 8
    },
    carModel: {
       color: '#b8860b', 
       fontSize: 20,
       fontWeight: 'bold',
       marginBottom:10
    },
    bookingDetails: {
        fontSize: 16,
        color: 'white',
        marginBottom: 5
    },
    noBookingsText: {
        fontSize: 18,
        color: 'white',
        marginTop: 20
    }
});