import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
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
      Alert.alert(
        'Notificación Recibida',
        notification.request.content.title || 'Sin título',
        [{ text: 'OK' }]
      );
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

  // Funciones para programar notificaciones
  const scheduleConfirmationNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Cita Confirmada ✔️",
        body: "Tu cita para el servicio 'Peluquería' ha sido confirmada el 20 de noviembre a las 15:00.",
        data: { type: 'confirmation', service: 'Peluquería', date: '20 de noviembre', time: '15:00' },
      },
      trigger: { seconds: 5 },
    });
  };

  const scheduleReminderNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Recordatorio de Cita 📅",
        body: "Tienes una cita programada para 'Podología' mañana a las 10:00.",
        data: { type: 'reminder', service: 'Podología', date: 'mañana', time: '10:00' },
      },
      trigger: { seconds: 10 },
    });
  };

  const scheduleRescheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Cita Reprogramada 🔄",
        body: "Tu cita para 'Asesoría Jurídica' se ha reprogramado al 21 de noviembre a las 14:00.",
        data: { type: 'reschedule', service: 'Asesoría Jurídica', date: '21 de noviembre', time: '14:00' },
      },
      trigger: { seconds: 15 },
    });
  };

  const scheduleCancellationNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Cita Cancelada ❌",
        body: "Tu cita para 'Fonoaudiología' ha sido cancelada. Por favor, contacta para reprogramar.",
        data: { type: 'cancellation', service: 'Fonoaudiología' },
      },
      trigger: { seconds: 20 },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.token}>
        Token: {notificationToken || 'Esperando token...'}
      </Text>
      
      <Button title="Cita Confirmada" onPress={scheduleConfirmationNotification} />
      <Button title="Recordatorio de Cita" onPress={scheduleReminderNotification} />
      <Button title="Cita Reprogramada" onPress={scheduleRescheduleNotification} />
      <Button title="Cita Cancelada" onPress={scheduleCancellationNotification} />

      <Button title="Retroceder" onPress={() => router.back()} />
    </View>
  );
};

// Definición de estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  token: {
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default NotificationScreen;
