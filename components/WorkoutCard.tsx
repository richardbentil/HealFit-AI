import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WorkoutCard = ({ workout, options }: any) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{workout.name}</Text>
            <Text style={styles.details}>{workout.details}</Text>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => {
                    options.openModal();
                    options.setWorkout(workout);
                }}>
                    <Text style={styles.edit}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    options.onDelete()
                    options.setWorkout(workout);
                }}>
                    <Text style={styles.delete}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 14,
        marginVertical: 8,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    edit: {
        color: 'blue',
    },
    delete: {
        color: 'red',
    },
});

export default WorkoutCard;
