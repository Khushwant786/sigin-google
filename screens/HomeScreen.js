import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function HomeScreen({ setUserInfo }) {
  const [error, setError] = useState('');

  const logout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (e) {
      setError('Logout failed. Try again.');
      console.error('Logout Error:', e);
    } finally {
      if (typeof setUserInfo === 'function') {
        setUserInfo(null);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to the Home Screen!</Text>
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  welcome: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
