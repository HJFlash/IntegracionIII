import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, Alert } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// Configurar el manejador de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Función para enviar notificación push
async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: '¡Hola!',
    body: 'Aquí está el cuerpo de la notificación',
    data: { extraData: 'Datos adicionales aquí' },
  };

  try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    if (!response.ok) {
      throw new Error(`Error al enviar la notificación: ${response.statusText}`);
    }
    Alert.alert('Notificación enviada correctamente');
  } catch (error) {
    console.error(error);
    Alert.alert('Error al enviar notificación', error.message);
  }
}

// Función para manejar errores de registro
function handleRegistrationError(errorMessage: string) {
  Alert.alert('Error de Registro', errorMessage);
}

// Función para registrar el dispositivo y obtener el token de notificaciones
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('¡Permisos de notificaciones no concedidos!');
      return;
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

    if (!projectId) {
      handleRegistrationError('¡No se encontró el ID del proyecto de EAS!');
      return;
    }

    try {
      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      console.log('Token de Notificaciones Expo:', token);
    } catch (error) {
      handleRegistrationError(`Error al obtener token: ${error}`);
    }
  } else {
    handleRegistrationError('Debes usar un dispositivo físico para recibir notificaciones');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    // Registrar para notificaciones push
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token ?? null));

    // Escuchar notificaciones recibidas
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // Escuchar respuestas del usuario a las notificaciones
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Respuesta a la notificación:', response);
    });

    // Limpiar los listeners al desmontar el componente
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Tu token de notificaciones Expo:</Text>
      <Text>{expoPushToken ?? 'Esperando token...'}</Text>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Título: {notification?.request.content.title ?? 'Sin notificaciones'}</Text>
        <Text>Cuerpo: {notification?.request.content.body ?? 'Sin cuerpo de notificación'}</Text>
        <Text>Datos: {notification ? JSON.stringify(notification.request.content.data) : 'Sin datos'}</Text>
      </View>

      <Button
        title="Enviar Notificación"
        onPress={async () => {
          if (expoPushToken) {
            await sendPushNotification(expoPushToken);
          } else {
            Alert.alert('Error', 'No se ha obtenido el token de notificación.');
          }
        }}
      />
    </View>
  );
}
