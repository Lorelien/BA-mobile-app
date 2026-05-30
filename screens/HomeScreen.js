import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import NewsCard from '../components/NewsCard';
import CampusCard from '../components/CampusCard';

export default function HomeScreen({ navigation }) {
  const newsItems = [
    { id: '1', title: 'Opendeurdag', category: 'Event' },
    { id: '2', title: 'Nieuwe studierichting', category: 'Studie' },
  ];

  const campusItems = [
    { id: '1', name: 'Campus Caputsteen', city: 'Mechelen' },
    { id: '2', name: 'Campus Pitzemburg', city: 'Mechelen' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Busleyden Atheneum</Text>
      <Text style={styles.subtitle}>Welkom in de app</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Studiezoeker</Text>
        <Button
          title="Ga naar studiezoeker"
          onPress={() => navigation.navigate('Studiezoeker')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Laatste nieuws</Text>
        {newsItems.map((item) => (
        <NewsCard
    key={item.id}
    title={item.title}
    category={item.category}
  />
))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Onze campussen</Text>
        {campusItems.map((item) => (
          <CampusCard
            key={item.id}
            name={item.name}
            category={item.category}
          />
        ))}
      </View>
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
    marginBottom: 24,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});