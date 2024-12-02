import * as SQLite from 'expo-sqlite';

// Open the database (ensure it's done correctly)
const db = await SQLite.openDatabaseAsync('HealthFitAiDB');

// Create table if it doesn't exist
export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS workouts (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        details TEXT
      );`
    );
  });
};

// Add workout to the database
export const addWorkoutToDB = (name, details) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO workouts (name, details) VALUES (?, ?)',
      [name, details],
      (_, result) => {
        console.log('Workout added successfully', result);
      },
      (_, error) => {
        console.error('Error adding workout', error);
        return true; // Reject the transaction
      }
    );
  });
};

// Get all workouts from the database
export const getWorkoutsFromDB = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM workouts',
        [],
        (_, result) => {
          resolve(result.rows._array); // Return the rows as an array
        },
        (_, error) => {
          console.error('Error retrieving workouts', error);
          reject(error); // Reject promise on error
          return true; // Reject the transaction
        }
      );
    });
  });
};
