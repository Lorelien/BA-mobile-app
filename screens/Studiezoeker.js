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
      <View style={styles.filterGroup}>
        <Pressable
          style={[
            styles.filterButton,
            selectedEducationLevel === 'Alle' && styles.activeButton,
          ]}
          onPress={() => setSelectedEducationLevel('Alle')}
        >
          <Text style={styles.filterText}>Alle</Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            selectedEducationLevel === 'Doorstroom' && styles.activeButton,
          ]}
          onPress={() => setSelectedEducationLevel('Doorstroom')}
        >
          <Text style={styles.filterText}>Doorstroom</Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            selectedEducationLevel === 'Dubbele finaliteit' && styles.activeButton,
          ]}
          onPress={() => setSelectedEducationLevel('Dubbele finaliteit')}
        >
          <Text style={styles.filterText}>Dubbele finaliteit</Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            selectedEducationLevel === 'Arbeidsmarkt' && styles.activeButton,
          ]}
          onPress={() => setSelectedEducationLevel('Arbeidsmarkt')}
        >
          <Text style={styles.filterText}>Arbeidsmarkt</Text>
        </Pressable>
      </View>

      <Text style={styles.filterTitle}>Interesse</Text>
      <View style={styles.filterGroup}>
        <Pressable
          style={[
            styles.filterButton,
            selectedInterest === 'Alle' && styles.activeButton,
          ]}
          onPress={() => setSelectedInterest('Alle')}
        >
          <Text style={styles.filterText}>Alle</Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            selectedInterest === 'Talen' && styles.activeButton,
          ]}
          onPress={() => setSelectedInterest('Talen')}
        >
          <Text style={styles.filterText}>Talen</Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            selectedInterest === 'Techniek' && styles.activeButton,
          ]}
          onPress={() => setSelectedInterest('Techniek')}
        >
          <Text style={styles.filterText}>Techniek</Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            selectedInterest === 'Zorg' && styles.activeButton,
          ]}
          onPress={() => setSelectedInterest('Zorg')}
        >
          <Text style={styles.filterText}>Zorg</Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            selectedInterest === 'Economie' && styles.activeButton,
          ]}
          onPress={() => setSelectedInterest('Economie')}
        >
          <Text style={styles.filterText}>Economie</Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            selectedInterest === 'Wetenschap' && styles.activeButton,
          ]}
          onPress={() => setSelectedInterest('Wetenschap')}
        >
          <Text style={styles.filterText}>Wetenschap</Text>
        </Pressable>
      </View>

      <Text style={styles.filterTitle}>Campus</Text>
      <View style={styles.filterGroup}>
        <Pressable
          style={[
            styles.filterButton,
            selectedCampus === 'Alle' && styles.activeButton,
          ]}
          onPress={() => setSelectedCampus('Alle')}
        >
          <Text style={styles.filterText}>Alle</Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            selectedCampus === 'Campus Caputsteen' && styles.activeButton,
          ]}
          onPress={() => setSelectedCampus('Campus Caputsteen')}
        >
          <Text style={styles.filterText}>Caputsteen</Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            selectedCampus === 'Campus Pitzemburg' && styles.activeButton,
          ]}
          onPress={() => setSelectedCampus('Campus Pitzemburg')}
        >
          <Text style={styles.filterText}>Pitzemburg</Text>
        </Pressable>
      </View>

      <View style={styles.sortRow}>
        <Pressable
          style={[
            styles.sortButton,
            sortOrder === 'A-Z' && styles.activeButton,
          ]}
          onPress={() => setSortOrder('A-Z')}
        >
          <Text style={styles.filterText}>A-Z</Text>
        </Pressable>

        <Pressable
          style={[
            styles.sortButton,
            sortOrder === 'Z-A' && styles.activeButton,
          ]}
          onPress={() => setSortOrder('Z-A')}
        >
          <Text style={styles.filterText}>Z-A</Text>
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
  filterButton: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
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
  filterText: {
    color: '#000',
    fontWeight: '600',
  },
  emptyText: {
    marginTop: 20,
    fontStyle: 'italic',
    color: '#666',
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 10,
  },
  filterGroup: {
    marginBottom: 16,
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
});