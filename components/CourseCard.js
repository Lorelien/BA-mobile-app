import { View, Text, StyleSheet } from 'react-native';

export default function CourseCard({
  name,
  educationLevel,
  interest,
  campus,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.text}>Niveau: {educationLevel}</Text>
      <Text style={styles.text}>Interesse: {interest}</Text>
      <Text style={styles.text}>Campus: {campus}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
});