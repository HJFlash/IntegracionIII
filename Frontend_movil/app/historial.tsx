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
    const fetchAppointments = async () => {
      try {
        const token = 'auth-token'; 
        const response = await fetch('http://tu-dominio.com/appointment-history/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Asegúrate de manejar la autenticación
          },
        });

        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error al obtener el historial de citas:', error);
        const errorMessage = error instanceof Error ? error.message : 'No se pudo obtener el historial de citas';
        Alert.alert('Error', errorMessage);
      }
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
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
        <Text style={styles.backText}>Volver a la página principal</Text>
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