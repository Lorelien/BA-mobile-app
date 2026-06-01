import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import HomeScreen from './screens/HomeScreen';
import Studiezoeker from './screens/Studiezoeker';
import CampusDetailsScreen from './screens/CampusDetailsScreen';
import NewsDetailsScreen from './screens/NewsDetailsScreen';
import MiniGameScreen from './screens/MiniGameScreen';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const PRIMARY_GREEN = '#86bc25';

function HeaderLogo() {
  return (
    <Image
      source={require('./assets/images/Logo mobile.png')}
      style={styles.headerLogo}
      resizeMode="contain"
    />
  );
}

function MenuButton({ navigation }) {
  return (
    <Pressable
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={styles.menuButton}
    >
      <Text style={styles.menuButtonText}>☰</Text>
    </Pressable>
  );
}

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
  headerTitleAlign: 'left',
  headerTitle: () => <HeaderLogo />,
  headerRight: () => <MenuButton navigation={navigation} />,
})}
    >
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="CampusDetails"
        component={CampusDetailsScreen}
        options={{ title: 'Campus details' }}
      />
      <Stack.Screen
        name="NewsDetails"
        component={NewsDetailsScreen}
        options={{ title: 'Nieuws details' }}
      />
      <Stack.Screen
        name="MiniGame"
        component={MiniGameScreen}
        options={{ title: 'Mini game' }}
      />
    </Stack.Navigator>
  );
}

function StudiezoekerStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleAlign: 'left',
        headerTitle: () => <HeaderLogo />,
        headerRight: () => <MenuButton navigation={navigation} />,
      })}
    >
      <Stack.Screen
        name="StudiezoekerMain"
        component={Studiezoeker}
        options={{ title: 'Studiezoeker' }}
      />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  const { navigation } = props;

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <Text style={styles.drawerTitle}>Menu</Text>

      <Pressable
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.drawerItemText}>Home</Text>
      </Pressable>

      <Pressable
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Studiezoeker')}
      >
        <Text style={styles.drawerItemText}>Studiezoeker</Text>
      </Pressable>

      <View style={styles.drawerItemDisabled}>
        <Text style={styles.drawerItemDisabledText}>Nieuws</Text>
      </View>

      <View style={styles.drawerItemDisabled}>
        <Text style={styles.drawerItemDisabledText}>Campussen</Text>
      </View>
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
        }}
      >
        <Drawer.Screen name="Home" component={HomeStackNavigator} />
        <Drawer.Screen name="Studiezoeker" component={StudiezoekerStackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    marginRight: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  menuButtonText: {
    fontSize: 28,
    color: PRIMARY_GREEN,
    fontWeight: '700',
  },
  drawerContent: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f3',
  },
  drawerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: PRIMARY_GREEN,
    marginBottom: 24,
  },
  drawerItem: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  drawerItemText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111111',
  },
  drawerItemDisabled: {
    backgroundColor: '#e8e8e8',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 12,
    opacity: 0.8,
  },
  drawerItemDisabledText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#777777',
  },
  headerLogo: {
  width: 42,
  height: 42,
},
});