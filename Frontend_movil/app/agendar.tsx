import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, BackHandler } from 'react-native';
import { useRouter } from 'expo-router';

const Agenda: React.FC = () => {
  const router = useRouter();

  const handleSchedulePress = () => {
    // Acción para agendar hora
    router.push('/user');
  };

  const handleReviewPress = () => {
    // Acción para revisar horario
    router.push('/calendar');
  };

  const handleExitPress = () => {
    // Acción para salir (puede ser redirigir a una pantalla de inicio o logout)
    BackHandler.exitApp();
    return true;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Página de Agendamiento</Text>
      </View>

      {/* Botones */}
      <TouchableOpacity style={styles.button} onPress={handleSchedulePress}>
        <Text style={styles.buttonText}>Agendar Hora</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleReviewPress}>
        <Text style={styles.buttonText}>Revisar Horario</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonExit} onPress={handleExitPress}>
        <Text style={styles.buttonText}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f0f8',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#4682b4',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonExit: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default Agenda;
