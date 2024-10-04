import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

const ActivitiesScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileIcon} />
        <Text style={styles.userName}>NombreUser</Text>
        <TouchableOpacity>
          <Image source={require('../assets/images/search.png')} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Actividades de hoy */}
        <Text style={styles.sectionTitle}>Actividades de hoy</Text>
        <ActivityCard color="#4DB6AC" email="CorreoAdultoMayor@outlook.cl" time="00:00" service="Ir servicio" />
        <ActivityCard color="#FFB74D" email="CorreoAdultoMayor@outlook.cl" time="00:00" service="Ir servicio" />
        <ActivityCard color="#81C784" email="CorreoAdultoMayor@outlook.cl" time="00:00" service="Ir servicio" />

        {/* Actividades anteriores */}
        <Text style={styles.sectionTitle}>Actividades Anteriores</Text>
        <ActivityCard color="#81C784" email="CorreoAdultoMayor@outlook.cl" time="00:00" service="Ir servicio" />
        <ActivityCard color="#81C784" email="CorreoAdultoMayor@outlook.cl" time="00:00" service="Ir servicio" />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/correo')}>
          <Image source={require('../assets/images/mail.png')} style={styles.navIcon} />
          <Text style={styles.navTextActive}>Correo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/horarios')}>
          <Image source={require('../assets/images/calendar.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Horarios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface ActivityCardProps {
  color: string;
  email: string;
  time: string;
  service: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ color, email, time, service }) => (
  <View style={styles.card}>
    <View style={[styles.circle, { backgroundColor: color }]} />
    <View style={styles.cardText}>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.time}>{time} {service}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#34495E',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6F61',
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  scrollView: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34495E',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  cardText: {
    flex: 1,
  },
  email: {
    color: 'white',
    fontSize: 14,
  },
  time: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderTopColor: 'white',
    borderTopWidth: 1,
    backgroundColor: '#34495E',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  navText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  navTextActive: {
    fontSize: 14,
    color: 'coral',
    marginTop: 5,
  },
});

export default ActivitiesScreen;
