import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Image, BackHandler, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const IndexScreen: React.FC = () => {
  const router = useRouter();

  const handleBackButton = useCallback(() => {
    BackHandler.exitApp();
    return true;
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [handleBackButton]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/logo_muni.jpg')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.infoText}>Aquí encontrarás información de uso</Text>

      <View style={styles.buttonRow}>
        <Pressable style={styles.buttonContainer} onPress={() => router.push('/login')}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </Pressable>

        <Pressable style={styles.buttonContainer} onPress={() => router.push('/register')}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </Pressable>
      </View>

      <View style={styles.buttonRow}>
        <Pressable style={styles.buttonContainer} onPress={() => router.push('/agendar')}>
          <Text style={styles.buttonText}>Tests</Text>
        </Pressable>
      </View>

      <Pressable style={styles.buttonContainerExit} onPress={handleBackButton}>
        <Text style={styles.buttonText}>Salir</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  imageContainer: {
    marginTop: -25,
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 150,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    paddingVertical: 22,
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    width: '100%',
  },
  buttonContainerExit: {
    width: '88%',
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 20,
  },
});

export default IndexScreen;
