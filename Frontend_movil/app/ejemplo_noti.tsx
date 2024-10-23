import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const App = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();

    // Configurar el manejador de notificaciones
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    // Escuchar notificaciones entrantes
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      Alert.alert(notification.request.content.title, notification.request.content.body);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    // Obtener el estado de los permisos existentes
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // Si no se ha solicitado permiso, solicitarlo
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Si el permiso no es otorgado, no se registra
    if (finalStatus !== 'granted') {
      Alert.alert('Error', 'No se puede enviar notificaciones push, el permiso no fue otorgado');
      return;
    }

    // Obtener el token para las notificaciones
    const token = await Notifications.getExpoPushTokenAsync();
    console.log('Token de notificación:', token); // Imprime el token en la consola
  };

  const sendPushNotification = async () => {
    const token = '<YOUR_EXPO_PUSH_TOKEN>'; // Reemplaza con tu token

    const message = {
      to: token,
      sound: 'default',
      title: '¡Notificación!',
      body: 'Este es un mensaje de prueba.',
      data: { someData: 'goes here' },
    };

    // Enviar la notificación
    await Notifications.scheduleNotificationAsync({
      content: message,
      trigger: { seconds: 2 }, // Cambia este valor para programar la notificación
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notificaciones Push con Expo y TypeScript</Text>
      <Button title="Enviar Notificación" onPress={sendPushNotification} />
    </View>
  );
};

export default App;
