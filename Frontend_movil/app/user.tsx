import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

const SelectServiceScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.circle} />
        <Text style={styles.username}>NombreUser</Text>
        <TouchableOpacity style={styles.searchIcon} />
      </View>

      {/* Select Service */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Seleccionar Servicio</Text>
        <TextInput
          placeholder="Lorem Servicio"
          style={styles.input}
          placeholderTextColor="#333"
        />
      </View>

      {/* Select Date */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Seleccionar día</Text>
        <TextInput
          placeholder="mes / día / año"
          style={styles.input}
          placeholderTextColor="#333"
        />
      </View>

      {/* Select Time */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Seleccionar hora</Text>
        <TextInput
          placeholder="00:00 Ir"
          style={styles.input}
          placeholderTextColor="#333"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Enviar</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f0f8',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  circle: {
    width: 40,
    height: 40,
    backgroundColor: '#ff4d4d',
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchIcon: {
    width: 25,
    height: 25,
    backgroundColor: '#fff',
    borderRadius: 12.5,
  },
  inputContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4682b4',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    color: '#4682b4',
    marginBottom: 5,
    textAlign: 'center',
  },
  input: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SelectServiceScreen;
