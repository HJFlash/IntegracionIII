import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const SelectServiceScreen: React.FC = () => {
  const { selectedHour } = useLocalSearchParams(); // Obtener la hora seleccionada de los parámetros
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
        params: { date: selectedDate.toISOString().split('T')[0] },
      });
    }
  };

  const onDateChange = (event: any, selectedDateValue?: Date) => {
    setShowDatePicker(false);
    if (selectedDateValue) {
      setSelectedDate(selectedDateValue);
    }
  };

  const confirmAppointment = () => {
    if (!selectedService || !selectedDate || !selectedHour) {
      Alert.alert('Error', 'Por favor selecciona un servicio, un día y una hora.');
      return;
    }
    Alert.alert(
      'Confirmación',
      `Tu cita para ${selectedService} ha sido agendada el ${selectedDate.toLocaleDateString(
        'es-ES'
      )} a las ${selectedHour}.`
    );
  };

  const cancelAppointment = () => {
    router.back(); // Retroceder a la página anterior
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Selección de servicio */}
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
          containerStyle={styles.pickerContainer}
        />
      </View>

      {/* Selección de fecha */}
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

      {/* Mostrar la hora seleccionada solo si existe */}
      {selectedHour && (
        <View style={styles.selectedHourContainer}>
          <Text style={styles.selectedHourText}>Hora seleccionada: {selectedHour}</Text>
        </View>
      )}

      {/* Botón para ver el calendario */}
      <TouchableOpacity style={styles.calendarButton} onPress={handleCalendarPress}>
        <Text style={styles.calendarText}>Ver Calendario</Text>
      </TouchableOpacity>

      {/* Mostrar botones solo si hay una hora seleccionada */}
      {selectedHour && selectedHour !== '' && (
        <View style={styles.actionButtonsContainer}>
          {/* Botón de confirmación */}
          <TouchableOpacity style={styles.confirmButton} onPress={confirmAppointment}>
            <Text style={styles.confirmText}>Confirmar Hora</Text>
          </TouchableOpacity>

          {/* Botón de cancelar */}
          <TouchableOpacity style={styles.cancelButton} onPress={cancelAppointment}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
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
  },
  label: {
    fontSize: 18,
    color: '#4682b4',
    marginBottom: 5,
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
  },
  pickerContainer: {
    width: '100%',
  },
  picker: {
    height: 50,
  },
  selectedHourContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#d4edda',
    borderRadius: 5,
  },
  selectedHourText: {
    fontSize: 18,
    color: '#155724',
  },
  calendarButton: {
    marginTop: 20,
    backgroundColor: '#4682b4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  calendarText: {
    color: '#fff',
    fontSize: 18,
  },
  actionButtonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#32CD32',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
  },
  cancelButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#FF4500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SelectServiceScreen;
