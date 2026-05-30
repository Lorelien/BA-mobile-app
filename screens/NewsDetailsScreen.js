import { View, Text, StyleSheet } from 'react-native';

export default function NewsDetailsScreen({ route }) {
  const { newsItem } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{newsItem.title}</Text>
      <Text style={styles.category}>{newsItem.category}</Text>
      <Text style={styles.content}>{newsItem.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});