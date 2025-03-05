import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput,ImageBackground,Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const doctorsData = [
    { id: '1', name: 'Dr. John Doe', designation: 'Psychologist', rating: 5 },
    { id: '2', name: 'Dr. Sarah Smith', designation: 'Therapist', rating: 4.5 },
    { id: '3', name: 'Dr. Emily Johnson', designation: 'Psychiatrist', rating: 4 },
    { id: '4', name: 'Dr. Michael Brown', designation: 'Psychologist', rating: 4.8 },
  ];


const DoctorCard = ({ doctor, navigation }) => (
<TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DoctorDetail', { doctor })}>
    <Text style={styles.cardTitle}>{doctor.name}</Text>
    <Text style={styles.cardDesignation}>{doctor.designation}</Text>
    <View style={styles.cardFooter}>
    <View style={styles.ratingContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
        <Ionicons
            key={index}
            name={index < Math.floor(doctor.rating) ? "star" : "star-outline"}
            size={18}
            color="#524F84"
        />
        ))}
    </View>
    <Ionicons name="chevron-forward" size={24} color="black" />
    </View>
</TouchableOpacity>
);
const Tab = createMaterialTopTabNavigator();

function DoctorListScreen({ navigation, category }) {
    const filteredDoctors = doctorsData.filter((doctor) => doctor.designation === category);
  
    return (
      <View style={styles.screenContainer}>
        {filteredDoctors.map((doctor) => (
            <View key={doctor.id} style={{ marginBottom: 15 }}>
          <DoctorCard doctor={doctor} navigation={navigation} />
        </View>
      ))}
    </View>
    );
  }
  
  // Screens
  export const PsychologistScreen = ({ navigation }) => (
    <DoctorListScreen navigation={navigation} category="Psychologist" />
  );
  export const TherapistScreen = ({ navigation }) => (
    <DoctorListScreen navigation={navigation} category="Therapist" />
  );
  export const PsychiatristScreen = ({ navigation }) => (
    <DoctorListScreen navigation={navigation} category="Psychiatrist" />
  );
  
  

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.header}>

      <ImageBackground source={require('../assets/ellipse.png')} style={styles.hamburgerBg}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.icon}>
            <Ionicons name="menu" size={32} color="black" />
        </TouchableOpacity>
      </ImageBackground>

        <Text style={styles.title}>KIBU</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.icon}>
          <Ionicons name="notifications-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput placeholder="Search Therapist" style={styles.searchInput} />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
          tabBarIndicatorStyle: { backgroundColor: '#007bff' },
        }}
      >
        <Tab.Screen name="Psychologist" component={PsychologistScreen} />
        <Tab.Screen name="Therapist" component={TherapistScreen} />
        <Tab.Screen name="Psychiatrist" component={PsychiatristScreen} />
      </Tab.Navigator>
      <Text style={styles.subTitle}>HOW ARE YOU FEELING TODAY?</Text>

      {/* Emotion Icons Section */}
      <View style={styles.emotionsContainer}>
        <View style={styles.emotionItem}>
          <TouchableOpacity style={[styles.emotionBox, { backgroundColor: '#524F84' }]}>
            <Ionicons name="happy-outline" size={32} color="white" />
          </TouchableOpacity>
          <Text style={styles.emotionText}>Happy</Text>
        </View>

        <View style={styles.emotionItem}>
          <TouchableOpacity style={[styles.emotionBox, { backgroundColor: '#524F84' }]}>
            <Ionicons name="leaf-outline" size={32} color="white" />
          </TouchableOpacity>
          <Text style={styles.emotionText}>Calm</Text>
        </View>

        <View style={styles.emotionItem}>
          <TouchableOpacity style={[styles.emotionBox, { backgroundColor: '#524F84' }]}>
            <Ionicons name="bed-outline" size={32} color="white" />
          </TouchableOpacity>
          <Text style={styles.emotionText}>Relax</Text>
        </View>

        <View style={styles.emotionItem}>
          <TouchableOpacity style={[styles.emotionBox, { backgroundColor: '#524F84' }]}>
            <Ionicons name="eye-outline" size={32} color="white" />
          </TouchableOpacity>
          <Text style={styles.emotionText}>Focus</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 40,
    backgroundColor: '#fff', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 38,
    color:'#524F84',
    fontWeight: 'bold',
  },
  hamburgerBg: {
    left: 0,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 30,
    color: '#333',
  },
  emotionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom:20,
    paddingHorizontal: 20,
  },
  emotionItem: {
    alignItems: 'center',
  },
  emotionBox: {
    width: 69,
    height: 69,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  emotionText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDesignation: {
    fontSize: 14,
    color: 'gray',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
});

export default HomeScreen;
