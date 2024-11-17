import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';

const RegisterScreen: React.FC = () => {
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const router = useRouter();

  const handleSelectPdf = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });
      if (result.type === 'success') {
        setSelectedPdf(result.uri); // Guardamos la URI del archivo
      } else {
        console.log('Selección de documento cancelada');
      }
    } catch (err) {
      console.error('Error al seleccionar el documento:', err);
    }
  };

  const handleRegister = async () => {
    if (!selectedPdf) {
      alert('Por favor, sube el documento RSH.');
      return;
    }

    const formData = new FormData();
    formData.append('Rut', rut);
    formData.append('Email', email);
    formData.append('Contraseña', password);
    formData.append('Nombre', nombre);
    formData.append('Apellidos', apellidos);
    formData.append('Telefono', telefono);
    const pdfFile = {
      uri: selectedPdf,
      type: 'application/pdf',
      name: 'RSH.pdf',
    } as any;
    formData.append('RSH', pdfFile);

    try {
      const response = await fetch('http://localhost:8000/registro/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Usuario registrado con éxito:', data);
      } else {
        console.log('Error en el registro:', data);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Campos existentes */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ingrese rut"
            style={styles.input}
            placeholderTextColor="#999"
            value={rut}
            onChangeText={setRut}
          />
        </View>

        {/* Botón para seleccionar PDF */}
        <TouchableOpacity style={styles.uploadButton} onPress={handleSelectPdf}>
          <Text style={styles.uploadText}>
            {selectedPdf ? 'Documento seleccionado' : 'Subir documento RSH (PDF)'}
          </Text>
        </TouchableOpacity>

        {/* Botón para enviar el registro */}
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
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff4d4d',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  uploadButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 15,
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
