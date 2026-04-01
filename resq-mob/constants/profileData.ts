export interface OperationsProfileData {
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

export const BFP_PROFILE_DATA: OperationsProfileData = {
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

export const ADMIN_PROFILE_DATA: OperationsProfileData = {
  id: "ADM-2026-RESQ",
  name: "RESQ Command Desk",
  rank: "Incident Administrator",
  station: "RESQ Central Operations",
  phone: "+63 xxx-xxx-1200",
  email: "admin.operations@resq.app",
  profilePicture: "https://via.placeholder.com/120",
  incidents: 392,
  certifications: [
    "Emergency Coordination",
    "Incident Intelligence",
    "Multi-Unit Dispatch",
  ],
  hoursWorked: 9280,
};
