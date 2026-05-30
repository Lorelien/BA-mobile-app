import { Pressable, Text, StyleSheet } from 'react-native';

export default function CampusCard({ name, category, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.cardTitle}>{name}</Text>
      <Text style={styles.cardText}>{category}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardPressed: {
    opacity: 0.7,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
  },
});