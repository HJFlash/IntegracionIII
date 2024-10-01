import React from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const HomeScreen: React.FC = () => {
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

      <View style={styles.buttonContainer}>
        <Button
          title="Ir a Informaciones"
          //onPress={() => router.push('/information')} // Cambia a la ruta de la pantalla de información
          color="#ff4d4d"
        />
        <Button
          title="Solicitar Petición"
          //onPress={() => router.push('/request')} // Cambia a la ruta de la pantalla de solicitud
          color="#ff4d4d"
        />
      </View>
      <Button 
        title="Iniciar sesión" 
        onPress={() => router.push('/login')} // Navegar a la pantalla de login
      />
      <Button 
        title="Registrarse" 
        onPress={() => router.push('/register')} // Navegar a la pantalla de registro
      />
      <Button 
        title="Prestador" 
        onPress={() => router.push('/prestador')} // Navegar a la pantalla de prestador
      />
      <Button 
        title="Usuario" 
        onPress={() => router.push('/user')} // Navegar a la pantalla de usuario
      />
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
    fontSize: 28,
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
    width: '100%',
    marginBottom: 20,
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

export default HomeScreen;
