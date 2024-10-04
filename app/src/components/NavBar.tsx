import React from 'react';
import { Image, View, StyleSheet, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavBar: React.FC = () => {
    const navigation = useNavigation();

    const homeIcon: string = '../../assets/icons/home-icon.png';
    const bookingsIcon: string = '../../assets/icons/bookings-icon.png';
    const profileIcon: string = '../../assets/icons/wheel-icon.png';

    return (
        <View style={styles.navbar}>
            <TouchableHighlight 
                style={styles.navButton} 
                onPress={() => navigation.navigate('CarsCollection')} 
                underlayColor={'#3a3a3c'} 
                >
                <Image source={require(homeIcon)} style={styles.icon}  />
            </TouchableHighlight>
            <View style={styles.divider} />
            <TouchableHighlight 
                style={styles.navButton} 
                onPress={() => navigation.navigate('Register')} 
                underlayColor={'#3a3a3c'} 
                >
                <Image source={require(bookingsIcon)} style={styles.icon} />
            </TouchableHighlight>
            <View style={styles.divider} />
            <TouchableHighlight 
                style={styles.navButton} 
                onPress={() => navigation.navigate('Profile')} 
                underlayColor={'#3a3a3c'}
                >
                <Image source={require(profileIcon)} style={styles.icon} />
            </TouchableHighlight>
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
