// AgendadasScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, FlatList } from 'react-native';

// Datos simulados de horas agendadas
const bookedAppointments = [
  { id: '1', service: 'Podología', date: '2024-11-19', time: '10:00' },
  { id: '2', service: 'Peluquería', date: '2024-11-19', time: '14:00' },
  { id: '3', service: 'Fonoaudiología', date: '2024-11-20', time: '09:00' },
  { id: '4', service: 'Asesoría Jurídica', date: '2024-11-20', time: '15:00' },
  { id: '5', service: 'Podología', date: '2024-11-21', time: '11:00' },
  { id: '6', service: 'Peluquería', date: '2024-11-21', time: '16:00' },
];

const AgendadasScreen: React.FC = () => {
  const [appointments, setAppointments] = useState(bookedAppointments);

  // Función para eliminar una cita (solo para ejemplo)
  const handleCancelAppointment = (id: string) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== id);
    setAppointments(updatedAppointments);
    Alert.alert('Cita Cancelada', 'La cita ha sido cancelada exitosamente.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Horas Agendadas</Text>

      {/* Mostrar las horas agendadas */}
      {appointments.length > 0 ? (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.appointmentCard}>
              <Text style={styles.appointmentText}>Servicio: {item.service}</Text>
              <Text style={styles.appointmentText}>Hora: {item.time}</Text>
              <Text style={styles.appointmentText}>Día: {item.date}</Text>
              <Button title="Cancelar Cita" onPress={() => handleCancelAppointment(item.id)} />
            </View>
          )}
        />
      ) : (
        <Text>No tienes horas agendadas.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  appointmentCard: {
    backgroundColor: '#e4e8f1',
    marginBottom: 15,
    padding: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  appointmentText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default AgendadasScreen;
