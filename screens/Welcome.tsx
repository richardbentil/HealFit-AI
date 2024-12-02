import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../hooks/useAuthState';

export default function WelcomeScreen({navigation}: any) {
  const { user, loading } = useAuth(); // Using custom hook

  useEffect(() => {
    if (!loading && user?.uid) {
      navigation.navigate('Dashboard');
    }
  }, [user, loading, navigation]);

  if (loading) return <Text>Loading...</Text>; // Show loading while checking auth state


  return (
    <SafeAreaProvider>
    <SafeAreaView
     
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Image source={{ uri: 'https://example.com/logo.png' }} style={styles.logo} />
        <Text style={styles.title}>Welcome to your fitness journey</Text>
        <Text style={styles.subtitle}>Transform your health one step at a time.</Text>

        <Pressable onPress={() => navigation.navigate("Login")} style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50', // Green overlay for better text visibility
    width: '100%',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff', // Lime green button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
