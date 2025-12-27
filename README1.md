text
# 💰 TaxCortex – Smart Tax Calculator (India FY 2025–26)

![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![India](https://img.shields.io/badge/Region-India-orange)
![Frontend](https://img.shields.io/badge/Frontend-React%20JS%20|%20CSS3%20|%20JavaScript-blue)
![Backend](https://img.shields.io/badge/Backend-Optional%20Node.js%20API-green)

---  

## 📋 Project Logo

<img src="./personal/pictures/TAXCORTEX.jpeg" alt="TaxCortex Logo" align="center" width="220" /> ```


🏷️ Project Name
TaxCortex – Smart Tax Calculator for India (FY 2025–26)

A tax‑first, real-time income tax calculation and planning tool for Indian taxpayers with:

Multiple income sources

Old vs New regime comparison

Family tax optimization

Section 80C investment recommendations

Monthly & quarterly tax tracking

Historical comparison and PDF report export

🖼️ Project Image
text
<img src="./personal/pictures/photo.jpeg" alt="TaxCortex Dashboard" align="center" width="auto" height="auto" />
Add a screenshot of your main dashboard for GitHub preview.

📝 Project Description
TaxCortex is a full-featured income tax calculation and planning platform designed for Indian taxpayers (FY 2025–26).

It helps users:

Calculate income tax liability accurately

Compare Old vs New tax regimes with savings analysis

Plan Section 80C investments for maximum benefit

Do family-level tax planning (individual, senior, super-senior)

Track monthly and quarterly tax payments

Compare historical years and understand tax trends

Export a professional PDF report for records or CA sharing

The app runs almost entirely on the client (React) using browser LocalStorage for persistence, so data stays private on the user’s machine.

🚀 Why Our Smart Tax Calculator Is Better Than Angel One
This project is a FinTech-based Smart Tax Calculator designed specifically for Indian taxpayers (FY 2025–26).

Unlike Angel One, which is primarily an investment and trading platform, TaxCortex is:

Tax-first

Calculation-driven

Compliance-focused

Angel One provides tax-related insights mainly as a supporting feature for investors, whereas TaxCortex is built entirely around accurate income tax calculation, optimization, and planning – a more critical and recurring financial problem for Indian users.

🔍 Key Reasons Why TaxCortex Wins
1️⃣ Tax-First vs Investment-First Approach
Angel One

Focus is on stocks, mutual funds, F&O, and portfolio tracking

Shows tax impact mostly for capital gains

TaxCortex

Focuses on complete income tax computation

Covers salary, rental income, freelance/business, capital gains, dividends, interest

👉 Result: Better accuracy and real-world usefulness for all taxpayers, not just traders/investors.

2️⃣ Complete Multiple Income Source Support
TaxCortex supports:

Salary income

Rental income

Capital gains

Freelance / business income

Dividend & interest income

Angel One mainly covers market-linked income and ignores other common sources.

👉 Result: Our calculator works for salaried employees, freelancers, landlords, and investors.

3️⃣ Family Tax Planning (Major Differentiator)
TaxCortex allows:

Comparing tax for individual, senior citizen, and super senior citizen

Planning at family level instead of just single-user view

Angel One does not provide family-based tax comparison or optimization.

👉 Result: Highly practical for Indian households doing joint planning.

4️⃣ Section 80C–Focused Investment Recommendations
TaxCortex recommends tax-saving investments such as:

PPF

ELSS

NPS

Life insurance

Home loan principal deductions

Angel One recommends investments mainly based on returns, not tax-saving efficiency.

👉 Result: Better tax optimization, not only wealth growth.

5️⃣ Monthly & Quarterly Tax Tracking
TaxCortex provides:

Monthly estimated tax

Quarterly advance tax breakdown (to avoid penalties)

Angel One does not offer structured advance tax planning.

👉 Result: Almost CA-level financial planning capability for normal users.

6️⃣ Historical Tax Comparison
Users can compare tax data across multiple financial years:

Income growth

Tax growth

Effective tax rate evolution

Angel One focuses on portfolio performance, not tax evolution.

👉 Result: Better long-term financial awareness and planning.

7️⃣ Privacy-First Architecture
All calculations happen client-side in the browser

No forced login or KYC

Data stored locally via LocalStorage

Angel One requires account creation and cloud-based data handling.

👉 Result: Higher privacy and trust.


🧠 Core Features
Smart Tax Calculator

Old vs New Regime calculation

FY 2025–26 slab support

Standard deduction and 80C deductions

Multiple Income Sources

Salary, rental, business/freelance, capital gains, dividend, interest

Aggregated into a single tax computation

Family Tax Planning

Add multiple members (name, age, regime)

View preferred regime and liability for each

Investment Recommendations (80C)

Track PPF, ELSS, NPS, insurance, home loan principal

Show claimed vs remaining 80C limit (₹1,50,000)

Monthly & Quarterly Tracking

Convert yearly tax into monthly and quarterly amounts

Historical Comparison

Save snapshots per financial year

Compare income and tax over years

PDF Report Export

Download a clean PDF containing:

Income summary

Regime comparison

80C summary

Chosen regime & yearly tax

🔑 Key Components (React)
text
const UserForm = () => {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Tax calculation logic using taxLogic.js
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Income inputs */}
      {/* Regime selection */}
      {/* Deduction inputs */}
      {/* Category selection */}
    </form>
  );
};
Core React Components
IncomeTab – Inputs for salary, rental, business, capital gains, other

InvestmentsTab – Section 80C investments, remaining limit

DashboardTab – Old vs New regime comparison, overview, PDF export

FamilyTab – Multiple family members, regime preference per member

TimelineTab – Monthly and quarterly tax breakdown

HistoryTab – Year-wise saved snapshots and comparison

taxLogic.js – Slab calculation and 80C computation

PdfReport.js – jsPDF-based report generation

🛠️ Technology Stack
Frontend
text
React (CRA or Vite)   - UI and component logic
CSS3                  - Styling, Porsche-like smooth animations
JavaScript (ES6+)     - Tax logic and state handling
LocalStorage          - Client-side data persistence
jsPDF + html2canvas   - PDF report export
Backend (Optional)
text
Node.js / Express     - Optional REST API for persistence or auth
MongoDB / PostgreSQL  - Optional DB for multi-device sync
🎨 UI / UX Design
Theme: Light theme with various shades of blue as primary color

Kinetics: Smooth, Porsche-style animations using cubic-bezier easing

Layout:

Card-based dashboard

Tabbed navigation (Dashboard, Income, Investments, Family, Timeline, History)

Responsive: Adapted for desktop, tablet, and mobile


📋 Feature Documentation
1. 💰 Basic Tax Calculator
Input: Total income, 80C investments, regime preference

Output: Taxable income, total tax (incl. cess), effective rate

Logic: Slab-based calculation (Old & New) with 4% cess

2. 💼 Multiple Income Sources
Salary, rental, business/freelance, capital gains, dividend & interest

Real-time total income and tax effect

3. ⚖️ Tax Regime Comparison
Compare Old vs New regime

Show which regime gives lower tax

Allow user to override and choose preferred regime

4. 📈 Investment Recommendations (80C)
Track PPF, ELSS, NPS, insurance, home loan principal

Show remaining limit and encourage optimal filling of ₹1.5L

5. 👨‍👩‍👧 Family Tax Planning
Add multiple family members with age & regime

Useful to discuss distribution strategies (conceptual in v1)

6. 📅 Monthly Tax Tracking
Yearly tax → monthly and quarterly amounts

Helpful to plan advance tax and avoid penalty

7. 📊 Historical Comparison
Save snapshots like “FY 2023–24”, “FY 2024–25”, “FY 2025–26”

Table view of income vs tax vs regime across years

8. 📄 Professional PDF Report
One-click PDF export from Dashboard

Includes:

Income breakdown

80C summary

Regime comparison

Chosen regime & annual tax

💾 Data Management
LocalStorage Auto-Save

Saves income, investments, family, and history automatically

Export

PDF report for filing or CA

(Optional) JSON export in future versions

🔐 Security & Privacy
✅ All calculations run client-side
✅ No mandatory login or signup
✅ No server data storage in default setup
✅ Easy to host over HTTPS (Netlify, Vercel, GitHub Pages)


🐛 Troubleshooting
Issue	Fix
App not starting	Run npm install then npm start
Logo not showing	Ensure public/taxcortex-logo.png path is correct
PDF not downloading	Check popup blocker / browser download permissions
Data not persisting	Enable LocalStorage in browser settings
Values look wrong	Check income & investment fields for typos/zeros
📜 License
This project is licensed under the MIT License – feel free to use, modify, and distribute with attribution.

🔄 Version History
v1.0.0 (Current)
✅ React-based tax calculator for India FY 2025–26

✅ Multiple income sources

✅ Old vs New regime comparison

✅ 80C investment tracking

✅ Family planning inputs

✅ Monthly & quarterly breakdown

✅ History snapshots

✅ PDF export

✅ Light blue theme with smooth, Porsche-style UI animations

🎉 Credits
Project: TaxCortex – Smart Tax Calculator

Audience: Indian taxpayers, students, devs & hackathon juries

Stack: React • JavaScript • CSS3 • LocalStorage • jsPDF

📬 Contact
🔗 GitHub: https://github.com/your-username/taxcortex

📧 Email: youremail@example.com

Happy Tax Planning with TaxCortex! 🚀
