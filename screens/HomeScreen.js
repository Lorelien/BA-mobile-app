import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import NewsCard from '../components/NewsCard';
import CampusCard from '../components/CampusCard';

export default function HomeScreen({ navigation }) {
  const newsItems = [
  {
    id: '1',
    title: 'Opendeurdag',
    category: 'Event',
    content: 'Kom kennismaken met onze school tijdens de opendeurdag.',
  },
  {
    id: '2',
    title: 'Nieuwe studierichting',
    category: 'Studie',
    content: 'Vanaf volgend schooljaar lanceren we een nieuwe richting.',
  },
];

  const campusItems = [
  {
    id: '1',
    name: 'Campus Caputsteen',
    category: 'Doorstroom',
    description: 'Een campus met focus op doorstroomrichtingen.',
  },
  {
    id: '2',
    name: 'Campus Pitzemburg',
    category: 'Dubbele finaliteit',
    description: 'Een campus met verschillende praktijkgerichte richtingen.',
  },
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
    onPress={() => navigation.navigate('NewsDetails', { newsItem: item })}
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
    onPress={() => navigation.navigate('CampusDetails', { campusItem: item })}
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