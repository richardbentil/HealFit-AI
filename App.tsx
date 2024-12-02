import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './screens/Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';
import WorkoutProvider from './components/WorkoutContext';
import List from './screens/workouts/List';
import AddEditWorkout from './screens/workouts/AddEditWorkout';
import { Home, Workout } from './constants/ICONS';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Dashboard} options={{tabBarIcon: Home}} />
      <Tab.Screen name="Workouts" component={List} options={{tabBarIcon: Workout}} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <WorkoutProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name="AddEditWorkout" component={AddEditWorkout} />
          <Stack.Screen name="Dashboard" component={MainTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </WorkoutProvider>
  );
}

