import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import * as Yup from "yup";
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Eye, EyeOff } from '../constants/ICONS';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  button,
  buttonText,
  container,
  input,
  justifyContentCenter,
  primaryButton,
  shadow,
  textCenter,
} from '../constants/STYLES';
import app from '../utils/firebaseConfig';
import useAuth from '../hooks/useAuthState';


const validationSchema = Yup.object().shape({
  email: Yup.string().email('Enter a valid email').required('Required'),
  password: Yup.string().min(6, 'Too short!').required('Required'),
});

const ErrorText = ({ text }: { text: string }) => (
  <Text style={styles.errorText}>{text}</Text>
);

const Signup = ({ navigation }: any) => {
  const [error, setError] = useState<string>('');
  const [show, setShow] = useState(false);
  const { user, loading } = useAuth(); // Using custom hook
console.log(user, loading)
  // If user is already logged in, navigate to Dashboard
  useEffect(() => {
    if (!loading && user?.uid) {
      console.log("working...");
      navigation.navigate('Dashboard');
    }
  }, [user, loading, navigation]);

  const togglePasswordVisibility = () => {
    setShow(!show);
  };

  const signup = async (values: any) => {
    const auth = getAuth(app);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (userCredentials.user) {
        await AsyncStorage.setItem('user', JSON.stringify(userCredentials.user));
        navigation.navigate("Dashboard")
      }
    } catch (error: any) {
      if(error.message.includes("auth/invalid-credential")){
        setError("Invalid email or password.");
      } else {
        setError("An error occurred. Please try again later.");
      }
      console.log(error)
    }
  };


  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[container, justifyContentCenter]}>
        <Text style={[styles.heading, textCenter]}>Create an Account</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={signup}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting }: any) => (
            <View>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Email Address"
                style={[input, styles.inputField]}
              />
              {errors.email && <ErrorText text={errors.email} />}
              <View style={[styles.passwordContainer, input]}>
                <TextInput
                  secureTextEntry={!show}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Password"
                  style={styles.passwordInput}
                />
                <Pressable onPress={togglePasswordVisibility} style={styles.passwordToggle}>
                {show ? <Eye /> : <EyeOff />}
                </Pressable>
              </View>
              {errors.password && <ErrorText text={errors.password} />}

              <Pressable
                onPress={handleSubmit}
                style={[button, primaryButton, shadow, styles.submitButton]}
              >
               {isSubmitting ? <ActivityIndicator color={"white"} /> : <Text style={buttonText}>Signup</Text>}
              </Pressable>

              {error && <ErrorText text={error} />}

              <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.linkText}>Already have an account? Login</Text>
                </TouchableOpacity>

              </View>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Signup;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputField: {
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    paddingRight: 40,
  },
  passwordToggle: {
    position: 'absolute',
    right: 10,
  },
  submitButton: {
    marginVertical: 15,
    width: '100%',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#4285F4',
    borderWidth: 1,
    width: '100%',
    marginTop: 10,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: '#4285F4',
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  forgotPasswordlinkContainer: {
    marginVertical: 8,
    alignItems: 'flex-end',
  },
  linkText: {
    color: '#4285F4',
    fontSize: 14,
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
});
