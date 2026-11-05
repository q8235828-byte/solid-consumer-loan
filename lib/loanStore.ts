"use client";

export interface LoanApplication {
  id: string;
  referenceNumber: string;
  applicantName: string;
  email: string;
  phone: string;
  loanType: "persona" | "auto" | "home" | "ecosolutions" | "education";
  loanTypeLabel: string;
  amount: number;
  termMonths: number;
  monthlyPayment: number;
  interestRate: number; // TAEG
  status: "pending" | "under_review" | "approved" | "rejected" | "disbursed";
  statusLabelFr: string;
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
    id: "app-fr-101",
    referenceNumber: "SBA-FR-2026-89412",
    applicantName: "Jean-Pierre Lambert",
    email: "jp.lambert@example.fr",
    phone: "06 45 89 12 30",
    loanType: "persona",
    loanTypeLabel: "Prêt Personnel Express",
    amount: 15000,
    termMonths: 36,
    monthlyPayment: 435.12,
    interestRate: 2.85,
    status: "approved",
    statusLabelFr: "Approuvé - En attente de signature",
    employmentType: "Salarié CDI (Cadre)",
    monthlyIncome: 3850,
    monthlyExpenses: 1100,
    address: "24 Rue de Courcelles",
    city: "Paris",
    postalCode: "75008",
    createdAt: "2026-11-03T10:15:00Z",
    lastUpdated: "2026-11-05T09:30:00Z",
    creditScore: 785,
    documents: [
      { name: "CNI_Recto_Verso.pdf", type: "Identité", status: "verified", uploadedAt: "2026-11-03" },
      { name: "Bulletins_Salaire_3Mois.pdf", type: "Revenus", status: "verified", uploadedAt: "2026-11-03" },
      { name: "Avis_Imposition_2025.pdf", type: "Fiscalité", status: "verified", uploadedAt: "2026-11-03" },
      { name: "RIB_Compte_Courant.pdf", type: "Bancaire", status: "verified", uploadedAt: "2026-11-03" },
    ],
    officerNotes: [
      "Ratio d'endettement à 28.5%, excellent profil.",
      "Accord de principe émis avec TAEG bonifié 2.85%."
    ]
  },
  {
    id: "app-fr-102",
    referenceNumber: "SBA-FR-2026-92147",
    applicantName: "Sophie Delaunay",
    email: "sophie.delaunay@example.fr",
    phone: "07 82 34 56 78",
    loanType: "auto",
    loanTypeLabel: "Prêt Auto Électrique",
    amount: 28000,
    termMonths: 48,
    monthlyPayment: 620.45,
    interestRate: 3.10,
    status: "under_review",
    statusLabelFr: "En cours d'étude par le comité",
    employmentType: "Profession Libérale",
    monthlyIncome: 4500,
    monthlyExpenses: 1450,
    address: "12 Allée des Tilleuls",
    city: "Lyon",
    postalCode: "69006",
    createdAt: "2026-11-04T14:20:00Z",
    lastUpdated: "2026-11-05T11:45:00Z",
    creditScore: 740,
    documents: [
      { name: "Passeport_Biometrique.pdf", type: "Identité", status: "verified", uploadedAt: "2026-11-04" },
      { name: "Bilan_Comptable_2025.pdf", type: "Revenus", status: "verified", uploadedAt: "2026-11-04" },
      { name: "Bon_Commande_Tesla_Y.pdf", type: "Projet", status: "pending", uploadedAt: "2026-11-05" },
    ],
    officerNotes: [
      "Véhicule éligible au bonus écologique.",
      "En attente de vérification du bon de commande définitif."
    ]
  },
  {
    id: "app-fr-103",
    referenceNumber: "SBA-FR-2026-93820",
    applicantName: "Marc Vasseur",
    email: "marc.vasseur@example.fr",
    phone: "06 11 22 33 44",
    loanType: "ecosolutions",
    loanTypeLabel: "Prêt Éco-Transition & Solaire",
    amount: 18500,
    termMonths: 60,
    monthlyPayment: 335.80,
    interestRate: 2.85,
    status: "disbursed",
    statusLabelFr: "Fonds débloqués sur votre compte",
    employmentType: "Fonctionnaire d'État",
    monthlyIncome: 2950,
    monthlyExpenses: 800,
    address: "5 Rue Gambetta",
    city: "Bordeaux",
    postalCode: "33000",
    createdAt: "2026-10-28T08:00:00Z",
    lastUpdated: "2026-11-02T15:00:00Z",
    creditScore: 810,
    documents: [
      { name: "CNI_France.pdf", type: "Identité", status: "verified", uploadedAt: "2026-10-28" },
      { name: "Devis_Panneaux_Photovoltaiques.pdf", type: "Travaux", status: "verified", uploadedAt: "2026-10-28" },
      { name: "RIB_Virement_Immediat.pdf", type: "Bancaire", status: "verified", uploadedAt: "2026-10-28" },
    ],
    officerNotes: [
      "Dossier conforme RGE. Fonds débloqués sous 48h.",
      "Prélèvement mensuel SEPA activé pour le 5 de chaque mois."
    ]
  },
  {
    id: "app-fr-104",
    referenceNumber: "SBA-FR-2026-94011",
    applicantName: "Camille Roussel",
    email: "camille.roussel@example.fr",
    phone: "07 55 66 77 88",
    loanType: "persona",
    loanTypeLabel: "Prêt Personnel Express",
    amount: 6000,
    termMonths: 24,
    monthlyPayment: 257.45,
    interestRate: 2.85,
    status: "pending",
    statusLabelFr: "Dossier reçu - Pièces en cours de validation",
    employmentType: "Salarié CDD",
    monthlyIncome: 1850,
    monthlyExpenses: 650,
    address: "8 Place de la République",
    city: "Nantes",
    postalCode: "44000",
    createdAt: "2026-11-05T09:12:00Z",
    lastUpdated: "2026-11-05T09:12:00Z",
    creditScore: 660,
    documents: [
      { name: "CNI_Camille.pdf", type: "Identité", status: "verified", uploadedAt: "2026-11-05" },
      { name: "Contrat_Travail.pdf", type: "Contrat", status: "pending", uploadedAt: "2026-11-05" },
    ],
    officerNotes: [
      "Demande reçue via le portail en ligne."
    ]
  }
];

