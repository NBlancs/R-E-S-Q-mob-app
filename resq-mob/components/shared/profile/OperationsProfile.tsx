import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { type OperationsProfileData } from "../../../constants/profileData";
import { operationsProfileStyles as styles } from "../../../styles/components/shared/operationsProfile";

interface OperationsProfileProps {
  profileData: OperationsProfileData;
}

export default function OperationsProfile({ profileData }: OperationsProfileProps) {
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
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.profilePictureContainer}>
            <Image source={{ uri: profileData.profilePicture }} style={styles.profilePicture} />
          </View>
          <Text style={styles.profileName}>{profileData.name}</Text>
          <Text style={styles.profileRank}>{profileData.rank}</Text>
          <Text style={styles.profileStation}>{profileData.station}</Text>
          <Text style={styles.profileId}>ID: {profileData.id}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoValue}>{profileData.name}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Rank</Text>
              <Text style={styles.infoValue}>{profileData.rank}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Station</Text>
              <Text style={styles.infoValue}>{profileData.station}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Employee ID</Text>
              <Text style={styles.infoValue}>{profileData.id}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoCard}>
            <TouchableOpacity style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValueLink}>{profileData.phone}</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValueLink}>{profileData.email}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{profileData.incidents}</Text>
              <Text style={styles.statLabel}>Incidents Handled</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{profileData.hoursWorked}</Text>
              <Text style={styles.statLabel}>Hours Worked</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{profileData.certifications.length}</Text>
              <Text style={styles.statLabel}>Certifications</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          <View style={styles.certContainer}>
            {profileData.certifications.map((certification) => (
              <View key={certification} style={styles.certBadge}>
                <Text style={styles.certText}>✓ {certification}</Text>
              </View>
            ))}
          </View>
        </View>

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

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          accessible={true}
          accessibilityLabel="Logout button"
          accessibilityRole="button"
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>

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
    </>
  );
}
