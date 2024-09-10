import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';

const IndexScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar style="dark"/>
      <Text>Bienvenido a la pantalla de inicio</Text>
      <Button 
        title="Iniciar sesión" 
        onPress={() => router.push('/login')} // Navegar a la pantalla de login
      />
      <Button 
        title="Registrarse" 
        onPress={() => router.push('/register')} // Navegar a la pantalla de registro
      />
    </View>
  );
};

export default IndexScreen;
