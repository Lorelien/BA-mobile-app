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

export default function CampusDetailsScreen({ route }) {
  const { campusItem } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{campusItem.title}</Text>
      <Text style={styles.category}>{campusItem.category}</Text>

      {campusItem.image?.url && (
        <Image source={{ uri: campusItem.image.url }} style={styles.image} />
      )}

      <Text style={styles.info}>{campusItem.address}</Text>
      <Text style={styles.info}>{campusItem.email}</Text>

      <Text style={styles.content}>
        {stripHtml(campusItem.content)}
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
    marginBottom: 8,
  },
  category: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  info: {
    fontSize: 15,
    marginBottom: 8,
    color: '#444',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
  },
});