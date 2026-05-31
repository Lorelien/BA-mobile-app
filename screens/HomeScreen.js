import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import NewsCard from '../components/NewsCard';
import CampusCard from '../components/CampusCard';
import { fetchNews, fetchCampuses } from '../services/webflow';

export default function HomeScreen({ navigation }) {
  const [newsItems, setNewsItems] = useState([]);
  const [campusItems, setCampusItems] = useState([]);

  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingCampuses, setLoadingCampuses] = useState(true);

  const [newsError, setNewsError] = useState('');
  const [campusError, setCampusError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const news = await fetchNews();
        setNewsItems(news);
        setNewsError('');
      } catch (err) {
        console.log('NEWS ERROR:', err);
        setNewsError(err.message || 'Kon nieuws niet laden.');
      } finally {
        setLoadingNews(false);
      }

      try {
        const campuses = await fetchCampuses();
        setCampusItems(campuses);
        setCampusError('');
      } catch (err) {
        console.log('CAMPUS ERROR:', err);
        setCampusError(err.message || 'Kon campussen niet laden.');
      } finally {
        setLoadingCampuses(false);
      }
    }

    loadData();
  }, []);

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

        {loadingNews ? <Text>Nieuws wordt geladen...</Text> : null}
        {newsError ? <Text>{newsError}</Text> : null}

        {!loadingNews && !newsError && newsItems.length === 0 ? (
          <Text>Geen nieuws gevonden.</Text>
        ) : null}

        {!loadingNews &&
          !newsError &&
          newsItems.map((item) => (
            <NewsCard
              key={item.id}
              title={item.fieldData?.title || 'Geen titel'}
              category="Nieuws"
              onPress={() =>
                navigation.navigate('NewsDetails', {
                  newsItem: {
                    title: item.fieldData?.title || 'Geen titel',
                    category: 'Nieuws',
                    shortDescription:
                      item.fieldData?.['short-description'] ||
                      'Geen korte beschrijving',
                    content:
                      item.fieldData?.['text-image'] ||
                      item.fieldData?.['short-description'] ||
                      'Geen inhoud',
                    date: item.fieldData?.datum || 'Geen datum',
                    image: item.fieldData?.image || null,
                  },
                })
              }
            />
          ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Onze campussen</Text>

        {loadingCampuses ? <Text>Campussen worden geladen...</Text> : null}
        {campusError ? <Text>{campusError}</Text> : null}

        {!loadingCampuses && !campusError && campusItems.length === 0 ? (
          <Text>Geen campussen gevonden.</Text>
        ) : null}

        {!loadingCampuses &&
  !campusError &&
  campusItems.map((item) => (
    <CampusCard
      key={item.id}
      name={item.fieldData?.name || 'Geen naam'}
      category={item.fieldData?.description || 'Geen beschrijving'}
      onPress={() =>
        navigation.navigate('CampusDetails', {
          campusItem: {
            title: item.fieldData?.name || 'Geen naam',
            category: item.fieldData?.description || 'Campus',
            description: item.fieldData?.description || 'Geen beschrijving',
            content: item.fieldData?.['long-description'] || 'Geen inhoud',
            address: item.fieldData?.adress || 'Geen adres',
            email: item.fieldData?.email || 'Geen e-mail',
            image: item.fieldData?.image || null,
          },
        })
      }
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