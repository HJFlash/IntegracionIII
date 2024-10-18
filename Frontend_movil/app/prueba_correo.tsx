import React from 'react';
import { View, Button, Alert } from 'react-native';

// Función para enviar el correo
const enviarCorreo = async () => {
  try {
    const response = await fetch('https://tu-backend-url.com/enviar-correo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destinatario: 'correo@ejemplo.com', // Cambia por el destinatario deseado
        asunto: 'Notificación desde React Native',
        mensaje: 'Este es el cuerpo del correo enviado desde la app.',
      }),
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    const data = await response.json();
    Alert.alert('Éxito', 'Correo enviado correctamente');
    console.log(data);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    Alert.alert('Error', 'No se pudo enviar el correo');
  }
};

// Componente principal
const App: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Enviar Correo" onPress={enviarCorreo} />
    </View>
  );
};

export default App;
