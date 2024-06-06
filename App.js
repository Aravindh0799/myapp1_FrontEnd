// import { StatusBar } from 'expo-status-bar';
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
import BfideScreen from './screens/BfideScreen';
import ChangePwdScreen from './screens/changePwd';
import ForgotPwdScreen from './screens/forgotPwd';
import 'react-native-gesture-handler';
import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';


const Stack = createNativeStackNavigator();
export default function App() {



  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  useEffect(() => {
    onFetchUpdateAsync()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Signup" component={SignupScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Signup2" component={SignupScreen2} />
        <Stack.Screen options={{ headerShown: false }} name="Sample" component={Sample} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Apply" component={ApplyScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Track" component={TrackScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Bfide" component={BfideScreen} />
        <Stack.Screen options={{ headerShown: false }} name="changePwd" component={ChangePwdScreen} />
        <Stack.Screen options={{ headerShown: false }} name="frgPwd" component={ForgotPwdScreen} />



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
