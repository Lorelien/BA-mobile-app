import { View, Text, StyleSheet } from 'react-native';

export default function CourseCard({
  name,
  educationLevel,
  interest,
  campus,
  campusColor = '#111111',
}) {
  return (
    <View style={[styles.card, { borderLeftColor: campusColor }]}>
      <View style={styles.topRow}>
        <View style={[styles.dot, { backgroundColor: campusColor }]} />
        {!!campus && (
          <Text style={[styles.campusBadge, { color: campusColor }]}>
            {campus.toUpperCase()}
          </Text>
        )}
      </View>

      <Text style={styles.title}>{name}</Text>

      {!!educationLevel && (
        <Text style={styles.metaText}>
          <Text style={styles.metaLabel}>Niveau: </Text>
          {educationLevel}
        </Text>
      )}

      {!!interest && (
        <Text style={styles.metaText}>
          <Text style={styles.metaLabel}>Interesse: </Text>
          {interest}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    borderLeftWidth: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 999,
    marginRight: 10,
  },
  campusBadge: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 12,
  },
  metaText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4f545a',
    marginBottom: 6,
  },
  metaLabel: {
    fontWeight: '700',
    color: '#111111',
  },
});