import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button, StatusBar, Alert } from 'react-native';
import { useRouter } from 'expo-router';

interface Appointment {
  id: string;
  date: string;
  service: string;
}

const AppointmentHistoryScreen: React.FC = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointmentHistory();
  }, []);

  // Función para obtener el historial de citas del usuario
  const fetchAppointmentHistory = async () => {
    try {
      const response = await fetch('http://localhost:8000/citas/', { // Cambia esta URL según tu API
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setAppointments(data); // Asumiendo que la API devuelve un array de citas
      } else {
        setError(data.error || 'Error al obtener el historial de citas');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setError('Error en la conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Appointment }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.appointmentText}>ID: {item.id}</Text>
      <Text style={styles.appointmentText}>Fecha: {item.date}</Text>
      <Text style={styles.appointmentText}>Servicio: {item.service}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Historial de Citas</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#ff4d4d" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}

      <Button title="Volver a la Pantalla de Login" onPress={() => router.push('/login')} />
    </View>
  );
};

// Definición de estilos después del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  appointmentItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: '100%',
  },
  appointmentText: {
    fontSize: 16,
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default AppointmentHistoryScreen;
