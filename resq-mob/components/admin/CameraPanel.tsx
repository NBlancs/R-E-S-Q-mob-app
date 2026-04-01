import React from "react";
import { Text, View } from "react-native";
import {
	ADMIN_CAMERA_UNITS,
	type CameraUnit,
} from "../../constants/adminCameras";
import { cameraPanelStyles as styles } from "../../styles/components/admin/cameraPanel";

interface CameraPanelProps {
	cameras?: CameraUnit[];
}

const cameraStatusColorMap: Record<CameraUnit["status"], string> = {
	Online: "#15803d",
	Offline: "#dc2626",
	Maintenance: "#d97706",
};

export default function CameraPanel({
	cameras = ADMIN_CAMERA_UNITS,
}: CameraPanelProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Camera Units</Text>
			{cameras.map((camera) => (
				<View style={styles.row} key={camera.id}>
					<View style={styles.rowHeader}>
						<Text style={styles.cameraName}>{camera.name}</Text>
						<Text style={[styles.chip, { color: cameraStatusColorMap[camera.status] }]}>
							{camera.status}
						</Text>
					</View>

					<Text style={styles.cameraMeta}>{camera.id}</Text>
					<Text style={styles.cameraMeta}>{camera.location}</Text>
					<Text style={styles.cameraMeta}>Quality: {camera.streamQuality}</Text>
				</View>
			))}
		</View>
	);
}
