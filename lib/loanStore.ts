"use client";

export interface LoanApplication {
  id: string;
  referenceNumber: string;
  applicantName: string;
  civility?: string;
  email: string;
  phone: string;
  loanType: "persona" | "auto" | "home" | "ecosolutions" | "education";
  loanTypeLabel: string;
  currency?: "USD" | "EUR";
  amount: number;
  termMonths: number;
  monthlyPayment: number;
  interestRate: number; // APR
  status: "pending" | "under_review" | "approved" | "rejected" | "disbursed";
  statusLabelFr: string; // Kept as key for backwards-compatibility, storing clean English label
  employmentType: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  residenceStatus?: string;
  address: string;
  city: string;
  postalCode: string;
  createdAt: string;
  lastUpdated: string;
  creditScore: number;
  documents: {
    name: string;
    type: string;
    status: "verified" | "pending" | "missing";
    uploadedAt: string;
  }[];
  officerNotes: string[];

  // Loan Assignment Fields (Admin can assign/restructure)
  assignedOfficer?: string;
  assignedOfficerEmail?: string;
  assignedOfficerPhone?: string;
  assignedAmount?: number;
  assignedInterestRate?: number;
  assignedTermMonths?: number;
  assignedMonthlyPayment?: number;
  assignedDisbursementMethod?: string;
  assignedDisbursementDate?: string;
  assignmentDate?: string;
}

