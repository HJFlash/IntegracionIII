import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { BackHandler } from 'react-native';
import { useRouter } from 'expo-router';

const Agenda: React.FC = () => {
  const router = useRouter();

  // Funciones de manejo de acciones
  const handleNavigation = (route: string) => router.push(route);

  const handleExitPress = () => {
    BackHandler.exitApp();
  };

  React.useEffect(() => {
    const backAction = () => {
      router.back();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Seleccione una opcion:</Text>
      </View>

      {/* Botones */}
      <ActionButton 
        label="Agendar Hora" 
        onPress={() => handleNavigation('/select_service')} 
        backgroundColor="#4682b4" 
      />
      <ActionButton 
        label="Revisar Horario" 
        onPress={() => handleNavigation('/horario')} 
        backgroundColor="#4682b4" 
      />
      <ActionButton 
        label="Volver a Inicio" 
        onPress={() => router.back()} 
        backgroundColor="#ffa500" 
      />
      <ActionButton 
        label="Salir" 
        onPress={handleExitPress} 
        backgroundColor="#ff4d4d" 
      />
    </View>
  );
};

// Componente reutilizable para botones
const ActionButton: React.FC<{ label: string; onPress: () => void; backgroundColor: string }> = ({
  label,
  onPress,
  backgroundColor,
}) => (
  <TouchableOpacity 
    style={[styles.button, { backgroundColor }]} 
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={label}
  >
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

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
});

export default Agenda;
