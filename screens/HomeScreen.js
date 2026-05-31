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

  const newsCategoryMap = {
  '6a11af2049ee8658828ef6f1': 'Activiteit',
  '6a11af67c652b2bcd587e90c': 'Terugblik',
  '6a11aefaa4b44b5af57ae9db': 'Nieuws',
};

function formatDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);

  return date.toLocaleDateString('nl-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

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
  newsItems.map((item) => {
    const categoryIds = item.fieldData?.categories || [];
    const firstCategoryId = Array.isArray(categoryIds) ? categoryIds[0] : null;

    return (
      <NewsCard
        key={item.id}
        title={item.fieldData?.title || item.fieldData?.name || 'Geen titel'}
        category={newsCategoryMap[firstCategoryId] || 'Nieuws'}
        date={formatDate(item.fieldData?.datum)}
        description={item.fieldData?.['short-description'] || ''}
        accentColor={item.fieldData?.color || '#111111'}
        onPress={() =>
          navigation.navigate('NewsDetails', {
            newsItem: item,
          })
        }
      />
    );
  })}
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
  campusItems.map((item) => {
    console.log('CAMPUS FIELD DATA:', item.fieldData);
    console.log('CAMPUS ADDRESS:', item.fieldData?.adres);

    return (
      <CampusCard
        key={item.id}
        name={item.fieldData?.name || 'Geen naam'}
        description={item.fieldData?.description || 'Geen beschrijving'}
        address={item.fieldData?.adres || 'Geen adres'}
        color={item.fieldData?.color || '#111111'}
        onPress={() =>
          navigation.navigate('CampusDetails', {
            campusItem: {
              title: item.fieldData?.name || 'Geen naam',
              description: item.fieldData?.description || 'Geen beschrijving',
              content: item.fieldData?.['long-description'] || 'Geen inhoud',
              address: item.fieldData?.adres || 'Geen adres',
              email: item.fieldData?.email || 'Geen e-mail',
              image: item.fieldData?.image || null,
              color: item.fieldData?.color || '#111111',
            },
          })
        }
      />
    );
  })}
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