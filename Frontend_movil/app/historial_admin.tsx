import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar, BackHandler } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface Appointment {
  id: number;
  date: string;
  time: string;
  service: string;
}

// Datos ficticios de citas
const mockAppointments: { [userId: number]: Appointment[] } = {
  1: [
    { id: 1, date: '2024-11-01', time: '10:00 AM', service: 'Podología' },
    { id: 2, date: '2024-11-05', time: '2:00 PM', service: 'Fonoaudiología' },
  ],
  2: [
    { id: 3, date: '2024-11-03', time: '11:00 AM', service: 'Asesoría Jurídica' },
  ],
  3: [],
};

const AppointmentHistoryScreen: React.FC = () => {
  const router = useRouter();
  const { userId } = useLocalSearchParams();
  const appointments = mockAppointments[parseInt(userId as string)] || [];

  useEffect(() => {
    const backAction = () => {
      router.back();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Historial de Citas</Text>
      {appointments.length === 0 ? (
        <Text style={styles.noAppointments}>Este usuario no tiene citas programadas.</Text>
      ) : (
        <FlatList
          data={appointments}
          renderItem={({ item }) => (
            <View style={styles.appointmentItem}>
              <Text style={styles.appointmentText}>{`${item.date} - ${item.time}`}</Text>
              <Text style={styles.serviceText}>{item.service}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      )}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Volver a la selección de usuarios</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    width: '100%',
  },
  appointmentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  appointmentText: {
    fontSize: 18,
  },
  serviceText: {
    fontSize: 16,
    color: '#888',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  noAppointments: {
    fontSize: 18,
    color: '#888',
  },
});

export default AppointmentHistoryScreen;
