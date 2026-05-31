import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Linking,
} from 'react-native';

const CATEGORY_BG = '#f5f0e8';

const getImageUrl = (img) => {
  if (!img) return null;
  if (typeof img === 'string') return img;
  if (typeof img === 'object' && typeof img.url === 'string') return img.url;
  return null;
};

export default function CampusDetailsScreen({ route }) {
  const campusItem = route?.params?.campusItem || {};

  console.log('CAMPUS DETAILS ITEM:', campusItem);
  console.log('CAMPUS DETAILS IMAGE:', campusItem?.image);

  const title = campusItem?.title || 'Geen titel';
  const category = campusItem?.category || 'Campus';
  const description =
    campusItem?.description || 'Geen beschrijving beschikbaar.';
  const address = campusItem?.address || 'Geen adres beschikbaar';
  const email = campusItem?.email || 'Geen e-mail beschikbaar';
  const color = campusItem?.color || '#111111';

  const imageUrl = getImageUrl(campusItem?.image);

  const handleMailPress = async () => {
    if (!email || email === 'Geen e-mail beschikbaar') return;
    const url = `mailto:${email}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    }
  };

  const handleEnrollPress = async () => {
    const url = 'https://www.ba.be/inschrijven';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!!imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.heroImage}
          resizeMode="cover"
        />
      )}

      <View style={styles.topCard}>
        <View style={styles.badge}>
          <Text style={[styles.badgeText, { color }]}>{category}</Text>
        </View>

        <Text style={[styles.title, { color }]}>{title}</Text>
        <Text style={styles.address}>{address}</Text>

        <Pressable
          style={[styles.enrollButton, { backgroundColor: color }]}
          onPress={handleEnrollPress}
        >
          <Text style={styles.enrollButtonText}>Inschrijven</Text>
        </Pressable>
      </View>

      <View style={styles.sectionCard}>
        <Text style={[styles.sectionTitle, { color }]}>Over de campus</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={[styles.sectionTitle, { color }]}>Contact</Text>

        <View style={styles.contactBlock}>
          <Text style={styles.contactLabel}>Adres</Text>
          <Text style={styles.contactText}>{address}</Text>
        </View>

        <View style={styles.contactBlock}>
          <Text style={styles.contactLabel}>Email</Text>
          <Text style={styles.contactText} onPress={handleMailPress}>
            {email}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f7f7f5',
  },
  heroImage: {
    width: '100%',
    height: 260,
    borderRadius: 16,
    marginBottom: -24,
  },
  topCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: CATEGORY_BG,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 10,
  },
  address: {
    fontSize: 18,
    lineHeight: 28,
    color: '#111111',
    marginBottom: 20,
  },
  enrollButton: {
    alignSelf: 'flex-start',
    borderRadius: 16,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  enrollButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    lineHeight: 31,
    color: '#111111',
  },
  contactBlock: {
    marginBottom: 18,
  },
  contactLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 6,
  },
  contactText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#111111',
  },
});