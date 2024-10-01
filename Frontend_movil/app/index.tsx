import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const IndexScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Página de inicio</Text>

      <View style={styles.imageContainer}>
        <Image
          //source={require('../assets/images/your-image.png')} // Cambia a la ruta de tu imagen
          style={styles.image}
        />
      </View>

      <Text style={styles.infoText}>Aquí encontrarás información de uso</Text>
      <View>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/information')}>
        <Text style={styles.buttonText}>Ir a Informaciones</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/request')}>
        <Text style={styles.buttonText}>Solicitar Petición</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/login')}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/register')}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/prestador')}>
        <Text style={styles.buttonText}>Prestador</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/user')}>
        <Text style={styles.buttonText}>Usuario</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    fontSize: 20,
    width: '50%',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#E74C3C',
    padding: 10,
    borderRadius: 5,
  },
  videoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  videoText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  videoDescription: {
    textAlign: 'center',
    marginVertical: 10,
  },
  video: {
    width: '100%',
    height: 200,
    backgroundColor: '#ccc', // Color de fondo como marcador
  },
});

export default IndexScreen;
