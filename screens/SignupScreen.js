// screens/SignupScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import {
  auth,
  GoogleAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification
} from '../firebaseConfig';

export default function SignupScreen({ setUserInfo }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '516061784024-qoe79pir7vrl1h05fiaoq8iaesdiieef.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const handleSignup = async () => {
    setError('');
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      await sendEmailVerification(userCredential.user);
      Alert.alert('Verification Email Sent', 'Please check your email to verify your account.');
      navigation.replace('Login');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError('');
  
      await GoogleSignin.signOut(); // clear session
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  
      const userInfo = await GoogleSignin.signIn(); // 👈 may throw if cancelled
      if (!userInfo || !userInfo.idToken) {
        throw new Error('Google Sign-In was cancelled ');
      }
  
      const { idToken } = await GoogleSignin.getTokens();
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, credential);
  
      setUserInfo(userCredential.user);
      navigation.replace('Home');
    } catch (e) {
      console.log('Google Sign-In Error:', e);
      if (e.message?.includes('SIGN_IN_CANCELLED')) {
        setError('Google Sign-In was cancelled.');
      } else {
        setError(e.message || 'Google Sign-In failed');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

      {loading ? <ActivityIndicator size="large" style={{ marginVertical: 20 }} /> : (
        <>
          <Button title="Register" onPress={handleSignup} />
          <Text style={{ textAlign: 'center', marginVertical: 12 }}>or</Text>
          <GoogleSigninButton
            style={{ width: 192, height: 48, alignSelf: 'center' }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signInWithGoogle}
          />
        </>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already registered? Login</Text>
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
    marginTop: 20,
    textAlign: 'center'
  },
});