const INITIAL_APPLICATIONS: LoanApplication[] = [
  {
    id: "app-101",
    referenceNumber: "LCG-2026-89412",
    applicantName: "David Harrison",
    civility: "Mr.",
    email: "d.harrison@example.com",
    phone: "+1 (555) 234-8930",
    loanType: "persona",
    loanTypeLabel: "Persona Personal Loan",
    currency: "USD",
    amount: 15000,
    termMonths: 36,
    monthlyPayment: 435.12,
    interestRate: 2.85,
    status: "approved",
    statusLabelFr: "Approved - Facility Offer Ready",
    employmentType: "Employed Full-Time (Senior Engineer)",
    monthlyIncome: 6500,
    monthlyExpenses: 1800,
    residenceStatus: "Tenant / Renting",
    address: "742 Evergreen Terrace",
    city: "New York",
    postalCode: "10001",
    createdAt: "2026-11-03T10:15:00Z",
    lastUpdated: "2026-11-05T09:30:00Z",
    creditScore: 785,
    assignedOfficer: "Emily Vance",
    assignedOfficerEmail: "emily.vance@loancommercialgroup.com",
    assignedOfficerPhone: "+1 (800) 555-0199",
    assignedAmount: 15000,
    assignedInterestRate: 2.85,
    assignedTermMonths: 36,
    assignedMonthlyPayment: 435.12,
    assignedDisbursementMethod: "Direct Wire Transfer (SWIFT)",
    assignedDisbursementDate: "Within 24 Hours of Signature",
    assignmentDate: "2026-11-04T11:00:00Z",
    documents: [
      { name: "Government_Photo_ID.pdf", type: "Identity", status: "verified", uploadedAt: "2026-11-03" },
      { name: "Pay_Stubs_3_Months.pdf", type: "Income", status: "verified", uploadedAt: "2026-11-03" },
      { name: "Annual_Tax_Return_2025.pdf", type: "Tax", status: "verified", uploadedAt: "2026-11-03" },
      { name: "Bank_Statement_Current.pdf", type: "Banking", status: "verified", uploadedAt: "2026-11-03" },
    ],
    officerNotes: [
      "Assigned to Senior Officer Emily Vance.",
      "Debt-to-income ratio confirmed at 27.7%, prime risk profile.",
      "Credit committee issued facility approval with 2.85% fixed APR."
    ]
  },
  {
    id: "app-102",
    referenceNumber: "LCG-2026-92147",
    applicantName: "Sofia Morales",
    civility: "Ms.",
    email: "sofia.morales@example.com",
    phone: "+1 (555) 891-3421",
    loanType: "auto",
    loanTypeLabel: "Auto & Vehicle Loan",
    currency: "USD",
    amount: 28000,
    termMonths: 48,
    monthlyPayment: 620.45,
    interestRate: 3.10,
    status: "under_review",
    statusLabelFr: "Underwriting Risk Assessment Active",
    employmentType: "Self-Employed / Practice Owner",
    monthlyIncome: 7500,
    monthlyExpenses: 2400,
    residenceStatus: "Homeowner (Active Mortgage)",
    address: "12 Meadow Lane",
    city: "Austin",
    postalCode: "78701",
    createdAt: "2026-11-04T14:20:00Z",
    lastUpdated: "2026-11-05T11:45:00Z",
    creditScore: 740,
    assignedOfficer: "Michael Chang",
    assignedOfficerEmail: "michael.chang@loancommercialgroup.com",
    assignedOfficerPhone: "+1 (800) 555-0198",
    assignedAmount: 28000,
    assignedInterestRate: 3.10,
    assignedTermMonths: 48,
    assignedMonthlyPayment: 620.45,
    assignedDisbursementMethod: "Direct Dealer Wire Transfer",
    assignedDisbursementDate: "Pending final invoice",
    documents: [
      { name: "Passport_Biometric.pdf", type: "Identity", status: "verified", uploadedAt: "2026-11-04" },
      { name: "Audited_Financials_2025.pdf", type: "Income", status: "verified", uploadedAt: "2026-11-04" },
      { name: "Dealer_Purchase_Order.pdf", type: "Project", status: "pending", uploadedAt: "2026-11-05" },
    ],
    officerNotes: [
      "Assigned to Auto Lending Specialist Michael Chang.",
      "Vehicle qualifies for Clean Mobility program.",
      "Pending final dealer purchase invoice confirmation."
    ]
  },
  {
    id: "app-103",
    referenceNumber: "LCG-2026-93820",
    applicantName: "Marcus Vance",
    civility: "Mr.",
    email: "marcus.vance@example.com",
    phone: "+1 (555) 345-6712",
    loanType: "ecosolutions",
    loanTypeLabel: "EcoSolutions Solar & Energy Facility",
    currency: "USD",
    amount: 35000,
    termMonths: 60,
    monthlyPayment: 625.80,
    interestRate: 2.50,
    status: "disbursed",
    statusLabelFr: "Disbursed - Funds Released",
    employmentType: "Public Sector Director",
    monthlyIncome: 5800,
    monthlyExpenses: 1500,
    residenceStatus: "Homeowner (No Mortgage)",
    address: "54 Cambridge Drive",
    city: "Boston",
    postalCode: "02108",
    createdAt: "2026-10-28T08:00:00Z",
    lastUpdated: "2026-11-02T15:00:00Z",
    creditScore: 810,
    assignedOfficer: "David Sterling",
    assignedOfficerEmail: "david.sterling@loancommercialgroup.com",
    assignedOfficerPhone: "+1 (800) 555-0195",
    assignedAmount: 35000,
    assignedInterestRate: 2.50,
    assignedTermMonths: 60,
    assignedMonthlyPayment: 625.80,
    assignedDisbursementMethod: "Direct Wire Transfer (SWIFT)",
    assignedDisbursementDate: "Disbursed on Nov 02, 2026",
    documents: [
      { name: "National_ID.pdf", type: "Identity", status: "verified", uploadedAt: "2026-10-28" },
      { name: "Solar_Contract_Estimate.pdf", type: "Works", status: "verified", uploadedAt: "2026-10-28" },
      { name: "Wire_Transfer_Routing.pdf", type: "Banking", status: "verified", uploadedAt: "2026-10-28" },
    ],
    officerNotes: [
      "Assigned to Senior Director David Sterling.",
      "Energy transition criteria fully satisfied. Funds disbursed via direct wire.",
      "Recurring direct debit scheduled for the 5th of each calendar month."
    ]
  },
  {
    id: "app-104",
    referenceNumber: "LCG-2026-94011",
    applicantName: "Claire Bennett",
    civility: "Ms.",
    email: "claire.bennett@example.com",
    phone: "+1 (555) 789-0123",
    loanType: "persona",
    loanTypeLabel: "Persona Personal Loan",
    currency: "USD",
    amount: 8000,
    termMonths: 24,
    monthlyPayment: 343.20,
    interestRate: 2.85,
    status: "pending",
    statusLabelFr: "Application Received - Initial Review",
    employmentType: "Employed Full-Time",
    monthlyIncome: 3400,
    monthlyExpenses: 1100,
    residenceStatus: "Tenant / Renting",
    address: "88 Lincoln Boulevard",
    city: "Chicago",
    postalCode: "60601",
    createdAt: "2026-11-05T09:12:00Z",
    lastUpdated: "2026-11-05T09:12:00Z",
    creditScore: 680,
    documents: [
      { name: "ID_Card.pdf", type: "Identity", status: "verified", uploadedAt: "2026-11-05" },
      { name: "Employment_Verification.pdf", type: "Contract", status: "pending", uploadedAt: "2026-11-05" },
    ],
    officerNotes: [
      "Application submitted via online portal. Ready for officer assignment."
    ]
  }
];

export const STORAGE_KEY = "lcg_bank_applications_v5";

export function getApplications(): LoanApplication[] {
  if (typeof window === "undefined") return INITIAL_APPLICATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read from localStorage:", e);
    return INITIAL_APPLICATIONS;
  }
}

export function saveApplications(apps: LoanApplication[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
    window.dispatchEvent(new Event("lcg_applications_updated"));
  } catch (e) {
    console.error("Failed to write to localStorage:", e);
  }
}

