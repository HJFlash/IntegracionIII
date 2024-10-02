import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

const RegisterScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Registro</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ingrese rut"
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ingrese correo electrónico"
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Confirmar contraseña"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Subir Documento Registro Social de Hogares</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Enviar Solicitud de Registro</Text>
      </TouchableOpacity>

      
      <View style={styles.footerContainer}>
        <Text style={styles.noAccountText}>¿Ya tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.registerText}>Iniciar sesión</Text>
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
  loginButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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

export default RegisterScreen;
