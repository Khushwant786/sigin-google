// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './firebaseConfig';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userInfo ? (
          <Stack.Screen name="Home">
            {() => <HomeScreen setUserInfo={setUserInfo} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login">
              {() => <LoginScreen setUserInfo={setUserInfo} />}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {() => <SignupScreen setUserInfo={setUserInfo} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

