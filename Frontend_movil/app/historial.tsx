import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useRouter } from 'expo-router';

interface Appointment {
  id: number;
  date: string;
  time: string;
  service: string;
}

const AppointmentItem: React.FC<{ item: Appointment }> = ({ item }) => (
  <View style={styles.appointmentItem}>
    <Text style={styles.appointmentText}>{`${item.date} - ${item.time}`}</Text>
    <Text style={styles.serviceText}>{item.service}</Text>
  </View>
);

const AppointmentHistoryScreen: React.FC = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // Simulación de obtención de datos del backend
    const fetchAppointments = async () => {
      // Aquí iría la lógica para obtener datos del backend
      const fetchedAppointments: Appointment[] = [
        { id: 1, date: '2024-10-01', time: '10:00 AM', service: 'Podología' },
        { id: 2, date: '2024-10-05', time: '11:30 AM', service: 'Peluquería' },
        { id: 3, date: '2024-10-10', time: '2:00 PM', service: 'Fonoaudiología' },
      ];
      setAppointments(fetchedAppointments);
    };

    fetchAppointments();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Historial de Citas</Text>
      
      {appointments.length === 0 ? (
        <Text style={styles.noAppointments}>No tienes citas programadas.</Text>
      ) : (
        <FlatList
          data={appointments}
          renderItem={({ item }) => <AppointmentItem item={item} />}
          keyExtractor={item => item.id.toString()}
          style={styles.list}
        />
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Volver a la página anterior</Text>
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
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  appointmentText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceText: {
    fontSize: 14,
    color: '#555',
  },
  noAppointments: {
    fontSize: 16,
    color: '#ff4d4d',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 20,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AppointmentHistoryScreen;
