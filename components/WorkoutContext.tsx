import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';

// Define the context type
interface Workout {
  id: string;
  name: string;
  details: string;
}

interface WorkoutContextType {
  workOuts: Workout[];
  addWorkout: (workout: Workout) => void;
  updateWorkout: (workoutId: string, updatedWorkout: Workout) => void;
  deleteWorkout: (workoutId: string) => void;
}

// Initialize the context
const WorkoutContext = React.createContext<WorkoutContextType | undefined>(undefined);

export default function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [workOuts, setWorkOuts] = useState<Workout[]>([]);

  // Fetch workouts from AsyncStorage on mount
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const storedWorkouts = await AsyncStorage.getItem('workouts');
        if (storedWorkouts) {
          setWorkOuts(JSON.parse(storedWorkouts));
        }
      } catch (error) {
        console.error('Error fetching workouts from AsyncStorage:', error);
      }
    };

    fetchWorkouts();
  }, []);

  // Persist workouts to AsyncStorage whenever they change
  useEffect(() => {
    const saveWorkouts = async () => {
      try {
        await AsyncStorage.setItem('workouts', JSON.stringify(workOuts));
      } catch (error) {
        console.error('Error saving workouts to AsyncStorage:', error);
      }
    };

    saveWorkouts();
  }, [workOuts]);

  // Add workout
  const addWorkout = (workout: Workout) => {
    console.log(workout)
    setWorkOuts((prev) => [...prev, workout]);
  };

  // Update workout
  const updateWorkout = (workoutId: string, updatedWorkout: Workout) => {
    setWorkOuts((prev) =>
      prev.map((workout) => (workout.id === workoutId ? updatedWorkout : workout))
    );
  };

  // Delete workout
  const deleteWorkout = (workoutId: string) => {
    setWorkOuts((prev) => prev.filter((workout) => workout.id !== workoutId));
  };

  return (
    <WorkoutContext.Provider value={{ workOuts, addWorkout, updateWorkout, deleteWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
}

// Custom hook to use the WorkoutContext
export const useWorkouts = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkouts must be used within a WorkoutProvider');
  }
  return context;
};
