import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { type OperationsProfileData } from "../../../constants/profileData";
import { operationsProfileStyles as styles } from "../../../styles/components/shared/operationsProfile";
import { useAuth } from "../../../hooks/useAuth";

interface OperationsProfileProps {
  profileData: OperationsProfileData;
}

export default function OperationsProfile({ profileData }: OperationsProfileProps) {
  const { userRole, credentials, updateCredentials } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationTrackingEnabled, setLocationTrackingEnabled] = useState(true);
  const initialRoleEmail = userRole ? credentials[userRole].email : profileData.email;
  const [profileImageUri, setProfileImageUri] = useState(profileData.profilePicture);
  const [email, setEmail] = useState(initialRoleEmail);
  const [contactInfo, setContactInfo] = useState(profileData.phone);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const storageKey = `resq:profile:${profileData.id}`;

  useEffect(() => {
    const loadProfileOverrides = async () => {
      try {
        const raw = await AsyncStorage.getItem(storageKey);
        if (!raw) {
          return;
        }

        const parsed = JSON.parse(raw) as {
          profileImageUri?: string;
          email?: string;
          contactInfo?: string;
        };

        if (parsed.profileImageUri) {
          setProfileImageUri(parsed.profileImageUri);
        }
        if (parsed.email) {
          setEmail(parsed.email);
        }
        if (parsed.contactInfo) {
          setContactInfo(parsed.contactInfo);
        }
      } catch {
        Alert.alert("Load Failed", "Unable to load saved profile data.");
      }
    };

    void loadProfileOverrides();
  }, [storageKey]);

  const handleSelectImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Please allow media access to upload a profile image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setProfileImageUri(result.assets[0].uri);
    }
  };

  const handleSaveProfile = async () => {
    if (!email.trim() || !contactInfo.trim()) {
      Alert.alert("Missing Fields", "Email and contact information are required.");
      return;
    }

    if (userRole) {
      const existing = credentials[userRole];
      const emailChanged = email.trim() !== existing.email;
      const passwordChanged = newPassword.trim().length > 0;

      if (emailChanged || passwordChanged) {
        if (!currentPassword.trim()) {
          Alert.alert("Current Password Required", "Enter your current password to update account credentials.");
          return;
        }

        const result = updateCredentials({
          role: userRole,
          currentPassword: currentPassword.trim(),
          newEmail: email.trim(),
          newPassword: passwordChanged ? newPassword.trim() : undefined,
        });

        if (!result.success) {
          Alert.alert("Update Failed", result.message);
          return;
        }
      }
    }

    try {
      await AsyncStorage.setItem(
        storageKey,
        JSON.stringify({
          profileImageUri,
          email,
          contactInfo,
        }),
      );
      setCurrentPassword("");
      setNewPassword("");
      Alert.alert("Saved", "Profile details have been updated.");
    } catch {
      Alert.alert("Save Failed", "Unable to save profile changes.");
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.profileHeader}>
        <View style={styles.profilePictureContainer}>
          <Image source={{ uri: profileImageUri }} style={styles.profilePicture} />
        </View>
        <TouchableOpacity style={styles.imageActionButton} onPress={handleSelectImage}>
          <Text style={styles.imageActionButtonText}>Upload Image</Text>
        </TouchableOpacity>

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
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.infoCard}>
          <View style={styles.formField}>
            <Text style={styles.infoLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.formInput}
              placeholder="email@example.com"
              placeholderTextColor="#9ca3af"
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.formField}>
            <Text style={styles.infoLabel}>Contact Information</Text>
            <TextInput
              value={contactInfo}
              onChangeText={setContactInfo}
              keyboardType="phone-pad"
              style={styles.formInput}
              placeholder="+63 9xx xxx xxxx"
              placeholderTextColor="#9ca3af"
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.formField}>
            <Text style={styles.infoLabel}>Current Password</Text>
            <TextInput
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              style={styles.formInput}
              placeholder="Enter current password"
              placeholderTextColor="#9ca3af"
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.formField}>
            <Text style={styles.infoLabel}>New Password</Text>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              style={styles.formInput}
              placeholder="Leave blank to keep current password"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
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

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}
