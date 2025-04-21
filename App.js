import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useEffect, useState } from 'react';

export default function App() {
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null); // ✅ fixed variable name

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "516061784024-qoe79pir7vrl1h05fiaoq8iaesdiieef.apps.googleusercontent.com",
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
      setError(null); // Clear previous errors on success
    } catch (e) {
      setError(e.message || e.toString());
    }
  };

  const logout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (e) {
      setError(e.message || e.toString());
    }
  };

  return (
    <View style={styles.container}>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      
      {userInfo ? (
        <>
          <Text style={{ marginBottom: 10 }}>
            {JSON.stringify(userInfo.user, null, 2)}
          </Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
      )}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
