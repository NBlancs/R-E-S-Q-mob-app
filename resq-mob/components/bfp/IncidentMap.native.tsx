import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Dimensions,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

type IncidentMarker = {
  id: string;
  title: string;
  description: string;
  status: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  unitsDispatched: number;
};

const INCIDENT_MARKERS: IncidentMarker[] = [
  {
    id: "inc-001",
    title: "Divisoria Commercial Fire",
    description: "Multi-story commercial building with active flames",
    status: "Active",
    latitude: 8.4817,
    longitude: 124.6451,
    timestamp: "2026-03-23 14:32:00",
    unitsDispatched: 2,
  },
  {
    id: "inc-002",
    title: "Carmen Residential Alarm",
    description: "Smoke alarm activation, no visual confirmation",
    status: "Under investigation",
    latitude: 8.4849,
    longitude: 124.6204,
    timestamp: "2026-03-23 13:15:00",
    unitsDispatched: 1,
  },
  {
    id: "inc-003",
    title: "Lapasan Electrical Fire",
    description: "Electrical fire in residential unit",
    status: "Contained",
    latitude: 8.497,
    longitude: 124.6576,
    timestamp: "2026-03-23 11:45:00",
    unitsDispatched: 3,
  },
];

const INITIAL_REGION = {
  latitude: 8.4542,
  longitude: 124.6319,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const truncateText = (text: string, maxLength: number = 60): string => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default function IncidentMap() {
  const [markers, setMarkers] = useState<IncidentMarker[]>(INCIDENT_MARKERS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<IncidentMarker | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(Dimensions.get("window").height));
  
  // Add Incident Mode states
  const [addIncidentMode, setAddIncidentMode] = useState(false);
  const [newIncidentFormVisible, setNewIncidentFormVisible] = useState(false);
  const [newIncidentData, setNewIncidentData] = useState({
    title: "",
    description: "",
    status: "Active",
    units: "1",
    latitude: 0,
    longitude: 0,
  });

  const handleMapPress = (event: any) => {
    if (!addIncidentMode) return;
    
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setNewIncidentData(prev => ({
      ...prev,
      latitude,
      longitude,
    }));
    setNewIncidentFormVisible(true);
  };

  const validateForm = (): boolean => {
    const { title, description, status, units, latitude, longitude } = newIncidentData;
    
    if (!title.trim()) {
      Alert.alert("Validation Error", "Title is required");
      return false;
    }
    if (!description.trim()) {
      Alert.alert("Validation Error", "Description is required");
      return false;
    }
    if (!status.trim()) {
      Alert.alert("Validation Error", "Status is required");
      return false;
    }
    if (!units.trim() || isNaN(Number(units))) {
      Alert.alert("Validation Error", "Units must be a valid number");
      return false;
    }
    if (latitude === 0 && longitude === 0) {
      Alert.alert("Validation Error", "Please tap the map to select a location");
      return false;
    }
    
    return true;
  };

  const handleSaveNewIncident = () => {
    if (!validateForm()) return;

    const newIncident: IncidentMarker = {
      id: `custom-${Date.now()}`,
      title: newIncidentData.title,
      description: newIncidentData.description,
      status: newIncidentData.status,
      latitude: newIncidentData.latitude,
      longitude: newIncidentData.longitude,
      timestamp: new Date().toLocaleString(),
      unitsDispatched: Number(newIncidentData.units),
    };

    const updatedMarkers = [...markers, newIncident];
    setMarkers(updatedMarkers);

    setNewIncidentFormVisible(false);
    setNewIncidentData({
      title: "",
      description: "",
      status: "Active",
      units: "1",
      latitude: 0,
      longitude: 0,
    });
    setAddIncidentMode(false);
    Alert.alert("Success", "Incident pinpoint added successfully");
  };

  const handleDeleteIncident = (id: string) => {
    const updatedMarkers = markers.filter(m => m.id !== id);
    setMarkers(updatedMarkers);
    closeModal();
    Alert.alert("Deleted", "Incident removed");
  };

  const handleMarkerPress = (incident: IncidentMarker) => {
    if (addIncidentMode) return;
    setSelectedMarker(incident);
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: Dimensions.get("window").height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSelectedMarker(null);
    });
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Map Error</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
        onMapReady={() => setLoading(false)}
        onPress={handleMapPress}
        accessibilityLabel="Incident map showing active fire department incidents"
        accessible={true}
      >
        {markers.map((incident) => (
          <Marker
            key={incident.id}
            coordinate={{ latitude: incident.latitude, longitude: incident.longitude }}
            title={incident.title}
            description={truncateText(incident.description)}
            onPress={() => handleMarkerPress(incident)}
            accessible={true}
            accessibilityLabel={`Incident: ${incident.title}`}
            accessibilityHint={`Tap to view details: ${incident.description}`}
          />
        ))}
      </MapView>

      {/* Add Incident Button */}
      <TouchableOpacity
        style={[
          styles.addIncidentButton,
          addIncidentMode && styles.addIncidentButtonActive,
        ]}
        onPress={() => {
          if (addIncidentMode) {
            setAddIncidentMode(false);
            setNewIncidentData({
              title: "",
              description: "",
              status: "Active",
              units: "1",
              latitude: 0,
              longitude: 0,
            });
          } else {
            setAddIncidentMode(true);
          }
        }}
        accessible={true}
        accessibilityLabel={addIncidentMode ? "Exit add incident mode" : "Add new incident"}
        accessibilityRole="button"
      >
        <Text style={styles.addIncidentButtonText}>
          {addIncidentMode ? "✕ Cancel" : "➕"}
        </Text>
      </TouchableOpacity>

      {/* Add Incident Mode Indicator */}
      {addIncidentMode && (
        <View style={styles.modeIndicator}>
          <Text style={styles.modeIndicatorText}>Tap the map to place a pin</Text>
        </View>
      )}

      {/* Detail Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeModal}
        accessibilityLabel="Incident details modal"
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.backdrop}
            onPress={closeModal}
            accessible={false}
            activeOpacity={1}
          />
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedMarker?.title}</Text>
              <TouchableOpacity
                onPress={closeModal}
                style={styles.closeButton}
                accessibilityLabel="Close incident details"
                accessibilityRole="button"
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} scrollEnabled={true}>
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Status</Text>
                <Text style={styles.detailValue}>{selectedMarker?.status}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Description</Text>
                <Text style={styles.detailValue}>{selectedMarker?.description}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Location Coordinates</Text>
                <Text style={styles.detailValue}>
                  {selectedMarker?.latitude.toFixed(4)}, {selectedMarker?.longitude.toFixed(4)}
                </Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Timestamp</Text>
                <Text style={styles.detailValue}>{selectedMarker?.timestamp}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Units Dispatched</Text>
                <Text style={styles.detailValue}>{selectedMarker?.unitsDispatched}</Text>
              </View>

              {selectedMarker?.id.startsWith("custom-") && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    Alert.alert(
                      "Delete Incident",
                      "Are you sure you want to delete this incident?",
                      [
                        { text: "Cancel", onPress: () => {} },
                        {
                          text: "Delete",
                          onPress: () => handleDeleteIncident(selectedMarker!.id),
                          style: "destructive",
                        },
                      ]
                    );
                  }}
                  accessible={true}
                  accessibilityLabel="Delete incident"
                  accessibilityRole="button"
                >
                  <Text style={styles.deleteButtonText}>🗑️ Delete Incident</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>

      {/* New Incident Form Modal */}
      <Modal
        visible={newIncidentFormVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setNewIncidentFormVisible(false)}
        accessibilityLabel="Add new incident form"
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.backdrop}
            onPress={() => setNewIncidentFormVisible(false)}
            accessible={false}
            activeOpacity={1}
          />
          <View style={styles.formModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Incident</Text>
              <TouchableOpacity
                onPress={() => setNewIncidentFormVisible(false)}
                style={styles.closeButton}
                accessibilityLabel="Close form"
                accessibilityRole="button"
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formBody}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Location *</Text>
                <Text style={styles.formValue}>
                  {newIncidentData.latitude.toFixed(4)}, {newIncidentData.longitude.toFixed(4)}
                </Text>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Title *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter incident title"
                  value={newIncidentData.title}
                  onChangeText={(text) =>
                    setNewIncidentData(prev => ({ ...prev, title: text }))
                  }
                  placeholderTextColor="#9ca3af"
                  accessible={true}
                  accessibilityLabel="Incident title input"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Description *</Text>
                <TextInput
                  style={[styles.textInput, styles.textAreaInput]}
                  placeholder="Enter incident description"
                  value={newIncidentData.description}
                  onChangeText={(text) =>
                    setNewIncidentData(prev => ({ ...prev, description: text }))
                  }
                  placeholderTextColor="#9ca3af"
                  multiline
                  numberOfLines={4}
                  accessible={true}
                  accessibilityLabel="Incident description input"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Status *</Text>
                <View style={styles.statusPicker}>
                  {["Active", "Under investigation", "Contained"].map((s) => (
                    <TouchableOpacity
                      key={s}
                      style={[
                        styles.statusOption,
                        newIncidentData.status === s && styles.statusOptionActive,
                      ]}
                      onPress={() =>
                        setNewIncidentData(prev => ({ ...prev, status: s }))
                      }
                      accessible={true}
                      accessibilityLabel={`Status: ${s}`}
                      accessibilityRole="radio"
                      accessibilityState={{ selected: newIncidentData.status === s }}
                    >
                      <Text
                        style={[
                          styles.statusOptionText,
                          newIncidentData.status === s && styles.statusOptionTextActive,
                        ]}
                      >
                        {s}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Units Dispatched *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter number of units"
                  value={newIncidentData.units}
                  onChangeText={(text) =>
                    setNewIncidentData(prev => ({ ...prev, units: text }))
                  }
                  keyboardType="number-pad"
                  placeholderTextColor="#9ca3af"
                  accessible={true}
                  accessibilityLabel="Units dispatched input"
                />
              </View>

              <View style={styles.formActions}>
                <TouchableOpacity
                  style={styles.cancelFormButton}
                  onPress={() => setNewIncidentFormVisible(false)}
                  accessible={true}
                  accessibilityLabel="Cancel adding incident"
                  accessibilityRole="button"
                >
                  <Text style={styles.cancelFormButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveFormButton}
                  onPress={handleSaveNewIncident}
                  accessible={true}
                  accessibilityLabel="Save new incident"
                  accessibilityRole="button"
                >
                  <Text style={styles.saveFormButtonText}>Save Incident</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 380,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#d0d7de",
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f8fa",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#4b5563",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff5f5",
    padding: 24,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#cc0000",
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: "#4b5563",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#0066cc",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  addIncidentButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0066cc",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  addIncidentButtonActive: {
    backgroundColor: "#cc0000",
  },
  addIncidentButtonText: {
    fontSize: 24,
    fontWeight: "600",
  },
  modeIndicator: {
    position: "absolute",
    bottom: 16,
    left: 16,
    backgroundColor: "rgba(0, 102, 204, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    zIndex: 10,
  },
  modeIndicatorText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 24,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  formModalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 24,
    maxHeight: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    flex: 1,
  },
  closeButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#6b7280",
    fontWeight: "300",
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  formBody: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  detailSection: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: "#1f2937",
    lineHeight: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  formValue: {
    fontSize: 14,
    color: "#4b5563",
    backgroundColor: "#f3f4f6",
    padding: 10,
    borderRadius: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1f2937",
  },
  textAreaInput: {
    paddingTop: 10,
    textAlignVertical: "top",
  },
  statusPicker: {
    flexDirection: "row",
    gap: 8,
  },
  statusOption: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  statusOptionActive: {
    backgroundColor: "#dbeafe",
    borderColor: "#0066cc",
  },
  statusOptionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4b5563",
    textAlign: "center",
  },
  statusOptionTextActive: {
    color: "#0066cc",
  },
  formActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
    marginBottom: 16,
  },
  cancelFormButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelFormButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4b5563",
  },
  saveFormButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#0066cc",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  saveFormButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  deleteButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fee2e2",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#991b1b",
  },
});
