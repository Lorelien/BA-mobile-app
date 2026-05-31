import { ScrollView, Text, StyleSheet, View, Image, useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';

const PRIMARY_GREEN = '#86bc25';

export default function NewsDetails({ route }) {
  const { width } = useWindowDimensions();

  const newsItem = route?.params?.newsItem;
  const fieldData = newsItem?.fieldData || {};

  const title = fieldData?.title || fieldData?.name || 'Geen titel';

  const date = fieldData?.datum
    ? new Date(fieldData.datum).toLocaleDateString('nl-BE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  const shortDescription = fieldData?.['short-description'] || '';
  const htmlContent = fieldData?.['text-image'] || '';
  const imageUrl = fieldData?.image?.url || null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {!!date && <Text style={styles.date}>{date}</Text>}

      {!!imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.heroImage}
          resizeMode="cover"
        />
      )}

      {!!shortDescription && (
        <View style={styles.introBox}>
          <Text style={styles.introText}>{shortDescription}</Text>
        </View>
      )}

      {!!htmlContent ? (
        <RenderHTML
          contentWidth={width - 40}
          source={{ html: htmlContent }}
          tagsStyles={{
            p: styles.paragraph,
            strong: styles.strong,
            b: styles.strong,
            h1: styles.htmlHeading,
            h2: styles.htmlHeading,
            h3: styles.htmlSubheading,
            li: styles.listItem,
            ul: styles.list,
            ol: styles.list,
          }}
        />
      ) : (
        <Text style={styles.content}>Geen inhoud beschikbaar.</Text>
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
    fontSize: 30,
    fontWeight: '800',
    color: PRIMARY_GREEN,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 20,
  },
  introBox: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#222',
    fontWeight: '600',
  },
  content: {
    fontSize: 16,
    lineHeight: 26,
    color: '#111',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: '#111',
    marginBottom: 16,
  },
  strong: {
    fontWeight: '700',
    color: '#111',
  },
  htmlHeading: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    color: PRIMARY_GREEN,
    marginTop: 8,
    marginBottom: 12,
  },
  htmlSubheading: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    color: '#111',
    marginTop: 8,
    marginBottom: 10,
  },
  list: {
    marginBottom: 16,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 26,
    color: '#111',
  },
});