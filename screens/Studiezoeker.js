import { useEffect, useMemo, useState } from 'react';
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
import { fetchCourses, fetchCampuses } from '../services/webflow';

const niveauMap = {
  'b8776b89c98676dae45f5b2a4e7910bf': 'Duaal',
  '4801226ad7e3bc34070b095fe9471b5d': 'A-stroom',
  'cf698edb9d595658cf8607bdb30c224f': 'B-stroom',
  '4e3a3eb4c8ad787a814f22c841858076': 'Hoger onderwijs',
};

const interesseMap = {
  '1ae470322cfc3d1988040a4bd9c630bb': 'Technologie',
  '09df63966ad0c15e74e485941f65991c': 'Taal',
  '69388d6b9f024e16650540d98c80f4e8': 'Maatschappij',
  '7ba88edd26c56a336754fd49afcd7520': 'Zorg',
  '199c0b77334ddbceeb111afcf8912b2d': 'Wetenschap',
  '549aaeea34dedf319469eb1d4bd700a4': 'Kunst',
  'ee0b1493af6cb8bbd3c8b1520a9f187f': 'Sport',
};

export default function Studiezoeker() {
  const [courses, setCourses] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchText, setSearchText] = useState('');
  const [selectedEducationLevel, setSelectedEducationLevel] = useState('Alle');
  const [selectedInterest, setSelectedInterest] = useState('Alle');
  const [selectedCampus, setSelectedCampus] = useState('Alle');
  const [sortOrder, setSortOrder] = useState('A-Z');

  useEffect(() => {
    async function loadData() {
      try {
        const [courseItems, campusItems] = await Promise.all([
          fetchCourses(),
          fetchCampuses(),
        ]);

        console.log('COURSE ITEMS:', courseItems);
        console.log('CAMPUS ITEMS:', campusItems);

        setCourses(courseItems);
        setCampuses(campusItems);
        setError('');
      } catch (err) {
        console.log('LOAD ERROR:', err);
        setError(err.message || 'Kon opleidingen niet laden.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const campusMap = useMemo(() => {
    const map = {};
    campuses.forEach((item) => {
      map[item.id] = item.fieldData?.name || 'Onbekende campus';
    });
    return map;
  }, [campuses]);

  const mappedCourses = courses.map((item) => {
    const campusIds = item.fieldData?.campus || [];
    const firstCampusId = Array.isArray(campusIds) ? campusIds[0] : null;

    return {
      id: item.id,
      name: item.fieldData?.name || 'Geen naam',
      educationLevel:
        niveauMap[item.fieldData?.['niveau-2']] || 'Geen niveau',
      interest:
        interesseMap[item.fieldData?.['interesse-2']] || 'Geen interesse',
      campus: campusMap[firstCampusId] || 'Geen campus',
    };
  });

  const filteredCourses = mappedCourses
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
      }
      return b.name.localeCompare(a.name);
    });

  const educationLevels = [
    'Alle',
    ...new Set(
      mappedCourses
        .map((course) => course.educationLevel)
        .filter((value) => value && value !== 'Geen niveau')
    ),
  ];

  const interests = [
    'Alle',
    ...new Set(
      mappedCourses
        .map((course) => course.interest)
        .filter((value) => value && value !== 'Geen interesse')
    ),
  ];

  const campusesList = [
    'Alle',
    ...new Set(
      mappedCourses
        .map((course) => course.campus)
        .filter((value) => value && value !== 'Geen campus')
    ),
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Studiezoeker</Text>
      <Text style={styles.subtitle}>
        Zoek en filter opleidingen op naam, niveau, interesse en campus
      </Text>

      {loading && <Text>Opleidingen worden geladen...</Text>}
      {!!error && <Text>{error}</Text>}

      {!loading && !error && (
        <>
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
              onValueChange={(itemValue) =>
                setSelectedEducationLevel(itemValue)
              }
            >
              {educationLevels.map((level) => (
                <Picker.Item key={level} label={level} value={level} />
              ))}
            </Picker>
          </View>

          <Text style={styles.filterTitle}>Interesse</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedInterest}
              onValueChange={(itemValue) => setSelectedInterest(itemValue)}
            >
              {interests.map((interest) => (
                <Picker.Item key={interest} label={interest} value={interest} />
              ))}
            </Picker>
          </View>

          <Text style={styles.filterTitle}>Campus</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedCampus}
              onValueChange={(itemValue) => setSelectedCampus(itemValue)}
            >
              {campusesList.map((campus) => (
                <Picker.Item key={campus} label={campus} value={campus} />
              ))}
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
            />
          ))}

          {filteredCourses.length === 0 && (
            <Text style={styles.emptyText}>Geen resultaten gevonden.</Text>
          )}
        </>
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