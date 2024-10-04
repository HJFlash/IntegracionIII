import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, StatusBar, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const LoginScreen: React.FC = () => {
  const router = useRouter();

  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Rut: rut,
          Contraseña: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        
        // Aquí puedes manejar el token cuando esté listo
        // const token = data.token;  // Asegúrate de que el backend envíe el token
        
        // Por ahora, puedes omitir la lógica de obtener los datos del usuario
        // await fetchUserData(token); // Descomentar cuando la lógica de token esté lista

        // Redirigir a la pantalla de selección de servicios o donde sea necesario
        router.push('/user');  
      } else {
        Alert.alert('Error', data.error || 'Hubo un problema al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      Alert.alert('Error', 'Error en la conexión con el servidor');
    }
  };

  // Función para obtener los datos del usuario (puedes dejarla así para futuro uso)
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8000/usuario/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Nombre del usuario:', data.nombre);
      } else {
        console.error('Error al obtener los datos del usuario:', data.error);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Inicio de sesión</Text>

      <View style={styles.inputContainer}>
        <Image source={require('../assets/images/user.png')} style={styles.icon} />
        <TextInput
          placeholder="Ingrese rut"
          style={styles.input}
          placeholderTextColor="#999"
          value={rut}
          onChangeText={setRut}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={require('../assets/images/lock.png')} style={styles.icon} />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>O inicia sesión con</Text>

      <TouchableOpacity>
        <Image source={require('../assets/images/outlook.png')} style={styles.outlookIcon} />
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style={styles.noAccountText}>¿Aún no tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.registerText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff4d4d',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPassword: {
    color: '#ff4d4d',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginBottom: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    marginBottom: 10,
  },
  outlookIcon: {
    width: 48,
    height: 48,
    marginBottom: 30,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noAccountText: {
    fontSize: 16,
  },
  registerText: {
    color: '#ff4d4d',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default LoginScreen;