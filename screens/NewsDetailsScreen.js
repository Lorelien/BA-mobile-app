import { ScrollView, Text, StyleSheet, Image } from 'react-native';

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
}

export default function NewsDetailsScreen({ route }) {
  const { newsItem } = route.params;

  const cleanContent = stripHtml(newsItem.content);
  const cleanShortDescription = stripHtml(newsItem.shortDescription);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{newsItem.title}</Text>
      <Text style={styles.category}>{newsItem.category}</Text>
      <Text style={styles.date}>{newsItem.date}</Text>

      {newsItem.image?.url && (
        <Image source={{ uri: newsItem.image.url }} style={styles.image} />
      )}

      {cleanShortDescription ? (
        <Text style={styles.shortDescription}>{cleanShortDescription}</Text>
      ) : null}

      <Text style={styles.content}>
        {cleanContent || 'Geen inhoud beschikbaar.'}
      </Text>
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
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  shortDescription: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    lineHeight: 24,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});