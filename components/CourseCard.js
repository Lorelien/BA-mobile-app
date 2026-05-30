import { Pressable, Text, View, StyleSheet } from 'react-native';

export default function CourseCard({
  name,
  educationLevel,
  interest,
  campus,
  onPress,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.title}>{name}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Niveau:</Text>
        <Text style={styles.value}>{educationLevel}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Interesse:</Text>
        <Text style={styles.value}>{interest}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Campus:</Text>
        <Text style={styles.value}>{campus}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f7f7f7',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardPressed: {
    opacity: 0.7,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 6,
  },
  value: {
    color: '#555',
  },
});