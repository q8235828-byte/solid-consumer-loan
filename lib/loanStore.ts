"use client";

export interface LoanApplication {
  id: string;
  referenceNumber: string;
  applicantName: string;
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
}

const INITIAL_APPLICATIONS: LoanApplication[] = [
  {
    id: "app-101",
    referenceNumber: "SBA-2026-89412",
    applicantName: "David Harrison",
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
    address: "742 Evergreen Terrace",
    city: "New York",
    postalCode: "10001",
    createdAt: "2026-11-03T10:15:00Z",
    lastUpdated: "2026-11-05T09:30:00Z",
    creditScore: 785,
    documents: [
      { name: "Government_Photo_ID.pdf", type: "Identity", status: "verified", uploadedAt: "2026-11-03" },
      { name: "Pay_Stubs_3_Months.pdf", type: "Income", status: "verified", uploadedAt: "2026-11-03" },
      { name: "Annual_Tax_Return_2025.pdf", type: "Tax", status: "verified", uploadedAt: "2026-11-03" },
      { name: "Bank_Statement_Current.pdf", type: "Banking", status: "verified", uploadedAt: "2026-11-03" },
    ],
    officerNotes: [
      "Debt-to-income ratio confirmed at 28.5%, prime risk profile.",
      "Credit committee issued preliminary facility approval with 2.85% fixed APR."
    ]
  },
  {
    id: "app-102",
    referenceNumber: "SBA-2026-92147",
    applicantName: "Sofia Morales",
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
    address: "12 Meadow Lane",
    city: "Austin",
    postalCode: "78701",
    createdAt: "2026-11-04T14:20:00Z",
    lastUpdated: "2026-11-05T11:45:00Z",
    creditScore: 740,
    documents: [
      { name: "Passport_Biometric.pdf", type: "Identity", status: "verified", uploadedAt: "2026-11-04" },
      { name: "Audited_Financials_2025.pdf", type: "Income", status: "verified", uploadedAt: "2026-11-04" },
      { name: "Dealer_Purchase_Order.pdf", type: "Project", status: "pending", uploadedAt: "2026-11-05" },
    ],
    officerNotes: [
      "Vehicle qualifies for Clean Mobility program.",
      "Pending final dealer purchase invoice confirmation."
    ]
  },
  {
    id: "app-103",
    referenceNumber: "SBA-2026-93820",
    applicantName: "Marcus Vance",
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
    address: "54 Cambridge Drive",
    city: "Boston",
    postalCode: "02108",
    createdAt: "2026-10-28T08:00:00Z",
    lastUpdated: "2026-11-02T15:00:00Z",
    creditScore: 810,
    documents: [
      { name: "National_ID.pdf", type: "Identity", status: "verified", uploadedAt: "2026-10-28" },
      { name: "Solar_Contract_Estimate.pdf", type: "Works", status: "verified", uploadedAt: "2026-10-28" },
      { name: "Wire_Transfer_Routing.pdf", type: "Banking", status: "verified", uploadedAt: "2026-10-28" },
    ],
    officerNotes: [
      "Energy transition criteria fully satisfied. Funds disbursed via direct wire.",
      "Recurring direct debit scheduled for the 5th of each calendar month."
    ]
  },
  {
    id: "app-104",
    referenceNumber: "SBA-2026-94011",
    applicantName: "Claire Bennett",
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
      "Application submitted via online portal."
    ]
  }
];

export const STORAGE_KEY = "sterling_bank_applications_v3";

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
    window.dispatchEvent(new Event("sterling_applications_updated"));
  } catch (e) {
    console.error("Failed to write to localStorage:", e);
  }
}

export function addApplication(newApp: Partial<LoanApplication>): LoanApplication {
  const apps = getApplications();
  const id = `app-${Date.now().toString().slice(-5)}`;
  const ref = `SBA-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  
  const created: LoanApplication = {
    id,
    referenceNumber: ref,
    applicantName: newApp.applicantName || "New Applicant",
    email: newApp.email || "client@sterlingbankasia.com",
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
    address: newApp.address || "100 Financial Way",
    city: newApp.city || "New York",
    postalCode: newApp.postalCode || "10001",
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    creditScore: 720,
    documents: [
      { name: "Government_Photo_ID.pdf", type: "Identity", status: "pending", uploadedAt: new Date().toISOString().slice(0, 10) },
      { name: "Recent_Income_Statement.pdf", type: "Income", status: "pending", uploadedAt: new Date().toISOString().slice(0, 10) },
    ],
    officerNotes: ["Application submitted successfully via secure online portal."]
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
