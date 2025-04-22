// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth, signOut } from '../firebaseConfig';

export default function HomeScreen({ setUserInfo }) {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await GoogleSignin.revokeAccess().catch(() => {}); // Ignore if not Google user
      await GoogleSignin.signOut().catch(() => {});
      await signOut(auth);
      setUserInfo(null);
      
    } catch (e) {
      console.error('Logout failed:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome! You are logged in ✅</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});