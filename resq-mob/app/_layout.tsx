// app/_layout.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "../hooks/useAuth";
import ErrorBoundary from "../components/ErrorBoundary";
import Login from "./auth/login";
import AdminOverview from "../screens/admin/Overview";
import AdminCameraList from "../screens/admin/CameraList";
import AdminCameraFeed from "../screens/admin/CameraFeed";
import AdminProfile from "../screens/admin/Profile";
import AdminReports from "../screens/admin/Reports";
import BfpIncidentMap from "../screens/bfp/IncidentMap";
import BfpProfile from "../screens/bfp/Profile";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

function AdminStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Overview"
        component={AdminOverview}
        options={{ title: "Admin Overview" }}
      />
      <Stack.Screen
        name="CameraList"
        component={AdminCameraList}
        options={{ title: "Cameras" }}
      />
      <Stack.Screen
        name="CameraFeed"
        component={AdminCameraFeed}
        options={{ title: "Camera Feed" }}
      />
      <Stack.Screen
        name="Profile"
        component={AdminProfile}
        options={{ title: "Profile" }}
      />
      <Stack.Screen
        name="Reports"
        component={AdminReports}
        options={{ title: "Reports" }}
      />
    </Stack.Navigator>
  );
}

function BfpStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="IncidentMap"
        component={BfpIncidentMap}
        options={{ title: "Incident Map" }}
      />
      <Stack.Screen
        name="Profile"
        component={BfpProfile}
        options={{ title: "Profile" }}
      />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { userRole } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userRole === null ? (
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : userRole === "admin" ? (
        <Stack.Screen name="Admin" component={AdminStack} />
      ) : (
        <Stack.Screen name="Bfp" component={BfpStack} />
      )}
    </Stack.Navigator>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </ErrorBoundary>
  )
}