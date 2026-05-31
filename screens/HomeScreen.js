import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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

  const [selectedNewsCategory, setSelectedNewsCategory] = useState('Alle');
  const [selectedCampusCategory, setSelectedCampusCategory] = useState('Alle');

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

  const newsCategoryOptions = ['Alle', ...Object.values(newsCategoryMap)];

  const campusCategoryOptions = [
    'Alle',
    ...new Set(
      campusItems
        .map((item) => item.fieldData?.description)
        .filter(Boolean)
    ),
  ];

  const filteredNewsItems = newsItems.filter((item) => {
    if (selectedNewsCategory === 'Alle') return true;

    const categoryIds = item.fieldData?.categories || [];
    const firstCategoryId = Array.isArray(categoryIds) ? categoryIds[0] : null;
    const categoryName = newsCategoryMap[firstCategoryId] || 'Nieuws';

    return categoryName === selectedNewsCategory;
  });

  const filteredCampusItems = campusItems.filter((item) => {
    if (selectedCampusCategory === 'Alle') return true;

    const campusCategory = item.fieldData?.description || '';
    return campusCategory === selectedCampusCategory;
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Home</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Studiezoeker</Text>
        <Button
          title="Ga naar studiezoeker"
          onPress={() => navigation.navigate('Studiezoeker')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Laatste nieuws</Text>

        {loadingNews ? (
          <Text style={styles.statusText}>Nieuws wordt geladen...</Text>
        ) : null}

        {newsError ? (
          <Text style={styles.statusText}>{newsError}</Text>
        ) : null}

        {!loadingNews && !newsError && (
          <>
            <Text style={styles.filterTitle}>Filter op categorie</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedNewsCategory}
                onValueChange={(itemValue) => setSelectedNewsCategory(itemValue)}
              >
                {newsCategoryOptions.map((category) => (
                  <Picker.Item
                    key={category}
                    label={category}
                    value={category}
                  />
                ))}
              </Picker>
            </View>
          </>
        )}

        {!loadingNews && !newsError && filteredNewsItems.length === 0 ? (
          <Text style={styles.statusText}>Geen nieuws gevonden.</Text>
        ) : null}

        {!loadingNews &&
          !newsError &&
          filteredNewsItems.map((item) => {
            const categoryIds = item.fieldData?.categories || [];
            const firstCategoryId = Array.isArray(categoryIds)
              ? categoryIds[0]
              : null;

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

        {loadingCampuses ? (
          <Text style={styles.statusText}>Campussen worden geladen...</Text>
        ) : null}

        {campusError ? (
          <Text style={styles.statusText}>{campusError}</Text>
        ) : null}

        {!loadingCampuses && !campusError && (
          <>
            <Text style={styles.filterTitle}>Filter op categorie</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedCampusCategory}
                onValueChange={(itemValue) => setSelectedCampusCategory(itemValue)}
              >
                {campusCategoryOptions.map((category) => (
                  <Picker.Item
                    key={category}
                    label={category}
                    value={category}
                  />
                ))}
              </Picker>
            </View>
          </>
        )}

        {!loadingCampuses && !campusError && filteredCampusItems.length === 0 ? (
          <Text style={styles.statusText}>Geen campussen gevonden.</Text>
        ) : null}

        {!loadingCampuses &&
          !campusError &&
          filteredCampusItems.map((item) => (
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
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f5f5f3',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 24,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 12,
  },
  statusText: {
    fontSize: 15,
    color: '#5f6368',
    marginBottom: 12,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 8,
  },
  pickerWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});