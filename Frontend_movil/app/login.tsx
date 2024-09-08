import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, StatusBar} from 'react-native';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content"/>
      <Text style={styles.title}>Inicio de sesión</Text>

      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/images/user.png')}
          style={styles.icon}
        />
        <TextInput
          placeholder="Ingrese rut"
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/images/lock.png')}
          style={styles.icon}
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>O inicia sesión con</Text>

      <TouchableOpacity>
        <Image
          source={require('../assets/images/outlook.png')}
          style={styles.outlookIcon}
        />
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style={styles.noAccountText}>¿Aún no tienes una cuenta?</Text>
        <TouchableOpacity>
          <Text style={styles.registerText}>Registrarse</Text>
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
