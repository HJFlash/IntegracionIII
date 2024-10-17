import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, BackHandler} from 'react-native';
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
      <View>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/information')}>
        <Text style={styles.buttonText}>Ir a Informaciones</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/ejemplo_noti')}>
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
      <TouchableOpacity style={styles.buttonContainer} onPress={handleBackButton}>
        <Text style={styles.buttonText}>Salir</Text>
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
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center', // se puede colocar center
    alignItems: 'flex-end',
    padding: 20,
    marginBottom: '5%',
    marginTop: '-18%',
    backgroundColor: '#5499C7',
    width: '120%',
    height: '10%',
  },
  imageContainer: {
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
    marginBottom: 10,
  },
  buttonContainer: {
    fontSize: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    width: '200%',
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#E74C3C',
    padding: 10,
    borderRadius: 5,
  },
});

export default IndexScreen;
