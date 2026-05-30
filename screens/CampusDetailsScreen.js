import { View, Text, StyleSheet } from 'react-native';

export default function CampusDetailsScreen({ route }) {
  const { campusItem } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{campusItem.name}</Text>
      <Text style={styles.category}>{campusItem.category}</Text>
      <Text style={styles.content}>{campusItem.description}</Text>
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