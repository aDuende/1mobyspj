// Simple complaints store using localStorage for persistence
export interface Complaint {
  id: string;
  subject: string;
  details: string;
  date: string;
  status: "Pending" | "In Progress" | "Resolved" | "Closed";
  fileCount: number;
  attachments?: string[];
  response?: string;
  responseDate?: string;
  respondedBy?: string;
  resolvedDate?: string;
  responseTime?: string;
  category?: string;
  submittedBy: string; // username of the submitter
  submittedByRole: "employee" | "manager" | "admin";
}

const STORAGE_KEY = "complaints_data";

// Initialize with some mock data if empty
const initialComplaints: Complaint[] = [
  {
    id: "CMP-2024-001",
    subject: "Technical issue",
    details: "Unable to access the performance review module after the latest platform update. The page returns a 403 error when navigating from the dashboard. Issue started on 14 Apr 2024 following the v3.2 deployment. Both Chrome and Edge browsers were affected.",
    date: "2024-04-15",
    status: "Resolved",
    fileCount: 2,
    category: "Technical",
    resolvedDate: "2024-04-17",
    responseTime: "2 days",
    respondedBy: "Admin",
    submittedBy: "Tarin.Chon",
    submittedByRole: "employee"
  },
  {
    id: "CMP-2024-002",
    subject: "Leave request delay",
    details: "My annual leave request for May 2024 is still pending approval for 2 weeks.",
    date: "2024-04-10",
    status: "In Progress",
    fileCount: 0,
    category: "HR",
    respondedBy: "Admin",
    submittedBy: "Sam.Frea",
    submittedByRole: "manager"
  },
  {
    id: "CMP-2024-003",
    subject: "Account problem",
    details: "Cannot reset my password. The email verification link is not arriving.",
    date: "2024-04-05",
    status: "Pending",
    fileCount: 1,
    category: "Account",
    submittedBy: "Tarin.Chon",
    submittedByRole: "employee"
  }
];

export const complaintsStore = {
  // Get all complaints
  getAll(): Complaint[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialComplaints));
      return initialComplaints;
    }
    return JSON.parse(stored);
  },

  // Get complaints for a specific user
  getByUser(username: string): Complaint[] {
    return this.getAll().filter(c => c.submittedBy === username);
  },

  // Add a new complaint
  add(complaint: Omit<Complaint, "id">): Complaint {
    const complaints = this.getAll();
    
    // Generate new ID
    const lastId = complaints.length > 0 
      ? Math.max(...complaints.map(c => parseInt(c.id.split('-')[2])))
      : 0;
    const newId = `CMP-2024-${String(lastId + 1).padStart(3, '0')}`;
    
    const newComplaint: Complaint = {
      ...complaint,
      id: newId,
    };
    
    complaints.unshift(newComplaint); // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
    
    return newComplaint;
  },

  // Update a complaint (for admin)
  update(id: string, updates: Partial<Complaint>): void {
    const complaints = this.getAll();
    const index = complaints.findIndex(c => c.id === id);
    
    if (index !== -1) {
      complaints[index] = { ...complaints[index], ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
    }
  },

  // Delete a complaint
  delete(id: string): void {
    const complaints = this.getAll().filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
  }
};
