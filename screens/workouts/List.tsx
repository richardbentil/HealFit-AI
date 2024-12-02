import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useWorkouts } from '../../components/WorkoutContext';
import WorkoutCard from '../../components/WorkoutCard';
import WorkoutForm from '../../components/WorkoutForm';
import { Ionicons } from '@expo/vector-icons'; // Requires expo install expo-vector-icons
import { row } from '../../constants/STYLES';

const List = () => {
    const { workOuts, updateWorkout, deleteWorkout } = useWorkouts();
    const [modalVisible, setModalVisible] = useState(false);
    const [workout, setWorkout] = useState<any>(null)

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const onDelete = () => {
        console.log(workout)
        Alert.alert(`Are you sure you want to delete`, 'Are you sure you want to delete', [
            {
                text: 'Yes',
                onPress: () => {
                    console.log(workout.id)
                    deleteWorkout(workout.id);
                },
                style: 'destructive',
            },
            {
                text: 'No',
                style: 'cancel',
            },
        ])
       
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.heading}>Your Workouts</Text>

                {workOuts.length > 0 ? (
                    <FlatList
                        data={workOuts}
                        keyExtractor={(item: any) => item.id.toString()}
                        renderItem={({ item }: any) => <WorkoutCard options={{openModal, setWorkout, onDelete}} workout={item} onEdit={updateWorkout} onDelete={deleteWorkout} />}
                        contentContainerStyle={styles.listContent}
                    />
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No workouts available. Add some to get started!</Text>
                    </View>
                )}

                {/* Add Workout Button */}
                <TouchableOpacity style={styles.addButton} onPress={openModal}>
                    <Ionicons name="add" size={30} color="white" />
                </TouchableOpacity>

                {/* Fullscreen Modal */}
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>


                        <View style={styles.modalContent}>
                            <View style={[row, styles.modalHeader]}>
                            <Text style={styles.heading}>Add New Workout</Text>
                                <Pressable onPress={closeModal}>
                                    <Ionicons name="close" size={30} color="dark" />
                                </Pressable>
                            </View>
                            <WorkoutForm workout={workout} />
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default List;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    listContent: {
        paddingBottom: 20,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#4285F4',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)', // Fullscreen modal background,
        marginTop: 0
    },
    modalHeader: {
        paddingBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 80,
    },
});
