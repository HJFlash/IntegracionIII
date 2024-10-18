import React from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const MyCalendar = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Calendar
        // Fecha inicial
        current={'2024-10-18'}
        // Función llamada cuando se selecciona un día
        onDayPress={(day) => {
          console.log('Día seleccionado', day);
        }}
        // Marca algunas fechas como seleccionadas
        markedDates={{
          '2024-10-18': { selected: true, marked: true, selectedColor: 'blue' },
          '2024-10-19': { marked: true, dotColor: 'red', activeOpacity: 0 },
          '2024-10-20': { disabled: true, disableTouchEvent: true },
        }}
      />
    </View>
  );
};

export default MyCalendar;
