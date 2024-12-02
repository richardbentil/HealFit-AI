import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
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
import useAuth from '../hooks/useAuthState';

// Validation schema for Formik
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Enter a valid email').required('Required'),
  password: Yup.string().min(6, 'Too short!').required('Required'),
});

const ErrorText = ({ text }: { text: string }) => (
  <Text style={styles.errorText}>{text}</Text>
);

const Login = ({ navigation }: any) => {
  const [error, setError] = useState<string>('');
  const [show, setShow] = useState(false);
  const { user, loading } = useAuth(); // Using custom hook

  // If user is already logged in, navigate to Dashboard
  useEffect(() => {
    if (!loading && user?.uid) {
      navigation.navigate('Dashboard');
    }
  }, [user, loading, navigation]);

  const togglePasswordVisibility = () => {
    setShow(!show);
  };

  const login = async (values: any) => {
    const auth = getAuth();
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (userCredentials.user) {
        await AsyncStorage.setItem('user', JSON.stringify(userCredentials.user));
        navigation.navigate("Dashboard");
      }
    } catch (error: any) {
      if (error.message.includes("auth/invalid-credential")) {
        setError("Invalid email or password.");
      } else {
        setError("An error occurred. Please try again later.");
      }
      console.log(error);
    }
  };

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[container, justifyContentCenter]}>
        <Text style={[styles.heading, textCenter]}>Login to Your Account</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={login}
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
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
                style={styles.forgotPasswordLinkContainer}
              >
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>

              <Pressable
                onPress={handleSubmit}
                style={[button, primaryButton, shadow, styles.submitButton]}
              >
                {isSubmitting ? <ActivityIndicator color={"white"} /> : <Text style={buttonText}>Login</Text>}
              </Pressable>

              {error && <ErrorText text={error} />}

              <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text style={styles.linkText}>Don't have an account? Signup</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Login;

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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  forgotPasswordLinkContainer: {
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
