import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const CATEGORY_BG = '#f5f0e8';

export default function CampusCard({
  title,
  address,
  category,
  color = '#111111',
  onPress,
}) {
  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      <View style={[styles.leftBorder, { backgroundColor: color }]} />

      <View style={styles.card}>
        {!!category && (
          <View style={styles.categoryBadge}>
            <Text style={[styles.categoryText, { color }]} numberOfLines={1}>
              {category}
            </Text>
          </View>
        )}

        {!!title && (
          <Text style={[styles.title, { color }]} numberOfLines={2}>
            {title}
          </Text>
        )}

        {!!address && (
          <Text style={styles.address} numberOfLines={2}>
            {address}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  leftBorder: {
    width: 8,
  },
  card: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: CATEGORY_BG,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
    lineHeight: 30,
  },
  address: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4a4a4a',
  },
});