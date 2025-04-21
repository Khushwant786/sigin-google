import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

export default function SignupScreen({ setUserInfo }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "516061784024-qoe79pir7vrl1h05fiaoq8iaesdiieef.apps.googleusercontent.com",
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      if (typeof setUserInfo === 'function') {
        setUserInfo(user);
      } else {
        setError('Google Sign-In: setUserInfo is not defined');
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const handleSignup = () => {
    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }
    if (typeof setUserInfo === 'function') {
      setUserInfo({ user: { name, email } });
    } else {
      setError('Signup: setUserInfo is not defined');
    }
  };

  return (
    <View style={styles.container}>
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Sign Up" onPress={handleSignup} />
      <View style={{ marginTop: 20 }}>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
