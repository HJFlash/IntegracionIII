import { Stack } from "expo-router";
import { Text } from 'react-native';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{
          animation: 'slide_from_right', // Animación de entrada
          headerShown: true,
          headerTitle: "Inicio de Sesión", // Cambia el título
          headerStyle: {
            backgroundColor: '#5499C7', // Color celeste para el fondo
          },
          headerTitleAlign: 'center', // Centra el título
          headerTintColor: '#fff', // Cambia el color del texto a blanco
          headerTitleStyle: {
            fontSize: 24, // Tamaño de la letra
          }, }} />
      <Stack.Screen 
        name="index" 
        options={{
          animation: 'slide_from_right', // Animación de entrada
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
      <Stack.Screen name="register" options={{
          animation: 'slide_from_right', // Animación de entrada
          headerShown: true,
          headerTitle: "Registro", // Cambia el título
          headerStyle: {
            backgroundColor: '#5499C7', // Color celeste para el fondo
          },
          headerTitleAlign: 'center', // Centra el título
          headerTintColor: '#fff', // Cambia el color del texto a blanco
          headerTitleStyle: {
            fontSize: 24, // Tamaño de la letra
          },}} />
      <Stack.Screen name="agendar" options={{
          animation: 'slide_from_right', // Animación de entrada
          headerShown: true,
          headerTitle: "Pagina de Agendamiento", // Cambia el título
          headerStyle: {
            backgroundColor: '#5499C7', // Color celeste para el fondo
          },
          headerTitleAlign: 'center', // Centra el título
          headerTintColor: '#fff', // Cambia el color del texto a blanco
          headerTitleStyle: {
            fontSize: 24, // Tamaño de la letra
          },}} />    
      <Stack.Screen name="horario" options={{
          animation: 'slide_from_right', // Animación de entrada
          headerShown: true,
          headerTitle: "Horario", // Cambia el título
          headerStyle: {
            backgroundColor: '#5499C7', // Color celeste para el fondo
          },
          headerTitleAlign: 'center', // Centra el título
          headerTintColor: '#fff', // Cambia el color del texto a blanco
          headerTitleStyle: {
            fontSize: 24, // Tamaño de la letra
          },}} />
      <Stack.Screen name="select_service" options={{
          animation: 'slide_from_right', // Animación de entrada
          headerShown: true,
          headerTitle: "Pagina de Seleccion de Servicio", // Cambia el título
          headerStyle: {
            backgroundColor: '#5499C7', // Color celeste para el fondo
          },
          headerTitleAlign: 'center', // Centra el título
          headerTintColor: '#fff', // Cambia el color del texto a blanco
          headerTitleStyle: {
            fontSize: 24, // Tamaño de la letra
          },}} />
      <Stack.Screen name="new_notification" options={{
          animation: 'slide_from_right', // Animación de entrada
          headerShown: true,
          headerTitle: "Pagina de Testeo de Notificaciones", // Cambia el título
          headerStyle: {
            backgroundColor: '#5499C7', // Color celeste para el fondo
          },
          headerTitleAlign: 'center', // Centra el título
          headerTintColor: '#fff', // Cambia el color del texto a blanco
          headerTitleStyle: {
            fontSize: 24, // Tamaño de la letra
          },}} />
      <Stack.Screen name="historial_admin" options={{
          animation: 'slide_from_right', // Animación de entrada
          headerShown: true,
          headerTitle: "Pagina de Historial-Admin", // Cambia el título
          headerStyle: {
            backgroundColor: '#5499C7', // Color celeste para el fondo
          },
          headerTitleAlign: 'center', // Centra el título
          headerTintColor: '#fff', // Cambia el color del texto a blanco
          headerTitleStyle: {
            fontSize: 24, // Tamaño de la letra
          },}} />
      <Stack.Screen name="prestador" options={{
          animation: 'slide_from_right', // Animación de entrada
          headerShown: true,
          headerTitle: "Pagina de Prestador", // Cambia el título
          headerStyle: {
            backgroundColor: '#5499C7', // Color celeste para el fondo
          },
          headerTitleAlign: 'center', // Centra el título
          headerTintColor: '#fff', // Cambia el color del texto a blanco
          headerTitleStyle: {
            fontSize: 24, // Tamaño de la letra
          },}} />
      <Stack.Screen name="user_select" options={{
          animation: 'slide_from_right', // Animación de entrada
          headerShown: true,
          headerTitle: "Pagina de Selección de Usuario", // Cambia el título
          headerStyle: {
            backgroundColor: '#5499C7', // Color celeste para el fondo
          },
          headerTitleAlign: 'center', // Centra el título
          headerTintColor: '#fff', // Cambia el color del texto a blanco
          headerTitleStyle: {
            fontSize: 24, // Tamaño de la letra
          },}} />
    </Stack>
  );
}
