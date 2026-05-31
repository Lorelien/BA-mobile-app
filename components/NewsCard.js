import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function NewsCard({
  title,
  category,
  date,
  description,
  accentColor = '#111111',
  onPress,
}) {
  return (
    <Pressable
      style={[styles.card, { borderLeftColor: accentColor }]}
      onPress={onPress}
    >
      <View style={styles.topRow}>
        {!!category && (
          <View style={[styles.badge, { backgroundColor: accentColor }]}>
            <Text style={styles.badgeText}>{String(category).toUpperCase()}</Text>
          </View>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>

      {!!description && (
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
      )}

      {!!date && <Text style={styles.date}>{date}</Text>}
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
  topRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#5f6368',
    marginBottom: 14,
  },
  date: {
    fontSize: 13,
    color: '#8b8f94',
    fontWeight: '500',
  },
});