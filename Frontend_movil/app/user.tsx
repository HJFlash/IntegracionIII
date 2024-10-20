import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const SelectServiceScreen: React.FC = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();

  const handleCalendarPress = () => {
  if (selectedDate) {
    router.push({
      pathname: '/calendar',
      params: { date: selectedDate.toISOString().split('T')[0] }  // Pasar solo la fecha en formato YYYY-MM-DD
    });
  }
};


  // Manejar la selección de la fecha
  const onDateChange = (event: any, selectedDateValue?: Date) => {
    setShowDatePicker(false);
    if (selectedDateValue) {
      setSelectedDate(selectedDateValue);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.circle} />
        <Text style={styles.username}>NombreUser</Text>
        <TouchableOpacity style={styles.searchIcon} />
      </View>

      {/* Select Service */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Seleccionar Servicio</Text>
        <Picker
          selectedValue={selectedService}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedService(itemValue)}
        >
          <Picker.Item label="Selecciona un servicio" value="" />
          <Picker.Item label="Podología" value="Podología" />
          <Picker.Item label="Peluquería" value="Peluquería" />
          <Picker.Item label="Fonoaudiología" value="Fonoaudiología" />
          <Picker.Item label="Asesoría Jurídica" value="Asesoría Jurídica" />
        </Picker>
      </View>

      {/* Select Date */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Seleccionar día</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.inputText}>{selectedDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
          minimumDate={new Date()}  // No permitir fechas anteriores al día actual
        />
      )}

      {/* Button to navigate to Calendar */}
      <TouchableOpacity style={styles.calendarButton} onPress={handleCalendarPress}>
        <Text style={styles.calendarText}>Ver Calendario</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Enviar</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f0f8',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  circle: {
    width: 40,
    height: 40,
    backgroundColor: '#ff4d4d',
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchIcon: {
    width: 25,
    height: 25,
    backgroundColor: '#fff',
    borderRadius: 12.5,
  },
  inputContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4682b4',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    color: '#4682b4',
    marginBottom: 5,
    textAlign: 'center',
  },
  input: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  calendarButton: {
    backgroundColor: '#4682b4',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  calendarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SelectServiceScreen;
