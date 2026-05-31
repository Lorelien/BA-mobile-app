import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function CampusCard({
  name,
  description,
  address,
  color = '#111111',
  onPress,
}) {
  return (
    <Pressable
      style={[styles.card, { borderLeftColor: color }]}
      onPress={onPress}
    >
      <View style={[styles.colorDot, { backgroundColor: color }]} />

      <Text style={styles.title}>{name}</Text>

      {!!description && (
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      )}

      {!!address && (
        <Text style={styles.address} numberOfLines={2}>
          {address}
        </Text>
      )}
    </Pressable>
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
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 999,
    marginBottom: 14,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4f545a',
    marginBottom: 10,
  },
  address: {
    fontSize: 14,
    lineHeight: 21,
    color: '#8a9096',
  },
});