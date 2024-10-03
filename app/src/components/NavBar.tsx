import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

const NavBar: React.FC = () => {
    const navigation = useNavigation();

    const homeIcon: string = '../../assets/icons/home-icon.png';
    const bookingsIcon: string = '../../assets/icons/bookings-icon.png';
    const profileIcon: string = '../../assets/icons/wheel-icon.png';

    return (
        <View style={styles.navbar}>
            <TouchableOpacity style={styles.button} >
                <Image source={require(homeIcon)} width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} >
                <Image source={require(bookingsIcon)} width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} >
                <Image source={require(profileIcon)} width={24} height={24} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
});

export default NavBar;