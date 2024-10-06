import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView, StatusBar, Modal, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type BookingRouteProp = RouteProp<RootStackParamList, 'Booking'>;

const Booking: React.FC = () => {
  const route = useRoute<BookingRouteProp>();
  const { car } = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [customerID, setCustomerID] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [tempDate, setTempDate] = useState<Date | undefined>(undefined); 
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [pickerType, setPickerType] = useState<'start' | 'end'>('start');

  const [inputPosition, setInputPosition] = useState({ top: 0, left: 0, width: 0 });

  const startDateRef = useRef<TouchableOpacity>(null);
  const endDateRef = useRef<TouchableOpacity>(null);

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@logged_user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setCustomerID(user.id !== undefined && user.id !== null ? user.id: ''); 
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error("Error fetching logged user:", error);
        Alert.alert("Error", "Unable to retrieve user information. Please log in again.");
        navigation.navigate('Login'); 
      }
    };

    fetchLoggedUser(); 
  }, [navigation]);

  const calculateInputPosition = (ref: React.RefObject<TouchableOpacity>) => {
    ref.current?.measure((fx, fy, width, height, px, py) => {
      setInputPosition({ top: py + height, left: px, width: width });
    });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTempDate(selectedDate); 
    }
  };

  const handleStartDatePress = () => {
    setPickerType('start');
    setTempDate(startDate || new Date());
    calculateInputPosition(startDateRef);
    setShowPicker(true);
  };

  const handleEndDatePress = () => {
    setPickerType('end');
    setTempDate(endDate || new Date());
    calculateInputPosition(endDateRef);
    setShowPicker(true);
  };

  const handleConfirmBooking = async () => {
    if (!startDate || !endDate) {
      Alert.alert("Invalid Booking", "Please select both start and end dates.");
      return;
    }

    const totalPrice = calculateTotalPrice(car.price, startDate, endDate);

    try {
      const existingBookings = await AsyncStorage.getItem('@bookings');
      const parsedBookings = existingBookings ? JSON.parse(existingBookings) : [];
      const carID = car.id;
      const nextBookingID = parsedBookings.length > 0 ? parsedBookings[parsedBookings.length - 1].bookingID + 1 : 0;

      const booking = {
        bookingID: nextBookingID,
        customerID,
        carID,
        carModel: car.model,
        startDate: startDate.toDateString(),
        endDate: endDate.toDateString(),
        totalPrice,
      };

      const updatedBookings = [...parsedBookings, booking];

      await AsyncStorage.setItem('@bookings', JSON.stringify(updatedBookings));

      Alert.alert("Booking Confirmed", `Your booking for ${car.model} has been saved with ID: ${nextBookingID}!`);
    } catch (error) {
      console.error("Error saving booking:", error);
      Alert.alert("Error", "There was an issue saving your booking. Please try again.");
    }
  };

  const handleDatePickerConfirm = () => {
    if (pickerType === 'start') {
      setStartDate(tempDate); 
    } else if (pickerType === 'end') {
      setEndDate(tempDate); 
    }
    setShowPicker(false); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.heading}>
            Book {car.make} {car.model}
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={handleStartDatePress}
              ref={startDateRef}
            >
              <Text style={styles.dateButtonText}>{startDate ? startDate.toDateString() : 'Select Start Date'}</Text>
              <Feather name="calendar" size={20} color="#b8860b" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>End Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={handleEndDatePress}
              ref={endDateRef}
            >
              <Text style={styles.dateButtonText}>{endDate ? endDate.toDateString() : 'Select End Date'}</Text>
              <Feather name="calendar" size={20} color="#b8860b" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Total Price</Text>
            <Text style={styles.priceText}>
              {startDate && endDate ? `$${calculateTotalPrice(car.price, startDate, endDate)}` : '$0'}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.button, !(startDate && endDate) && styles.buttonDisabled]}
            onPress={handleConfirmBooking}
            disabled={!(startDate && endDate)}
          >
            <Text style={styles.buttonText}>Confirm Booking</Text>
          </TouchableOpacity>

          {showPicker && (
            <Modal transparent={true} animationType="fade">
              <View
                style={[
                  styles.modalContainer,
                  {
                    top: inputPosition.top,
                    left: inputPosition.left,
                    width: inputPosition.width,
                  },
                ]}
              >
                <View style={styles.modalContent}>
                  <DateTimePicker
                    value={tempDate || new Date()}
                    mode="date"
                    display="spinner"
                    textColor="white"
                    onChange={handleDateChange}
                    style={styles.datePicker}
                  />
                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setShowPicker(false)}>
                      <Text style={styles.modalButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={handleDatePickerConfirm}>
                      <Text style={styles.modalButtonText}>OK</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const calculateTotalPrice = (pricePerDay: number, start: Date, end: Date) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(Math.abs((end.getTime() - start.getTime()) / oneDay)) + 1;
  return (pricePerDay * diffDays).toFixed(2);
};

export default Booking;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2c2c2e',
    paddingTop: StatusBar.currentHeight,
  },
  scrollContainer: {
    paddingBottom: 58,
  },
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#2c2c2e',
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#b8860b',
  },
  inputGroup: {
    marginVertical: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#b8860b',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#b8860b',
    borderRadius: 8,
    backgroundColor: '#3a3a3c',
  },
  dateButtonText: {
    color: 'white',
    fontSize: 16,
  },
  priceText: {
    fontSize: 24,
    color: 'white',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#b8860b',
    marginTop: 30,
  },
  buttonDisabled: {
    backgroundColor: '#8b6e0b',
  },
  buttonText: {
    color: '#2c2c2e',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    position: 'absolute',
    backgroundColor: '#2c2c2e',
    borderWidth: 2,
    borderColor: '#b8860b',
    borderRadius: 10,
    padding: 10,
    elevation: 10,
  },
  modalContent: {
    backgroundColor: '#2c2c2e',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#b8860b',
    marginHorizontal: 5, 
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#2c2c2e',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  datePicker: {
    backgroundColor: '#3a3a3c',
  },
});
