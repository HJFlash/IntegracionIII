import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const SelectServiceScreen: React.FC = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Selecciona un servicio', value: '' },
    { label: 'Podología', value: 'Podología' },
    { label: 'Peluquería', value: 'Peluquería' },
    { label: 'Fonoaudiología', value: 'Fonoaudiología' },
    { label: 'Asesoría Jurídica', value: 'Asesoría Jurídica' },
  ]);
  const router = useRouter();

  const handleCalendarPress = () => {
    if (selectedDate) {
      router.push({
        pathname: '/horario',
        params: { date: selectedDate.toISOString().split('T')[0] }
      });
    }
  };

  const onDateChange = (event: any, selectedDateValue?: Date) => {
    setShowDatePicker(false);
    if (selectedDateValue) {
      setSelectedDate(selectedDateValue);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Select Service */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Seleccionar Servicio</Text>
        <DropDownPicker
          open={open}
          value={selectedService}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedService}
          setItems={setItems}
          style={styles.picker}
          placeholder="Selecciona un servicio"
        />
      </View>

      {/* Select Date */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Seleccionar día</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.inputText}>{selectedDate.toLocaleDateString('es-ES')}</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          onChange={onDateChange}
          minimumDate={new Date()}
          locale="es-ES"
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
