import { StyleSheet, Text, View } from 'react-native'
import {Car } from '../pages/CarsCollection'


interface CarCardProps {
    car: Car,
    carCardOptions: {
        showPrice: boolean;
        showAvailability: boolean;
        shinyBorder: boolean;
    }
}

export default function CarCard(Props: CarCardProps) {

  return (
    <View style={styles.cardWrapper}>
        <View style={styles.cardContents}>
            <Text>{Props.car.model}</Text>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    cardWrapper: {

    },
    cardContents: {

    }
})