# Functional & System Requirements Document (SRS)
## Project: Sterling Bank of Asia – Digital Consumer Loan Portal
**Target Reference:** [sterlingbankasia.com](https://www.sterlingbankasia.com/)  
**Target Platform:** Next.js (App Router, React 19 / TypeScript / Tailwind CSS / Radix UI)  
**Workspace:** `d:\Consumer Loan`  
**Document Version:** 1.0.0  
**Status:** Approved for Architecture & Implementation  

---

## 1. Executive Summary & REA Deconstruction Findings

A reverse engineering analysis of the current public production site `sterlingbankasia.com` reveals:
1. **Underlying Architecture:** Legacy monolithic Drupal CMS with traditional multi-page navigation, synchronous form submissions, and static PDF downloads for loan application forms.
2. **Current Pain Points:**
   - No interactive, real-time client-side loan calculator linked directly to seamless digital onboarding.
   - Disconnected application funnels requiring customers to download, print, scan, or email physical application forms (`.pdf`).
   - Lack of responsive modern mobile-first digital self-service.
   - Fragmented user experience between public marketing pages and the legacy `sterlingbankonline-personal.com` portal.
3. **Re-engineering Objective:** Modernize the **Consumer Loans** division into a high-performance, banking-grade Next.js web application with:
   - Real-time loan calculation engines with amortization schedules.
   - Frictionless multi-step loan application wizard with KYC document capture.
   - Real-time loan application tracking dashboard.
   - Enterprise security aligned with Bangko Sentral ng Pilipinas (BSP) circulars and Philippine Data Privacy Act (RA 10173).

---

## 2. Product Scope & Loan Catalog Matrix

The portal must support the four foundational consumer loan products of Sterling Bank of Asia:

| Product Name | Category | Loan Amount Range | Tenor / Terms | Minimum Monthly Income | Repayment Mode | Key Target Segment |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Persona Personal Loan** | Unsecured Personal Loan | ₱30,000 – ₱1,000,000 | 3, 6, 12, 18, 24, 36 months | ₱30,000 / month | Post-Dated Checks (PDC) / Auto Debit (ADA) | Salaried employees & licensed professionals needing urgent liquidity |
| **Ultima Auto Loan** | Secured Vehicle Loan | ₱100,000 – 80% vehicle value | 12 to 60 mos (Brand New)<br>12 to 48 mos (Pre-owned) | Debt-to-income: Monthly amortization ≤ 30% gross income | PDC / ADA | Individuals & corporate fleet purchasers buying brand new or 2nd-hand units |
| **Discovery Home Loan** | Secured Real Estate Mortgage | ₱300,000 – ₱25,000,000 | 1 to 25 years (up to age 65 upon maturity) | ₱40,000 combined household income | PDC / ADA | Home purchase, lot acquisition, house construction, renovation, refinancing |
| **AvanceCash Salary Loan** | Payroll / Institutional Loan | ₱10,000 – 3x monthly net salary | 3 to 12 months | Qualified tie-up partner employees | Automatic payroll deduction / ADA | Accredited corporate payroll clients looking for short-term emergency funds |

---

## 3. Functional Requirements (FR)

### FR-1: Product Discovery & Interactive Loan Simulator
* **FR-1.1:** Real-time loan calculator for each loan type:
  * Dynamic sliders and numerical inputs for **Principal Amount**, **Downpayment / Equity %** (for Auto/Home), and **Loan Tenor**.
  * Instant compute of **Estimated Monthly Amortization**, **Total Interest**, **Effective Interest Rate (EIR)**, and **Total Loan Cost**.
* **FR-1.2 Amortization Breakdown Table:**
  * Option to toggle full schedule breakdown showing: Period, Payment Amount, Principal Paid, Interest Paid, Remaining Balance.
* **FR-1.3 Quick Eligibility Check:**
  * Interactive pre-qualifier quiz: Age (21–65), Employment Type (Employed, Self-Employed, OFW, Corporate), Monthly Income, and Credit standing check.
  * Instant recommendation banner indicating eligibility status before formal application.

### FR-2: Digital Loan Onboarding Wizard (Multi-step Funnel)
* **FR-2.1 Step 1: Personal & Identity Information:**
  * Full Legal Name (First, Middle, Last, Suffix), Date of Birth, Gender, Civil Status, Mother's Maiden Name, Dependent count.
  * Government IDs: SSS / GSIS / TIN / UMID / Philippine National ID (PhilSys).
* **FR-2.2 Step 2: Contact & Residential Details:**
  * Mobile Phone (with SMS OTP verification), Work Phone, Primary Email (with Email Verification token).
  * Current Address and Permanent Address (with ownership type: Owned, Mortgaged, Rented, Living with parents; tenure in years).
* **FR-2.3 Step 3: Employment & Financial Profile:**
  * Employment status (Regular, Probationary, Self-employed/Business, OFW).
  * Employer / Business Name, Office Address, Industry, Job Title, Tenure with current employer.
  * Gross Monthly Income, Other Income sources, Existing loans/debts with other banks.
* **FR-2.4 Step 4: Loan Specific Parameters:**
  * **Persona:** Purpose of loan (medical, education, home upgrade, travel, debt consolidation).
  * **Ultima Auto:** Vehicle condition (Brand New / Second Hand), Dealer Name, Make, Model, Variant, Year, Unit Price, Downpayment %.
  * **Discovery Home:** Property Type (House & Lot, Condo, Townhouse, Vacant Lot), Property Location, Developer/Seller, Total Contract Price (TCP).
* **FR-2.5 Step 5: Secure Document Upload / Digital KYC:**
  * Client-side preview, validation, and encrypted upload for:
    - 2 Valid Primary Government IDs (Front & Back).
    - Latest 3 months Payslips or Certificate of Employment with Compensation (COEC).
    - Latest BIR Form 2316 / ITR / Audited Financial Statements (for self-employed).
    - Proof of Billing (Utility bill not older than 3 months).
    - Collateral docs (for Auto: Proforma Dealer Invoice; for Home: TCT/CCT copy, Tax Declaration).
* **FR-2.6 Step 6: Review, Declarations, & Consent:**
  * Interactive review summary of all entered details.
  * Explicit checkboxes for Data Privacy Consent (RA 10173), BSP Credit Bureau authorization, and Terms & Conditions.
  * Digital signature capture / E-sign consent.
  * Submission generates an irrevocable Application Reference Number (e.g., `SBA-LN-202611-98421`).

### FR-3: Application Status Tracking Portal
* **FR-3.1:** Public lookup widget using **Application Reference Number** + **Registered Mobile Number / OTP**.
* **FR-3.2:** Visual status pipeline stages:
  1. *Application Submitted*
  2. *Initial KYC & Document Verification*
  3. *Credit Investigation (CI) & Underwriting*
  4. *Conditional / Final Approval*
  5. *Document Signing & PDC Submission*
  6. *Loan Proceeds Disbursement*
* **FR-3.3:** Notification history (SMS and Email audit log).

### FR-4: Bank Administration & Loan Officer Portal (Internal)
* **FR-4.1 Role-Based Access Control (RBAC):** Loan Officer, Credit Underwriter, Compliance/KYC Officer, Super Admin.
* **FR-4.2 Queue Management:** Filter by loan type, date, income bracket, risk tier, and status.
* **FR-4.3 Underwriting Tools:** Scorecard calculation, debt-to-income (DTI) ratio calculator, credit bureau check integration, and note logging.

---

## 4. Non-Functional Requirements (NFR)

### NFR-1: Performance & Web Vitals
* **Core Web Vitals Thresholds:**
  - Largest Contentful Paint (LCP) < 1.8 seconds.
  - Interaction to Next Paint (INP) < 100 milliseconds.
  - Cumulative Layout Shift (CLS) < 0.05.
* Server-Side Rendering (SSR) and Static Site Generation (SSG) for all marketing pages with Incremental Static Regeneration (ISR) where rates change.

### NFR-2: Mobile-First Responsiveness & Accessibility
* Flawless layout on viewport widths from 360px (mobile) to 2560px (ultra-wide desktop).
* WCAG 2.1 AA Compliance: High contrast color ratios, screen-reader aria labels, keyboard navigation throughout multi-step forms.

### NFR-3: Reliability & Scalability
* 99.95% portal availability.
* Microservices-ready Next.js API Routes / Server Actions interfacing with core banking APIs via circuit breaker and retry mechanisms.

---

## 5. Regulatory & Compliance Standards (Philippines)

1. **BSP Circular 808 & 982:** Core banking guidelines on information technology risk management and electronic banking safety.
2. **Republic Act No. 10173 (Data Privacy Act of 2012):** Strict compliance with the National Privacy Commission (NPC) requirements for financial consumer data handling.
3. **Credit Information Corporation (CIC) Mandate:** Compliance with credit data submission and inquiry protocols.
4. **Anti-Money Laundering Council (AMLC) Guidelines:** Watchlist screening and suspicious transaction reporting hooks.
