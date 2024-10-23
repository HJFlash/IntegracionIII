import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const RegisterScreen: React.FC = () => {
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sector, setSector] = useState('');
  const [calle, setCalle] = useState('');
  const [ncasa, setNcasa] = useState('');

  const router = useRouter();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8000/registro/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Rut: rut,
          Contraseña: password,
          Email: email,
          Nombre: nombre,
          Apellidos: apellidos,
          Telefono: telefono,
          Sector: sector,
          Calle: calle,
          Ncasa: ncasa,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Usuario registrado con éxito:', data);
      } else {
        console.log('Error en el registro:', data);  // Captura detalles de error
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ingrese rut"
            style={styles.input}
            placeholderTextColor="#999"
            value={rut}
            onChangeText={setRut}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ingrese correo electrónico"
            style={styles.input}
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ingrese Primer Nombre"
            style={styles.input}
            placeholderTextColor="#999"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ingrese Segundo Nombre"
            style={styles.input}
            placeholderTextColor="#999"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ingrese su Primer Apellido"
            style={styles.input}
            placeholderTextColor="#999"
            value={apellidos}
            onChangeText={setApellidos}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ingrese su Segundo Apellido"
            style={styles.input}
            placeholderTextColor="#999"
            value={apellidos}
            onChangeText={setApellidos}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Teléfono"
            style={styles.input}
            placeholderTextColor="#999"
            value={telefono}
            onChangeText={setTelefono}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Sector"
            style={styles.input}
            placeholderTextColor="#999"
            value={sector}
            onChangeText={setSector}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Calle"
            style={styles.input}
            placeholderTextColor="#999"
            value={calle}
            onChangeText={setCalle}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Número de casa"
            style={styles.input}
            placeholderTextColor="#999"
            value={ncasa}
            onChangeText={setNcasa}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginText}>Enviar Solicitud de Registro</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.noAccountText}>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.registerText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 20, // Espacio adicional para evitar que el contenido se corte
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
