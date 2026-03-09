import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

type IncidentMarker = {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
};

const INCIDENT_MARKERS: IncidentMarker[] = [
  {
    id: "inc-001",
    title: "Divisoria Commercial Fire",
    description: "2 units dispatched",
    latitude: 8.4817,
    longitude: 124.6451,
  },
  {
    id: "inc-002",
    title: "Carmen Residential Alarm",
    description: "Under investigation",
    latitude: 8.4849,
    longitude: 124.6204,
  },
  {
    id: "inc-003",
    title: "Lapasan Electrical Fire",
    description: "Contained",
    latitude: 8.497,
    longitude: 124.6576,
  },
];

const INITIAL_REGION = {
  latitude: 8.4542,
  longitude: 124.6319,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

export default function IncidentMap() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={INITIAL_REGION}>
        {INCIDENT_MARKERS.map((incident) => (
          <Marker
            key={incident.id}
            coordinate={{ latitude: incident.latitude, longitude: incident.longitude }}
            title={incident.title}
            description={incident.description}
          />
        ))}
      </MapView>
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
});
