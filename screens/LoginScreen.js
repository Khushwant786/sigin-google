// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  auth,
  db,
  doc,
  setDoc,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from '../firebaseConfig';
import { Timestamp } from 'firebase/firestore';

export default function LoginScreen({ setUserInfo }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const saveUserToFirestore = async (user) => {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      name: user.displayName || '',
      email: user.email,
      provider: 'email',
      lastLogin: Timestamp.now()
    }, { merge: true });
  };

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await saveUserToFirestore(userCredential.user);
      setUserInfo(userCredential.user);
      navigation.replace('Home');
    } catch (e) {
      if (e.code === 'auth/wrong-password') {
        setError('Wrong password');
      } else if (e.code === 'auth/user-not-found') {
        setError('No user found with this email');
      } else {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Input Required', 'Please enter your email address first.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Password Reset Sent', 'Check your email for a reset link.');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      {loading ? <ActivityIndicator size="large" style={{ marginVertical: 20 }} /> : (
        <Button title="Login" onPress={handleLogin} />
      )}

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>New user? Register!</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    marginTop: 15,
    textAlign: 'center'
  },
});
