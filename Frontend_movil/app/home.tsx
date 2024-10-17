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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#f0f4f8',
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
    alignItems: 'flex-end', // Puedes usar 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'
  },
  image: {
    width: '10%',
    height: 15,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 2,
  },}
);

export default HomeScreen;