export function addApplication(newApp: Partial<LoanApplication>): LoanApplication {
  const apps = getApplications();
  const id = `app-${Date.now().toString().slice(-5)}`;
  const ref = `LCG-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  
  const created: LoanApplication = {
    id,
    referenceNumber: ref,
    applicantName: newApp.applicantName || "New Applicant",
    civility: newApp.civility || "Mr.",
    email: newApp.email || "client@loancommercialgroup.com",
    phone: newApp.phone || "+1 (555) 000-0000",
    loanType: newApp.loanType || "persona",
    loanTypeLabel: newApp.loanTypeLabel || "Persona Personal Loan",
    currency: newApp.currency || "USD",
    amount: newApp.amount || 10000,
    termMonths: newApp.termMonths || 36,
    monthlyPayment: newApp.monthlyPayment || 290,
    interestRate: newApp.interestRate || 2.85,
    status: "pending",
    statusLabelFr: "Application Received - Under Initial Review",
    employmentType: newApp.employmentType || "Employed",
    monthlyIncome: newApp.monthlyIncome || 4500,
    monthlyExpenses: newApp.monthlyExpenses || 1200,
    residenceStatus: newApp.residenceStatus || "Tenant / Renting",
    address: newApp.address || "100 Financial Way",
    city: newApp.city || "New York",
    postalCode: newApp.postalCode || "10001",
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    creditScore: 720,
    documents: newApp.documents && newApp.documents.length > 0 ? newApp.documents : [
      { name: "Government_Photo_ID.pdf", type: "Identity", status: "pending", uploadedAt: new Date().toISOString().slice(0, 10) },
      { name: "Recent_Income_Statement.pdf", type: "Income", status: "pending", uploadedAt: new Date().toISOString().slice(0, 10) },
    ],
    officerNotes: ["Application submitted successfully via secure online portal. Awaiting officer assignment."]
  };

  const updated = [created, ...apps];
  saveApplications(updated);
  return created;
}

export function updateApplicationStatus(
  id: string, 
  status: LoanApplication["status"], 
  statusLabelFr: string,
  newNote?: string
): LoanApplication | null {
  const apps = getApplications();
  const index = apps.findIndex(a => a.id === id);
  if (index === -1) return null;

  const app = { ...apps[index] };
  app.status = status;
  app.statusLabelFr = statusLabelFr;
  app.lastUpdated = new Date().toISOString();
  if (newNote) {
    app.officerNotes = [newNote, ...app.officerNotes];
  }

  apps[index] = app;
  saveApplications(apps);
  return app;
}

export function assignLoan(
  id: string,
  assignment: {
    officerName?: string;
    officerEmail?: string;
    officerPhone?: string;
    assignedAmount?: number;
    assignedInterestRate?: number;
    assignedTermMonths?: number;
    assignedMonthlyPayment?: number;
    assignedDisbursementMethod?: string;
    assignedDisbursementDate?: string;
    status?: LoanApplication["status"];
    statusLabelFr?: string;
    note?: string;
  }
): LoanApplication | null {
  const apps = getApplications();
  const index = apps.findIndex(a => a.id === id);
  if (index === -1) return null;

  const app = { ...apps[index] };
  if (assignment.officerName) app.assignedOfficer = assignment.officerName;
  if (assignment.officerEmail) app.assignedOfficerEmail = assignment.officerEmail;
  if (assignment.officerPhone) app.assignedOfficerPhone = assignment.officerPhone;
  if (assignment.assignedAmount !== undefined && !isNaN(assignment.assignedAmount)) {
    app.assignedAmount = assignment.assignedAmount;
  }
  if (assignment.assignedInterestRate !== undefined && !isNaN(assignment.assignedInterestRate)) {
    app.assignedInterestRate = assignment.assignedInterestRate;
  }
  if (assignment.assignedTermMonths !== undefined && !isNaN(assignment.assignedTermMonths)) {
    app.assignedTermMonths = assignment.assignedTermMonths;
  }
  if (assignment.assignedMonthlyPayment !== undefined && !isNaN(assignment.assignedMonthlyPayment)) {
    app.assignedMonthlyPayment = assignment.assignedMonthlyPayment;
  }
  if (assignment.assignedDisbursementMethod) {
    app.assignedDisbursementMethod = assignment.assignedDisbursementMethod;
  }
  if (assignment.assignedDisbursementDate) {
    app.assignedDisbursementDate = assignment.assignedDisbursementDate;
  }
  app.assignmentDate = new Date().toISOString();

  if (assignment.status) {
    app.status = assignment.status;
  }
  if (assignment.statusLabelFr) {
    app.statusLabelFr = assignment.statusLabelFr;
  }
  app.lastUpdated = new Date().toISOString();

  if (assignment.note) {
    app.officerNotes = [assignment.note, ...app.officerNotes];
  }

  apps[index] = app;
  saveApplications(apps);
  return app;
}

export function deleteApplication(id: string): boolean {
  const apps = getApplications();
  const filtered = apps.filter(a => a.id !== id);
  if (filtered.length === apps.length) return false;
  saveApplications(filtered);
  return true;
}
