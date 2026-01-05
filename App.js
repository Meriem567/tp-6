// App.js
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import LoginScreen from "./screens/LoginScreen";

import TodoListScreen from "./screens/TodoListScreen";
import TodoDetailsScreen from "./screens/TodoDetailsScreen";
import ProfileScreen from "./screens/ProfileScreen";

import { Provider } from "react-redux";
import { store } from "./store/store";

// ---------------- NAVIGATORS ----------------
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// ---------------- TASKS STACK ----------------
function TasksStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tâches" component={TodoListScreen} />
      <Stack.Screen name="Détails" component={TodoDetailsScreen} />
    </Stack.Navigator>
  );
}

// ---------------- DRAWER (AFTER LOGIN) ----------------
function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Tâches" component={TasksStack} />
      <Drawer.Screen name="Profil" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

// ---------------- CONDITIONAL NAVIGATION ----------------
function RootNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // important (avoid flicker)

  return user ? <AppDrawer /> : <LoginScreen />;
}

// ---------------- MAIN APP ----------------
export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
}
