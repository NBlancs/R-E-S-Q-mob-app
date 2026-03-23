// screens/bfp/Profile.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  Modal,
} from "react-native";
import { profileStyles as styles } from "../../styles/screens/bfp/profile";
import Layout from "../../components/bfp/Layout";

interface FirefighterProfile {
  id: string;
  name: string;
  rank: string;
  station: string;
  phone: string;
  email: string;
  profilePicture: string;
  incidents: number;
  certifications: string[];
  hoursWorked: number;
}

const mockUserData: FirefighterProfile = {
  id: "BFP-2024-CDO",
  name: "Cagayan de Oro Fire Station",
  rank: "BFP Operations Center",
  station: "Bureau of Fire Protection - CDO",
  phone: "+63 xxx-xxx-xxxx",
  email: "cdo.station@bfp.gov.ph",
  profilePicture: "https://via.placeholder.com/120",
  incidents: 247,
  certifications: [
    "Emergency Response",
    "Disaster Management",
    "Community Fire Safety",
  ],
  hoursWorked: 8760,
};

export default function Profile() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationTrackingEnabled, setLocationTrackingEnabled] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
    setLogoutModalVisible(false);
    Alert.alert("Logged Out", "You have been successfully logged out", [
      { text: "OK", onPress: () => {} },
    ]);
  };

  return (
    <Layout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profilePictureContainer}>
            <Image
              source={{ uri: mockUserData.profilePicture }}
              style={styles.profilePicture}
            />
          </View>
          <Text style={styles.profileName}>{mockUserData.name}</Text>
          <Text style={styles.profileRank}>{mockUserData.rank}</Text>
          <Text style={styles.profileStation}>{mockUserData.station}</Text>
          <Text style={styles.profileId}>ID: {mockUserData.id}</Text>
        </View>

        {/* User Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoValue}>{mockUserData.name}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Rank</Text>
              <Text style={styles.infoValue}>{mockUserData.rank}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Station</Text>
              <Text style={styles.infoValue}>{mockUserData.station}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Employee ID</Text>
              <Text style={styles.infoValue}>{mockUserData.id}</Text>
            </View>
          </View>
        </View>

        {/* Contact Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoCard}>
            <TouchableOpacity style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValueLink}>{mockUserData.phone}</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValueLink}>{mockUserData.email}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Statistics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{mockUserData.incidents}</Text>
              <Text style={styles.statLabel}>Incidents Handled</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{mockUserData.hoursWorked}</Text>
              <Text style={styles.statLabel}>Hours Worked</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{mockUserData.certifications.length}</Text>
              <Text style={styles.statLabel}>Certifications</Text>
            </View>
          </View>
        </View>

        {/* Certifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          <View style={styles.certContainer}>
            {mockUserData.certifications.map((cert, index) => (
              <View key={index} style={styles.certBadge}>
                <Text style={styles.certText}>✓ {cert}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#ccc", true: "#81c784" }}
                thumbColor={notificationsEnabled ? "#0066cc" : "#fff"}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Location Services</Text>
              <Switch
                value={locationTrackingEnabled}
                onValueChange={setLocationTrackingEnabled}
                trackColor={{ false: "#ccc", true: "#81c784" }}
                thumbColor={locationTrackingEnabled ? "#0066cc" : "#fff"}
              />
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          accessible={true}
          accessibilityLabel="Logout button"
          accessibilityRole="button"
        >
          <Text style={styles.logoutButtonText}>🚪 Logout</Text>
        </TouchableOpacity>

        {/* Extra padding at bottom */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={logoutModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationModal}>
            <Text style={styles.confirmationTitle}>Logout Confirmation</Text>
            <Text style={styles.confirmationMessage}>
              Are you sure you want to logout? You will need to log in again to access the app.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setLogoutModalVisible(false)}
                accessible={true}
                accessibilityLabel="Cancel logout"
                accessibilityRole="button"
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmLogout}
                accessible={true}
                accessibilityLabel="Confirm logout"
                accessibilityRole="button"
              >
                <Text style={styles.confirmButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Layout>
  );
}