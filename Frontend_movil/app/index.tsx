import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, BackHandler } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const IndexScreen: React.FC = () => {
  const router = useRouter();

  const handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Contenedor de la imagen */}
      <View style={styles.imageContainer}>
        <Image
          // Verifica la ruta aquí:
          source={require('../assets/images/logo_muni.jpg')} // Si no funciona, intenta con 'uri'
          style={styles.image}
          resizeMode="contain" // Asegura que la imagen no se deforme
        />
      </View>

      <Text style={styles.infoText}>Aquí encontrarás información de uso</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/login')}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/register')}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/agend')}>
          <Text style={styles.buttonText}>Tests</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buttonContainerExit} onPress={handleBackButton}>
        <Text style={styles.buttonText}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  imageContainer: {
    marginTop: -25,
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 350, // Ajusta según sea necesario
    height: 150, // Ajusta según sea necesario
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    paddingVertical: 22, // Aumentado un 25% sobre el tamaño anterior (de 15 a 22)
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    width: '100%',
  },
  buttonContainerExit: {
    width: '88%',
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 20,
  },
});

export default IndexScreen;
