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
import BfpAlertsList from "../screens/bfp/AlertsList";
import BfpProfile from "../screens/bfp/Profile";
import { SCREEN_NAMES } from "../constants/navigation";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREEN_NAMES.LOGIN} component={Login} />
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
        name={SCREEN_NAMES.OVERVIEW}
        component={AdminOverview}
        options={{ title: "Admin Overview" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.CAMERA_LIST}
        component={AdminCameraList}
        options={{ title: "Cameras" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.CAMERA_FEED}
        component={AdminCameraFeed}
        options={{ title: "Camera Feed" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.PROFILE}
        component={AdminProfile}
        options={{ title: "Profile" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.REPORTS}
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
        name={SCREEN_NAMES.INCIDENT_MAP}
        component={BfpIncidentMap}
        options={{ title: "Incident Map" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.ALERTS_LIST}
        component={BfpAlertsList}
        options={{ title: "Active Alerts" }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.PROFILE}
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
        <Stack.Screen name={SCREEN_NAMES.AUTH_STACK} component={AuthStack} />
      ) : userRole === "admin" ? (
        <Stack.Screen name={SCREEN_NAMES.ADMIN_STACK} component={AdminStack} />
      ) : (
        <Stack.Screen name={SCREEN_NAMES.BFP_STACK} component={BfpStack} />
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