import React, { useEffect, useState, memo } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const useAvailableHours = (date: string) => {
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailableHours = async () => {
      try {
        const hours = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
        setAvailableHours(hours);
      } catch (err) {
        setError('Error al obtener las horas disponibles');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableHours();
  }, [date]);

  return { availableHours, loading, error };
};

const HourBlock = memo(({ hour, onSelect }: { hour: string; onSelect: (hour: string) => void }) => (
  <TouchableOpacity style={styles.hourBlock} onPress={() => onSelect(hour)}>
    <Text style={styles.hourText}>{hour}</Text>
  </TouchableOpacity>
));

const Horario = () => {
  const { date }: { date: string } = useLocalSearchParams();
  const { availableHours, loading, error } = useAvailableHours(date);
  const router = useRouter();

  const handleHourSelect = (hour: string) => {
    router.push({
      pathname: '/select_service',
      params: { selectedHour: hour },
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4682b4" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Horas disponibles para {date}</Text>
      <ScrollView contentContainerStyle={styles.hoursContainer}>
        {availableHours.map((hour) => (
          <HourBlock key={hour} hour={hour} onSelect={handleHourSelect} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e8f0f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4682b4',
  },
  hoursContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  hourBlock: {
    backgroundColor: '#4682b4',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  hourText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Horario;