export const STORAGE_KEY = "sterling_bank_applications_v2";

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
  const id = `app-fr-${Date.now().toString().slice(-5)}`;
  const ref = `SBA-FR-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  
  const created: LoanApplication = {
    id,
    referenceNumber: ref,
    applicantName: newApp.applicantName || "Nouveau Demandeur",
    email: newApp.email || "client@example.fr",
    phone: newApp.phone || "01 00 00 00 00",
    loanType: newApp.loanType || "persona",
    loanTypeLabel: newApp.loanTypeLabel || "Prêt Personnel Express",
    amount: newApp.amount || 10000,
    termMonths: newApp.termMonths || 36,
    monthlyPayment: newApp.monthlyPayment || 290,
    interestRate: newApp.interestRate || 2.85,
    status: "pending",
    statusLabelFr: "Dossier reçu - Pièces en cours de validation",
    employmentType: newApp.employmentType || "Salarié",
    monthlyIncome: newApp.monthlyIncome || 2500,
    monthlyExpenses: newApp.monthlyExpenses || 700,
    address: newApp.address || "Paris",
    city: newApp.city || "Paris",
    postalCode: newApp.postalCode || "75001",
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    creditScore: 720,
    documents: [
      { name: "Piece_Identite.pdf", type: "Identité", status: "pending", uploadedAt: new Date().toISOString().slice(0, 10) },
      { name: "Dernier_Bulletin_Salaire.pdf", type: "Revenus", status: "pending", uploadedAt: new Date().toISOString().slice(0, 10) },
    ],
    officerNotes: ["Demande transmise avec succès via le portail en ligne."]
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
