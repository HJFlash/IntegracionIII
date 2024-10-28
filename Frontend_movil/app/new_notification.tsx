import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, StatusBar } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';

const NotificationScreen: React.FC = () => {
  const router = useRouter();
  const [notificationToken, setNotificationToken] = useState<string | null>(null);

  useEffect(() => {
    // Solicitar permisos de notificación al cargar el componente
    registerForPushNotificationsAsync();
    
    // Manejar la recepción de notificaciones
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      Alert.alert('Notificación Recibida', notification.request.content.title);
    });

    return () => subscription.remove();
  }, []);

  // Función para registrar el token de notificación
  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Error', 'Se requiere permiso para mostrar notificaciones');
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    setNotificationToken(token);
    console.log('Token de notificación:', token);
  };

  // Función para programar una notificación
  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hola! Esta es una notificación de prueba.",
        body: '¡Gracias por usar nuestra aplicación!',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 }, // Notificación se mostrará después de 2 segundos
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Pantalla de Notificaciones</Text>
      <Text style={styles.token}>Token: {notificationToken || 'Esperando token...'}</Text>
      <Button title="Programar Notificación" onPress={scheduleNotification} />
      <Button title="Volver a la Pantalla de Login" onPress={() => router.push('/login')} />
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
  token: {
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
});

export default NotificationScreen;
