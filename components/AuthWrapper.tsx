import { StyleSheet, Text, View } from 'react-native';
import React, { ReactNode, useEffect } from 'react';
import useAuth from '../hooks/useAuthState';
import { useNavigation } from '@react-navigation/native';

interface AuthStateProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthStateProps) => {
  const { user, loading }: any = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    // If loading is false and user is not authenticated, navigate to login
    if (!loading && !user) {
      navigation.navigate("Login");
    }
  }, [user, loading, navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
