import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AuthWrapper from '../components/AuthWrapper';

const Dashboard = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <AuthWrapper>
          <Text style={styles.text}>Dashboard</Text>
        </AuthWrapper>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the SafeAreaView fills the screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
