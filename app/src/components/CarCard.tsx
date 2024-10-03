import { StyleSheet, Text, View, Image } from 'react-native'
import { Car } from '../pages/CarsCollection'
import Button from '../components/Button'


interface CarCardProps {
    car: Car,
    carCardOptions: {
        showPrice: boolean;
        showAvailability: boolean;
        shinyBorder: boolean;
    }
}

export default function CarCard(Props: Readonly<CarCardProps>) {

  return (
    <View style={styles.cardWrapper}>
        <View style={styles.cardContents}>
            <Image source={require('../../assets/cars/images/no-image.jpg')} style={styles.carImage} />
            <View style={styles.cardText}>
                <Text style={styles.cardHeading}>{Props.car.make} {Props.car.model}</Text>
                <Text style={styles.cardSubHeading}>{Props.car.year}</Text>
                <Text style={styles.carDescription}>Dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut libero malesuada feugiat. Curabitur aliquet quam id dui posuere blandit.</Text>
            </View>
        </View>
        <View style={styles.cardFooter}>
            <View style={styles.buttonContainer}>
                <Button title="View Details" onPress={() => {}} />
                <Button title="Book Now" onPress={() => {}} />
            </View>
            <Text style={styles.priceText}>Price: {Props.car.price} $</Text>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    cardWrapper: {
        display: 'flex',
        width: '90%',
        maxWidth: 400,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#3a3a3c',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardContents: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
    },
    carImage: {
        width: 100,
        height: 100,
        borderRadius: 3,
        resizeMode: 'stretch',
        marginRight: 10,
    },
    carDescription: {
        fontSize: 12,
        color: 'darkgray',
        flexWrap: 'wrap',
        flex: 1,
    },
    cardText: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    cardHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#b8860b',
    },
    cardSubHeading: {
        fontSize: 14,
        color: 'gray',
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 2,
        gap: 10,
    },
    priceText: {
        flex: 1,
        textAlign: 'right',
        fontWeight: 'bold',
        color: 'white',
    }
})