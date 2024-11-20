import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

interface User {
  id: number;
  name: string;
}

// Datos ficticios de usuarios
const mockUsers: User[] = [
  { id: 1, name: 'Juan Pérez' },
  { id: 2, name: 'María López' },
  { id: 3, name: 'Carlos García' },
];

const UserSelectionScreen: React.FC = () => {
  const router = useRouter();

  const handleUserSelection = (userId: number) => {
    router.push(`/historial_admin?userId=${userId}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Selecciona un Usuario</Text>
      <FlatList
        data={mockUsers}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => handleUserSelection(item.id)}
          >
            <Text style={styles.userText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    width: '100%',
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userText: {
    fontSize: 18,
  },
});

export default UserSelectionScreen;
