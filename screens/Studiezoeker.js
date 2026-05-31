import { useState } from 'react';
import CourseCard from '../components/CourseCard';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Studiezoeker() {
  const courses = [
    {
      id: '1',
      name: 'Latijn',
      educationLevel: 'Doorstroom',
      interest: 'Talen',
      campus: 'Campus Caputsteen',
    },
    {
      id: '2',
      name: 'Moderne talen',
      educationLevel: 'Doorstroom',
      interest: 'Talen',
      campus: 'Campus Caputsteen',
    },
    {
      id: '3',
      name: 'Elektromechanica',
      educationLevel: 'Dubbele finaliteit',
      interest: 'Techniek',
      campus: 'Campus Pitzemburg',
    },
    {
      id: '4',
      name: 'Zorg en welzijn',
      educationLevel: 'Arbeidsmarkt',
      interest: 'Zorg',
      campus: 'Campus Caputsteen',
    },
    {
      id: '5',
      name: 'Bedrijfsorganisatie',
      educationLevel: 'Dubbele finaliteit',
      interest: 'Economie',
      campus: 'Campus Caputsteen',
    },
    {
      id: '6',
      name: 'Wetenschappen',
      educationLevel: 'Doorstroom',
      interest: 'Wetenschap',
      campus: 'Campus Pitzemburg',
    },
  ];

  const [searchText, setSearchText] = useState('');
  const [selectedEducationLevel, setSelectedEducationLevel] = useState('Alle');
  const [selectedInterest, setSelectedInterest] = useState('Alle');
  const [selectedCampus, setSelectedCampus] = useState('Alle');
  const [sortOrder, setSortOrder] = useState('A-Z');

  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch = course.name
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesEducationLevel =
        selectedEducationLevel === 'Alle' ||
        course.educationLevel === selectedEducationLevel;

      const matchesInterest =
        selectedInterest === 'Alle' ||
        course.interest === selectedInterest;

      const matchesCampus =
        selectedCampus === 'Alle' ||
        course.campus === selectedCampus;

      return (
        matchesSearch &&
        matchesEducationLevel &&
        matchesInterest &&
        matchesCampus
      );
    })
    .sort((a, b) => {
      if (sortOrder === 'A-Z') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Studiezoeker</Text>
      <Text style={styles.subtitle}>
        Zoek en filter opleidingen op naam, niveau, interesse en campus
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Zoek op naam..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <Text style={styles.filterTitle}>Onderwijsniveau</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedEducationLevel}
          onValueChange={(itemValue) => setSelectedEducationLevel(itemValue)}
        >
          <Picker.Item label="Alle" value="Alle" />
          <Picker.Item label="Doorstroom" value="Doorstroom" />
          <Picker.Item label="Dubbele finaliteit" value="Dubbele finaliteit" />
          <Picker.Item label="Arbeidsmarkt" value="Arbeidsmarkt" />
        </Picker>
      </View>

      <Text style={styles.filterTitle}>Interesse</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedInterest}
          onValueChange={(itemValue) => setSelectedInterest(itemValue)}
        >
          <Picker.Item label="Alle" value="Alle" />
          <Picker.Item label="Talen" value="Talen" />
          <Picker.Item label="Techniek" value="Techniek" />
          <Picker.Item label="Zorg" value="Zorg" />
          <Picker.Item label="Economie" value="Economie" />
          <Picker.Item label="Wetenschap" value="Wetenschap" />
        </Picker>
      </View>

      <Text style={styles.filterTitle}>Campus</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedCampus}
          onValueChange={(itemValue) => setSelectedCampus(itemValue)}
        >
          <Picker.Item label="Alle" value="Alle" />
          <Picker.Item label="Campus Caputsteen" value="Campus Caputsteen" />
          <Picker.Item label="Campus Pitzemburg" value="Campus Pitzemburg" />
        </Picker>
      </View>

      <View style={styles.sortRow}>
        <Pressable
          style={[
            styles.sortButton,
            sortOrder === 'A-Z' && styles.activeButton,
          ]}
          onPress={() => setSortOrder('A-Z')}
        >
          <Text style={styles.sortButtonText}>A-Z</Text>
        </Pressable>

        <Pressable
          style={[
            styles.sortButton,
            sortOrder === 'Z-A' && styles.activeButton,
          ]}
          onPress={() => setSortOrder('Z-A')}
        >
          <Text style={styles.sortButtonText}>Z-A</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.resetButton}
        onPress={() => {
          setSearchText('');
          setSelectedEducationLevel('Alle');
          setSelectedInterest('Alle');
          setSelectedCampus('Alle');
          setSortOrder('A-Z');
        }}
      >
        <Text style={styles.resetButtonText}>Reset filters</Text>
      </Pressable>

      {filteredCourses.map((course) => (
        <CourseCard
          key={course.id}
          name={course.name}
          educationLevel={course.educationLevel}
          interest={course.interest}
          campus={course.campus}
          onPress={() => console.log(course.name)}
        />
      ))}

      {filteredCourses.length === 0 && (
        <Text style={styles.emptyText}>Geen resultaten gevonden.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 10,
  },
  pickerWrapper: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  sortRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  sortButton: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  activeButton: {
    backgroundColor: '#339af0',
  },
  sortButtonText: {
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#222',
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  resetButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  emptyText: {
    marginTop: 20,
    fontStyle: 'italic',
    color: '#666',
  },
});