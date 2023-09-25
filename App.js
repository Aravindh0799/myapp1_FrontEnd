import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import Sample from './screens/Sample';
import SignupScreen2 from './screens/SignupScreen2';
import ApplyScreen from './screens/ApplyScreen';
import TrackScreen from './screens/TrackScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
      <Stack.Screen options={{headerShown:false}} name="Signup" component={SignupScreen} />
      <Stack.Screen options={{headerShown:false}} name="Signup2" component={SignupScreen2} />
      <Stack.Screen options={{headerShown:false}} name="Sample" component={Sample} />
      <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
      <Stack.Screen options={{headerShown:false}} name ="Apply" component={ApplyScreen}/>
      <Stack.Screen options={{headerShown:false}} name ="Track" component={TrackScreen}/>
      
      
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
