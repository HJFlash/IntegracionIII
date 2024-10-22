import { Stack } from "expo-router";
import { Text } from 'react-native';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen 
        name="index" 
        options={{
          headerShown: true,
          headerTitle: "Inicio", // Cambia el título
          headerStyle: {
            backgroundColor: '#5499C7', // Color celeste para el fondo
          },
          headerTitleAlign: 'center', // Centra el título
          headerTintColor: '#fff', // Cambia el color del texto a blanco
          headerTitleStyle: {
            fontSize: 24, // Tamaño de la letra
          },
        }} 
      />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}
