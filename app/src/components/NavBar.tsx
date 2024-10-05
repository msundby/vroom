import React from 'react';
import { Image, View, StyleSheet, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../navigation/types';

const NavBar: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    
    const homeIcon: string = '../../assets/icons/home-icon.png';
    const bookingsIcon: string = '../../assets/icons/bookings-icon.png';
    const profileIcon: string = '../../assets/icons/wheel-icon.png';

    const handleRoute = async (destination: keyof RootStackParamList) => {
        try {
            const userData = await AsyncStorage.getItem('@logged_user');
            if (!userData) {
                navigation.navigate('Login', { redirectTo: destination });
            } else {
                if (destination === 'CarsCollection' || destination === 'Register') {
                    navigation.navigate(destination);
                } else if (destination === 'Profile') {
                navigation.navigate('Profile');
                } else if (destination === 'MyBookings') {
                    navigation.navigate('MyBookings');
                }
            }
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    }

    return (
        <View style={styles.navbar}>
                <Pressable 
                    onPress={() => handleRoute('CarsCollection')} 
                    style={styles.navButton} 
                    >
                    <Image source={require(homeIcon)} style={styles.icon}  />
                </Pressable>
                <View style={styles.divider} />
                <Pressable 
                    onPress={() => handleRoute('MyBookings')} 
                    style={styles.navButton} 
                    >
                    <Image source={require(bookingsIcon)} style={styles.icon} />
                </Pressable>
                <View style={styles.divider} />
                <Pressable 
                    onPress={() => handleRoute('Profile')} 
                    style={styles.navButton}
                    >
                    <Image source={require(profileIcon)} style={styles.icon} />
                </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 58,
        backgroundColor: '#2c2c2e',
        borderTopWidth: 1,
        borderTopColor: '#b8860b',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    navButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    icon: { 
        height: 18,
        tintColor: '#b8860b',
        resizeMode: 'contain',
    },
    divider: {
        width: 1, 
        height: '40%', 
        backgroundColor: '#3a3a3c',
    }
});

export default NavBar;
