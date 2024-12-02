import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useWorkouts } from './WorkoutContext';
import { button, buttonText, input, primaryButton } from '../constants/STYLES';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  details: Yup.string().required('Details are required'),
});

const WorkoutForm = ({ workout }: any) => {
  const [error, setError] = useState<string>('');
  const { addWorkout }: any = useWorkouts();

  const initialValues = {
    name: workout?.name,
    details: workout?.details,
  };

  const handleSubmit = (values: any, { resetForm }: any) => {
    try {
      addWorkout({id: new Date().toISOString(), ...values});
      resetForm(); // Clear the form after successful submission
    } catch (error: any) {
      setError('An error occurred while adding the workout. Please try again.');
    }
  };

  return (
    <>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }: any) => (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={[input]}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                placeholder="Enter workout name"
              />
              {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Details</Text>
              <TextInput
                style={[input]}
                onChangeText={handleChange('details')}
                onBlur={handleBlur('details')}
                value={values.details}
                placeholder="Enter workout details"
                multiline
              />
              {touched.details && errors.details && <Text style={styles.error}>{errors.details}</Text>}
            </View>

            {error ? <Text style={styles.globalError}>{error}</Text> : null}

            <Pressable
              onPress={handleSubmit}
              disabled={isSubmitting}
              style={[button, primaryButton]}
            >
                <Text style={buttonText}>{isSubmitting ? 'Submitting...' : 'Submit'}</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </>
  );
};

export default WorkoutForm;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  globalError: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
});
