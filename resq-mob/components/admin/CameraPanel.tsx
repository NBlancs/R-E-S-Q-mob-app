import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
	Alert,
	Modal,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	useWindowDimensions,
} from "react-native";
import {
	ACTIVE_RANGE_OPTIONS,
	ADMIN_CAMERA_UNITS,
	CAMERA_STATUS_OPTIONS,
	type CameraItem,
	type CameraStatus,
} from "../../constants/adminCameras";
import { useAuth } from "../../hooks/useAuth";
import {
	ApiError,
	createCamera,
	deleteCamera,
	listCameras,
	updateCamera,
	type CameraDto,
	type CameraPayload,
} from "../../services/api";
import { cameraPanelStyles as styles } from "../../styles/components/admin/cameraPanel";

interface CameraPanelProps {
	cameras?: CameraItem[];
}

type CameraFilterTarget = "status" | "location" | "activeRange" | null;

const cameraStatusColorMap: Record<CameraItem["status"], string> = {
	online: "#31c26a",
	offline: "#ef4444",
	maintenance: "#f39c12",
};

const DEFAULT_FOOTAGE_URL =
	"https://images.pexels.com/photos/1118866/pexels-photo-1118866.jpeg?auto=compress&cs=tinysrgb&w=1600";

const formatDateTime = (value: string) => {
	if (!value) {
		return "";
	}

	const parsed = new Date(value);
	if (Number.isNaN(parsed.getTime())) {
		return value.replace("T", " ").slice(0, 16);
	}

	const year = parsed.getFullYear();
	const month = String(parsed.getMonth() + 1).padStart(2, "0");
	const day = String(parsed.getDate()).padStart(2, "0");
	const hours = String(parsed.getHours()).padStart(2, "0");
	const minutes = String(parsed.getMinutes()).padStart(2, "0");
	return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const mapCameraDtoToItem = (camera: CameraDto): CameraItem => ({
	backendId: camera.id,
	id: camera.camera_code,
	name: camera.name,
	location: camera.location,
	status: camera.status,
	lastActive: formatDateTime(camera.last_active),
	onlineDuration: "-",
	activeRange: "24h",
	footageUrl: camera.footage_url || DEFAULT_FOOTAGE_URL,
});

const getNextCameraCode = (cameraRows: CameraItem[]) => {
	const maxValue = cameraRows.reduce((max, camera) => {
		const match = camera.id.match(/^CAM-(\d+)$/i);
		if (!match) {
			return max;
		}
		return Math.max(max, Number(match[1]));
	}, 0);

	return `CAM-${String(maxValue + 1).padStart(3, "0")}`;
};

export default function CameraPanel({
	cameras = ADMIN_CAMERA_UNITS,
}: CameraPanelProps) {
	const { token } = useAuth();
	const { width } = useWindowDimensions();
	const isMobile = width < 900;

	const [cameraRows, setCameraRows] = useState<CameraItem[]>(cameras);
	const [isLoading, setIsLoading] = useState(false);
	const [syncError, setSyncError] = useState<string | null>(null);
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState<"all" | CameraStatus>("all");
	const [locationFilter, setLocationFilter] = useState("all");
	const [activeRangeFilter, setActiveRangeFilter] = useState<"all" | CameraItem["activeRange"]>(
		"all",
	);
	const [activeFilterPicker, setActiveFilterPicker] = useState<CameraFilterTarget>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [form, setForm] = useState<Omit<CameraItem, "id" | "backendId">>({
		name: "",
		location: "Main Building",
		status: "online",
		lastActive: "2026-02-24 09:30",
		onlineDuration: "0h 00m 00s",
		activeRange: "24h",
		footageUrl: DEFAULT_FOOTAGE_URL,
	});

	const loadCamerasFromApi = useCallback(async () => {
		if (!token) {
			return;
		}

		setIsLoading(true);
		setSyncError(null);
		try {
			const response = await listCameras(token);
			setCameraRows(response.map(mapCameraDtoToItem));
		} catch (error) {
			const message = error instanceof ApiError ? error.message : "Failed to load cameras.";
			setSyncError(message);
		} finally {
			setIsLoading(false);
		}
	}, [token]);

	useEffect(() => {
		if (!token) {
			setSyncError("Sign in to load live camera data.");
			return;
		}

		void loadCamerasFromApi();
	}, [loadCamerasFromApi, token]);

	const locationOptions = useMemo(() => {
		return Array.from(new Set(cameraRows.map((camera) => camera.location))).sort();
	}, [cameraRows]);

	const filteredRows = useMemo(() => {
		return cameraRows.filter((camera) => {
			const matchesSearch =
				camera.id.toLowerCase().includes(search.toLowerCase()) ||
				camera.name.toLowerCase().includes(search.toLowerCase()) ||
				camera.location.toLowerCase().includes(search.toLowerCase());
			const matchesStatus = statusFilter === "all" || camera.status === statusFilter;
			const matchesLocation = locationFilter === "all" || camera.location === locationFilter;
			const matchesRange = activeRangeFilter === "all" || camera.activeRange === activeRangeFilter;

			return matchesSearch && matchesStatus && matchesLocation && matchesRange;
		});
	}, [activeRangeFilter, cameraRows, locationFilter, search, statusFilter]);

	const filterPickerTitle =
		activeFilterPicker === "status"
			? "Select Status"
			: activeFilterPicker === "location"
				? "Select Location"
				: "Select Active Range";

	const filterPickerOptions =
		activeFilterPicker === "status"
			? (["all", ...CAMERA_STATUS_OPTIONS] as string[])
			: activeFilterPicker === "location"
				? (["all", ...locationOptions] as string[])
				: (["all", ...ACTIVE_RANGE_OPTIONS] as string[]);

	const applyFilterValue = (value: string) => {
		if (activeFilterPicker === "status") {
			setStatusFilter(value as "all" | CameraStatus);
		}
		if (activeFilterPicker === "location") {
			setLocationFilter(value);
		}
		if (activeFilterPicker === "activeRange") {
			setActiveRangeFilter(value as "all" | CameraItem["activeRange"]);
		}
		setActiveFilterPicker(null);
	};

	const openCreateModal = () => {
		setEditingId(null);
		setForm({
			name: "",
			location: "Main Building",
			status: "online",
			lastActive: "2026-02-24 09:30",
			onlineDuration: "0h 00m 00s",
			activeRange: "24h",
			footageUrl: DEFAULT_FOOTAGE_URL,
		});
		setModalOpen(true);
	};

	const openEditModal = (camera: CameraItem) => {
		setEditingId(camera.id);
		setForm({
			name: camera.name,
			location: camera.location,
			status: camera.status,
			lastActive: camera.lastActive,
			onlineDuration: camera.onlineDuration,
			activeRange: camera.activeRange,
			footageUrl: camera.footageUrl,
		});
		setModalOpen(true);
	};

	const saveCamera = async () => {
		if (!token) {
			Alert.alert("Not Signed In", "Please sign in first.");
			return;
		}

		if (!form.name.trim() || !form.location.trim()) {
			Alert.alert("Validation", "Camera name and location are required.");
			return;
		}

		const currentRow = editingId ? cameraRows.find((camera) => camera.id === editingId) : null;
		const cameraCode = currentRow?.id || getNextCameraCode(cameraRows);
		const payload: CameraPayload = {
			camera_code: cameraCode,
			name: form.name.trim(),
			location: form.location.trim(),
			status: form.status,
			footage_url: form.footageUrl.trim(),
		};

		setIsLoading(true);
		setSyncError(null);

		try {
			if (currentRow?.backendId) {
				await updateCamera(token, currentRow.backendId, payload);
			} else {
				await createCamera(token, payload);
			}

			await loadCamerasFromApi();
			setModalOpen(false);
		} catch (error) {
			const message = error instanceof ApiError ? error.message : "Failed to save camera.";
			Alert.alert("Save Failed", message);
		} finally {
			setIsLoading(false);
		}
	};

	const removeCamera = async (camera: CameraItem) => {
		if (!token) {
			Alert.alert("Not Signed In", "Please sign in first.");
			return;
		}

		if (!camera.backendId) {
			setCameraRows((prev) => prev.filter((row) => row.id !== camera.id));
			return;
		}

		setIsLoading(true);
		setSyncError(null);
		try {
			await deleteCamera(token, camera.backendId);
			await loadCamerasFromApi();
		} catch (error) {
			const message = error instanceof ApiError ? error.message : "Failed to delete camera.";
			Alert.alert("Delete Failed", message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Camera List</Text>
			{isLoading ? <Text style={{ color: "#475569", marginBottom: 8 }}>Syncing with backend...</Text> : null}
			{syncError ? <Text style={{ color: "#b91c1c", marginBottom: 8 }}>{syncError}</Text> : null}

			<View style={styles.filtersRow}>
				<TextInput
					placeholder="Search cameras..."
					value={search}
					onChangeText={setSearch}
					style={[styles.input, styles.searchInput]}
					placeholderTextColor="#6b7280"
				/>
				<TouchableOpacity style={styles.filterButton} onPress={() => setActiveFilterPicker("status")}>
					<Text style={styles.filterButtonText}>Status: {statusFilter}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.filterButton} onPress={() => setActiveFilterPicker("location")}>
					<Text style={styles.filterButtonText}>Location: {locationFilter}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.filterButton} onPress={() => setActiveFilterPicker("activeRange")}>
					<Text style={styles.filterButtonText}>Active: {activeRangeFilter}</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.primaryButton} onPress={openCreateModal}>
					<Text style={styles.primaryButtonText}>Add Camera</Text>
				</TouchableOpacity>
			</View>

			{isMobile ? (
				<View style={styles.mobileList}>
					{filteredRows.map((camera) => (
						<View style={styles.mobileCard} key={camera.id}>
							<View style={styles.mobileCardHeader}>
								<Text style={styles.mobileTitle}>{camera.name}</Text>
								<Text style={[styles.statusBadge, { backgroundColor: cameraStatusColorMap[camera.status] }]}>
									{camera.status}
								</Text>
							</View>
							<Text style={styles.cameraMeta}>{camera.id}</Text>
							<Text style={styles.cameraMeta}>{camera.location}</Text>
							<Text style={styles.cameraMeta}>Last Active: {camera.lastActive}</Text>
							<Text style={styles.cameraMeta}>Online Duration: {camera.onlineDuration}</Text>
							<View style={styles.actionsCell}>
								<TouchableOpacity style={styles.editButton} onPress={() => openEditModal(camera)}>
									<Text style={styles.actionButtonText}>Edit</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.deleteButton} onPress={() => void removeCamera(camera)}>
									<Text style={styles.actionButtonText}>Delete</Text>
								</TouchableOpacity>
							</View>
						</View>
					))}
				</View>
			) : (
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					<View style={styles.table}>
						<View style={[styles.tableRow, styles.tableHeader]}>
							<Text style={[styles.cell, styles.headerCell, styles.cellId]}>ID</Text>
							<Text style={[styles.cell, styles.headerCell, styles.cellName]}>Name</Text>
							<Text style={[styles.cell, styles.headerCell, styles.cellLocation]}>Location</Text>
							<Text style={[styles.cell, styles.headerCell, styles.cellStatus]}>Status</Text>
							<Text style={[styles.cell, styles.headerCell, styles.cellLastActive]}>Last Active</Text>
							<Text style={[styles.cell, styles.headerCell, styles.cellDuration]}>Online Duration</Text>
							<Text style={[styles.cell, styles.headerCell, styles.cellActions]}>Actions</Text>
						</View>

						{filteredRows.map((camera) => (
							<View style={styles.tableRow} key={camera.id}>
								<Text style={[styles.cell, styles.cellId]}>{camera.id}</Text>
								<Text style={[styles.cell, styles.cellName]}>{camera.name}</Text>
								<Text style={[styles.cell, styles.cellLocation]}>{camera.location}</Text>
								<View style={[styles.cell, styles.cellStatus]}>
									<Text
										style={[
											styles.statusBadge,
											{ backgroundColor: cameraStatusColorMap[camera.status] },
										]}
									>
										{camera.status}
									</Text>
								</View>
								<Text style={[styles.cell, styles.cellLastActive]}>{camera.lastActive}</Text>
								<Text style={[styles.cell, styles.cellDuration]}>{camera.onlineDuration}</Text>
								<View style={[styles.cell, styles.cellActions, styles.actionsCell]}>
									<TouchableOpacity style={styles.editButton} onPress={() => openEditModal(camera)}>
										<Text style={styles.actionButtonText}>Edit</Text>
									</TouchableOpacity>
									<TouchableOpacity style={styles.deleteButton} onPress={() => void removeCamera(camera)}>
										<Text style={styles.actionButtonText}>Delete</Text>
									</TouchableOpacity>
								</View>
							</View>
						))}
					</View>
				</ScrollView>
			)}

			<Modal transparent visible={modalOpen} animationType="fade" onRequestClose={() => setModalOpen(false)}>
				<Pressable style={styles.modalOverlay} onPress={() => setModalOpen(false)}>
					<Pressable style={styles.modalCard}>
						<Text style={styles.modalTitle}>{editingId ? "Edit Camera" : "Add Camera"}</Text>

						<TextInput
							style={styles.input}
							value={form.name}
							onChangeText={(value) => setForm((prev) => ({ ...prev, name: value }))}
							placeholder="Camera name"
							placeholderTextColor="#6b7280"
						/>
						<TextInput
							style={styles.input}
							value={form.location}
							onChangeText={(value) => setForm((prev) => ({ ...prev, location: value }))}
							placeholder="Location"
							placeholderTextColor="#6b7280"
						/>
						<TextInput
							style={styles.input}
							value={form.lastActive}
							onChangeText={(value) => setForm((prev) => ({ ...prev, lastActive: value }))}
							placeholder="YYYY-MM-DD HH:MM"
							placeholderTextColor="#6b7280"
						/>
						<TextInput
							style={styles.input}
							value={form.onlineDuration}
							onChangeText={(value) => setForm((prev) => ({ ...prev, onlineDuration: value }))}
							placeholder="Online duration"
							placeholderTextColor="#6b7280"
						/>

						<View style={styles.inlineSelectRow}>
							<TouchableOpacity
								style={styles.filterButton}
								onPress={() => {
									const index = CAMERA_STATUS_OPTIONS.indexOf(form.status);
									setForm((prev) => ({
										...prev,
										status: CAMERA_STATUS_OPTIONS[(index + 1) % CAMERA_STATUS_OPTIONS.length],
									}));
								}}
							>
								<Text style={styles.filterButtonText}>Status: {form.status}</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.filterButton}
								onPress={() => {
									const index = ACTIVE_RANGE_OPTIONS.indexOf(form.activeRange);
									setForm((prev) => ({
										...prev,
										activeRange: ACTIVE_RANGE_OPTIONS[(index + 1) % ACTIVE_RANGE_OPTIONS.length],
									}));
								}}
							>
								<Text style={styles.filterButtonText}>Active: {form.activeRange}</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.modalActions}>
							<TouchableOpacity style={styles.secondaryButton} onPress={() => setModalOpen(false)}>
								<Text style={styles.secondaryButtonText}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.primaryButton} onPress={saveCamera}>
								<Text style={styles.primaryButtonText}>Save</Text>
							</TouchableOpacity>
						</View>
					</Pressable>
				</Pressable>
			</Modal>

			<Modal
				transparent
				visible={activeFilterPicker !== null}
				animationType="fade"
				onRequestClose={() => setActiveFilterPicker(null)}
			>
				<Pressable style={styles.modalOverlay} onPress={() => setActiveFilterPicker(null)}>
					<Pressable style={styles.pickerCard}>
						<Text style={styles.modalTitle}>{filterPickerTitle}</Text>
						<ScrollView>
							{filterPickerOptions.map((option) => (
								<TouchableOpacity
									key={option}
									style={styles.pickerOption}
									onPress={() => applyFilterValue(option)}
								>
									<Text style={styles.pickerOptionText}>{option}</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
					</Pressable>
				</Pressable>
			</Modal>
		</View>
	);
}
