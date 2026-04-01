import React, { useMemo, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import DateTimePicker, { type DateTimePickerEvent } from "@react-native-community/datetimepicker";
import {
  ADMIN_INCIDENT_REPORTS,
  type IncidentReportItem,
} from "../../constants/adminReports";
import { incidentsTableStyles as styles } from "../../styles/components/admin/incidentsTable";

interface IncidentsTableProps {
  incidents?: IncidentReportItem[];
}

type IncidentFilterPickerTarget = "status" | null;
type IncidentDatePickerTarget = "day" | "month" | "rangeStart" | "rangeEnd" | null;

const statusColorMap: Record<IncidentReportItem["status"], string> = {
  open: "#ef4444",
  investigating: "#facc15",
  resolved: "#31c26a",
};

export default function IncidentsTable({
  incidents = ADMIN_INCIDENT_REPORTS,
}: IncidentsTableProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 940;

  const [rows, setRows] = useState<IncidentReportItem[]>(incidents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | IncidentReportItem["status"]>("all");
  const [dayFilter, setDayFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [activeFilterPicker, setActiveFilterPicker] = useState<IncidentFilterPickerTarget>(null);
  const [activeDatePicker, setActiveDatePicker] = useState<IncidentDatePickerTarget>(null);
  const [monthPickerVisible, setMonthPickerVisible] = useState(false);
  const [pickerDate, setPickerDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<IncidentReportItem, "id">>({
    type: "Fire",
    location: "",
    method: "Heat Sensor",
    time: "09:00 AM",
    date: "2026-02-24",
    status: "open",
  });

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const normalizedSearch = search.toLowerCase();
      const matchesSearch =
        row.id.toLowerCase().includes(normalizedSearch) ||
        row.type.toLowerCase().includes(normalizedSearch) ||
        row.location.toLowerCase().includes(normalizedSearch) ||
        row.method.toLowerCase().includes(normalizedSearch);
      const matchesStatus = statusFilter === "all" || row.status === statusFilter;
      const matchesDay = !dayFilter || row.date === dayFilter;
      const matchesMonth = !monthFilter || row.date.startsWith(monthFilter);

      const matchesRange =
        !rangeStart || !rangeEnd || (row.date >= rangeStart && row.date <= rangeEnd);

      return matchesSearch && matchesStatus && matchesDay && matchesMonth && matchesRange;
    });
  }, [dayFilter, monthFilter, rangeEnd, rangeStart, rows, search, statusFilter]);

  const statusOptions: ("all" | IncidentReportItem["status"])[] = [
    "all",
    "resolved",
    "investigating",
    "open",
  ];

  const parseISODate = (value: string) => {
    if (!value) {
      return new Date();
    }
    const parsed = new Date(`${value}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) {
      return new Date();
    }
    return parsed;
  };

  const formatISODate = (value: Date) => {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatISOMonth = (value: Date) => {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  const monthOptions = useMemo(() => {
    const now = new Date();
    const startYear = now.getFullYear() - 2;
    const endYear = now.getFullYear() + 1;
    const options: string[] = ["all"];

    for (let year = endYear; year >= startYear; year -= 1) {
      for (let month = 12; month >= 1; month -= 1) {
        options.push(`${year}-${String(month).padStart(2, "0")}`);
      }
    }

    return options;
  }, []);

  const openDatePicker = (target: IncidentDatePickerTarget) => {
    if (!target) {
      return;
    }

    let initialDate = new Date();
    if (target === "day") {
      initialDate = parseISODate(dayFilter);
    }
    if (target === "month") {
      setMonthPickerVisible(true);
      return;
    }
    if (target === "rangeStart") {
      initialDate = parseISODate(rangeStart);
    }
    if (target === "rangeEnd") {
      initialDate = parseISODate(rangeEnd);
    }

    setPickerDate(initialDate);
    setActiveDatePicker(target);
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      setActiveDatePicker(null);
      return;
    }

    if (selectedDate) {
      setPickerDate(selectedDate);
      if (Platform.OS === "android") {
        applyDateFilter(selectedDate);
      }
    }
  };

  const applyDateFilter = (value: Date) => {
    if (activeDatePicker === "day") {
      setDayFilter(formatISODate(value));
    }
    if (activeDatePicker === "month") {
      setDayFilter("");
      setMonthFilter(formatISOMonth(value));
    }
    if (activeDatePicker === "rangeStart") {
      setRangeStart(formatISODate(value));
    }
    if (activeDatePicker === "rangeEnd") {
      setRangeEnd(formatISODate(value));
    }
    setActiveDatePicker(null);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setForm({
      type: "Fire",
      location: "",
      method: "Heat Sensor",
      time: "09:00 AM",
      date: "2026-02-24",
      status: "open",
    });
    setModalOpen(true);
  };

  const openEditModal = (row: IncidentReportItem) => {
    setEditingId(row.id);
    setForm({
      type: row.type,
      location: row.location,
      method: row.method,
      time: row.time,
      date: row.date,
      status: row.status,
    });
    setModalOpen(true);
  };

  const saveIncident = () => {
    if (!form.location.trim()) {
      return;
    }

    if (editingId) {
      setRows((prev) => prev.map((row) => (row.id === editingId ? { ...row, ...form } : row)));
    } else {
      const values = rows
        .map((row) => Number(row.id.replace("#INC-", "")))
        .filter((value) => !Number.isNaN(value));
      const next = String((Math.max(0, ...values) + 1)).padStart(3, "0");
      setRows((prev) => [...prev, { id: `#INC-${next}`, ...form }]);
    }

    setModalOpen(false);
  };

  const removeIncident = (id: string) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recent Incidents</Text>

      <View style={styles.filtersRow}>
        <TextInput
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
          style={[styles.input, styles.searchInput]}
          placeholderTextColor="#6b7280"
        />

        <TouchableOpacity style={styles.filterButton} onPress={() => setActiveFilterPicker("status")}>
          <Text style={styles.filterButtonText}>Status: {statusFilter}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton} onPress={() => openDatePicker("day")}>
          <Text style={styles.filterButtonText}>Day: {dayFilter || "Any"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => openDatePicker("month")}>
          <Text style={styles.filterButtonText}>Month: {monthFilter || "Any"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => openDatePicker("rangeStart")}>
          <Text style={styles.filterButtonText}>Range Start: {rangeStart || "Any"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => openDatePicker("rangeEnd")}>
          <Text style={styles.filterButtonText}>Range End: {rangeEnd || "Any"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={openCreateModal}>
          <Text style={styles.primaryButtonText}>Add Incident</Text>
        </TouchableOpacity>
      </View>

      {isMobile ? (
        <View style={styles.mobileList}>
          {filteredRows.map((incident) => (
            <View style={styles.mobileCard} key={incident.id}>
              <View style={styles.mobileCardHeader}>
                <Text style={styles.mobileTitle}>{incident.id}</Text>
                <Text style={[styles.statusBadge, { backgroundColor: statusColorMap[incident.status] }]}>
                  {incident.status}
                </Text>
              </View>

              <Text style={styles.mobileMeta}>Type: {incident.type}</Text>
              <Text style={styles.mobileMeta}>Location: {incident.location}</Text>
              <Text style={styles.mobileMeta}>Method: {incident.method}</Text>
              <Text style={styles.mobileMeta}>Time: {incident.time}</Text>
              <Text style={styles.mobileMeta}>Date: {incident.date}</Text>

              <View style={styles.actionsCell}>
                <TouchableOpacity style={styles.editButton} onPress={() => openEditModal(incident)}>
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeIncident(incident.id)}
                >
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
              <Text style={[styles.cell, styles.headerCell, styles.cellType]}>Type</Text>
              <Text style={[styles.cell, styles.headerCell, styles.cellLocation]}>Location</Text>
              <Text style={[styles.cell, styles.headerCell, styles.cellMethod]}>Method</Text>
              <Text style={[styles.cell, styles.headerCell, styles.cellTime]}>Time</Text>
              <Text style={[styles.cell, styles.headerCell, styles.cellDate]}>Date</Text>
              <Text style={[styles.cell, styles.headerCell, styles.cellStatus]}>Status</Text>
              <Text style={[styles.cell, styles.headerCell, styles.cellActions]}>Actions</Text>
            </View>

            {filteredRows.map((incident) => (
              <View style={styles.tableRow} key={incident.id}>
                <Text style={[styles.cell, styles.cellId]}>{incident.id}</Text>
                <Text style={[styles.cell, styles.cellType]}>{incident.type}</Text>
                <Text style={[styles.cell, styles.cellLocation]}>{incident.location}</Text>
                <Text style={[styles.cell, styles.cellMethod]}>{incident.method}</Text>
                <Text style={[styles.cell, styles.cellTime]}>{incident.time}</Text>
                <Text style={[styles.cell, styles.cellDate]}>{incident.date}</Text>
                <View style={[styles.cell, styles.cellStatus]}>
                  <Text
                    style={[styles.statusBadge, { backgroundColor: statusColorMap[incident.status] }]}
                  >
                    {incident.status}
                  </Text>
                </View>
                <View style={[styles.cell, styles.cellActions, styles.actionsCell]}>
                  <TouchableOpacity style={styles.editButton} onPress={() => openEditModal(incident)}>
                    <Text style={styles.actionButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeIncident(incident.id)}
                  >
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
            <Text style={styles.modalTitle}>{editingId ? "Edit Incident" : "Add Incident"}</Text>

            <TextInput
              style={styles.input}
              value={form.location}
              onChangeText={(value) => setForm((prev) => ({ ...prev, location: value }))}
              placeholder="Location"
              placeholderTextColor="#6b7280"
            />
            <TextInput
              style={styles.input}
              value={form.time}
              onChangeText={(value) => setForm((prev) => ({ ...prev, time: value }))}
              placeholder="Time"
              placeholderTextColor="#6b7280"
            />
            <TextInput
              style={styles.input}
              value={form.date}
              onChangeText={(value) => setForm((prev) => ({ ...prev, date: value }))}
              placeholder="Date (YYYY-MM-DD)"
              placeholderTextColor="#6b7280"
            />

            <View style={styles.inlineSelectRow}>
              <TouchableOpacity
                style={styles.filterButton}
                onPress={() =>
                  setForm((prev) => ({
                    ...prev,
                    type: prev.type === "Fire" ? "Gas" : "Fire",
                    method:
                      prev.type === "Fire"
                        ? "Gas Sensor"
                        : prev.method === "Gas Sensor"
                          ? "Heat Sensor"
                          : prev.method,
                  }))
                }
              >
                <Text style={styles.filterButtonText}>Type: {form.type}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.filterButton}
                onPress={() => {
                  const methods: IncidentReportItem["method"][] = [
                    "Heat Sensor",
                    "Camera AI",
                    "Gas Sensor",
                  ];
                  const index = methods.indexOf(form.method);
                  setForm((prev) => ({ ...prev, method: methods[(index + 1) % methods.length] }));
                }}
              >
                <Text style={styles.filterButtonText}>Method: {form.method}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.filterButton}
                onPress={() => {
                  const statuses: IncidentReportItem["status"][] = [
                    "open",
                    "investigating",
                    "resolved",
                  ];
                  const index = statuses.indexOf(form.status);
                  setForm((prev) => ({ ...prev, status: statuses[(index + 1) % statuses.length] }));
                }}
              >
                <Text style={styles.filterButtonText}>Status: {form.status}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.secondaryButton} onPress={() => setModalOpen(false)}>
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButton} onPress={saveIncident}>
                <Text style={styles.primaryButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        transparent
        visible={activeFilterPicker === "status"}
        animationType="fade"
        onRequestClose={() => setActiveFilterPicker(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setActiveFilterPicker(null)}>
          <Pressable style={styles.pickerCard}>
            <Text style={styles.modalTitle}>Select Status</Text>
            <ScrollView>
              {statusOptions.map((status) => (
                <TouchableOpacity
                  key={status}
                  style={styles.pickerOption}
                  onPress={() => {
                    setStatusFilter(status);
                    setActiveFilterPicker(null);
                  }}
                >
                  <Text style={styles.pickerOptionText}>{status}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        transparent
        visible={activeDatePicker !== null}
        animationType="fade"
        onRequestClose={() => setActiveDatePicker(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setActiveDatePicker(null)}>
          <Pressable style={styles.datePickerCard}>
            <Text style={styles.modalTitle}>Select {activeDatePicker}</Text>

            <DateTimePicker
              value={pickerDate}
              mode="date"
              display={Platform.OS === "android" ? "calendar" : "inline"}
              onChange={onDateChange}
            />

            {Platform.OS === "ios" ? (
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.secondaryButton} onPress={() => setActiveDatePicker(null)}>
                  <Text style={styles.secondaryButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.primaryButton} onPress={() => applyDateFilter(pickerDate)}>
                  <Text style={styles.primaryButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        transparent
        visible={monthPickerVisible}
        animationType="fade"
        onRequestClose={() => setMonthPickerVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setMonthPickerVisible(false)}>
          <Pressable style={styles.pickerCard}>
            <Text style={styles.modalTitle}>Select Month</Text>
            <ScrollView>
              {monthOptions.map((month) => (
                <TouchableOpacity
                  key={month}
                  style={styles.pickerOption}
                  onPress={() => {
                    setDayFilter("");
                    setMonthFilter(month === "all" ? "" : month);
                    setMonthPickerVisible(false);
                  }}
                >
                  <Text style={styles.pickerOptionText}>{month === "all" ? "Any" : month}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}