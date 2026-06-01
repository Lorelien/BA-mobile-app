import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function NewsDetailsScreen({ route }) {
  const { newsItem } = route.params;

  const title =
    newsItem?.fieldData?.title ||
    newsItem?.fieldData?.name ||
    'Geen titel';

  const accentColor = newsItem?.fieldData?.color || '#111111';

  const date =
    newsItem?.fieldData?.datum ||
    newsItem?.fieldData?.date ||
    '';

  const campus =
    newsItem?.fieldData?.campus ||
    newsItem?.fieldData?.campusnaam ||
    newsItem?.fieldData?.locatie ||
    newsItem?.fieldData?.location ||
    '';

  const shortDescription =
    newsItem?.fieldData?.['short-description'] || '';

  const fullTextHtml =
    newsItem?.fieldData?.['text-image'] ||
    newsItem?.fieldData?.description ||
    newsItem?.fieldData?.['long-description'] ||
    '';

  const imageUrl =
    newsItem?.fieldData?.image?.url ||
    newsItem?.fieldData?.['main-image']?.url ||
    newsItem?.fieldData?.image ||
    newsItem?.fieldData?.['main-image'] ||
    null;

  function formatDate(dateString) {
    if (!dateString) return '';

    const newDate = new Date(dateString);

    if (isNaN(newDate)) return dateString;

    return newDate.toLocaleDateString('nl-BE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  function stripHtml(html) {
    if (!html) return '';
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const fullText = stripHtml(fullTextHtml);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, { color: accentColor }]}>
        {title}
      </Text>

      {(date || campus) ? (
        <Text style={styles.meta}>
          {formatDate(date)}
          {date && campus ? ' • ' : ''}
          {campus}
        </Text>
      ) : null}

      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : null}

      {!!shortDescription && (
  <View style={styles.shortDescriptionBox}>
    <Text style={styles.shortDescription}>{shortDescription}</Text>
  </View>
)}

      {!!fullText && (
        <Text style={styles.description}>{fullText}</Text>
      )}
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
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 10,
    fontFamily: 'Poppins',
    lineHeight: 38,
  },
  meta: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    fontFamily: 'Poppins',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    marginBottom: 20,
  },
  shortDescription: {
    fontSize: 18,
    lineHeight: 28,
    color: '#222222',
    fontFamily: 'Poppins',
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    color: '#222222',
    fontFamily: 'Poppins',
  },
  shortDescriptionBox: {
  backgroundColor: '#ffffff',
  borderRadius: 16,
  padding: 16,
  marginBottom: 18,
  shadowColor: '#000',
  shadowOpacity: 0.06,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
},

shortDescription: {
  fontSize: 18,
  lineHeight: 28,
  color: '#222222',
  fontFamily: 'Poppins',
  fontWeight: '600',
},
});