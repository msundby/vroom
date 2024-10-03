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
            <TouchableOpacity >
                <Image source={require(homeIcon)} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity >
                <Image source={require(bookingsIcon)} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity >
                <Image source={require(profileIcon)} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#2c2c2e',
        borderTopWidth: 1,
        borderTopColor: '#b8860b',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    icon: {
        width: 18,
        height: 18,
        tintColor: '#b8860b',
    }
});

export default NavBar;