import React from 'react';
import { View, Button, Alert } from 'react-native';

const enviarCorreo = async () => {
  try {
    const response = await fetch('http://tu-dominio.com/send-email/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: 'Asunto del correo',
        message: 'Contenido del correo',
        recipient_list: ['destinatario@example.com'],
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
    Alert.alert('Error', error.message || 'No se pudo enviar el correo');
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