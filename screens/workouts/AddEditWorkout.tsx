import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import WorkoutForm from '../../components/WorkoutForm'

const AddEditWorkout = () => {
  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
      <WorkoutForm />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default AddEditWorkout

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f9f9f9',
    },
})