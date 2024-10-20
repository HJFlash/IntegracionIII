import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const MyCalendar = () => {
  const { date } = useLocalSearchParams();  // Obtener la fecha seleccionada

  // Horarios disponibles para el día seleccionado
  const availableHours = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Horas disponibles para {date}</Text>
      <ScrollView contentContainerStyle={styles.hoursContainer}>
        {availableHours.map((hour) => (
          <View key={hour} style={styles.hourBlock}>
            <Text style={styles.hourText}>{hour}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e8f0f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4682b4',
  },
  hoursContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  hourBlock: {
    backgroundColor: '#4682b4',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  hourText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default MyCalendar;
