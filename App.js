import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import Studiezoeker from './screens/Studiezoeker';
import CampusDetailsScreen from './screens/CampusDetailsScreen';
import NewsDetailsScreen from './screens/NewsDetailsScreen';
import MiniGameScreen from './screens/MiniGameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Studiezoeker" component={Studiezoeker} />
        <Stack.Screen name="CampusDetails" component={CampusDetailsScreen} />
        <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} />
        <Stack.Screen name="MiniGame" component={MiniGameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}