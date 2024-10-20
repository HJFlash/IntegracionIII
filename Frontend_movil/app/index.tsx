import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, BackHandler } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const IndexScreen: React.FC = () => {
  const router = useRouter();

  const handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Inicio</Text>

      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/logo_muni.jpg')} // Cambia a la ruta de tu imagen
          style={styles.image}
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
        <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/user')}>
          <Text style={styles.buttonText}>Usuario</Text>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    marginBottom: '5%',
    marginTop: '-42%',
    backgroundColor: '#5499C7',
    width: '120%',
    height: '10%',
  },
  imageContainer: {
    paddingTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 100,
    marginBottom: 30,
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Cambia a 'flex-start' para que los botones estén más cerca
    width: '90%',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5, // Ajusta el margen horizontal entre botones
    paddingTop: '5%',
  },
  buttonText: {
    paddingVertical: '10%',
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#E74C3C',
    borderRadius: 15,
    width: '100%', // Asegúrate de que el botón ocupe todo el espacio disponible
  },
  buttonContainerExit: {
    width: '88%',
    height: '20%',
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: '2%',
    paddingTop: '5%',

  },
});

export default IndexScreen;
