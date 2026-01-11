TaxCortex - Complete Technical Documentation & Architecture

📁 GitHub Repository Structure

![PHOTO-2026-01-11-13-32-21](https://github.com/user-attachments/assets/1f1315e6-b0f5-42e0-b493-394ac56042a6)


Detailed Repository Organization: The repository follows industry-standard monorepo architecture with clear separation of concerns. The docs/architecture/ directory contains all Data Flow Diagrams (DFDs) and system diagrams exported as PNG for hackathon submissions and technical reviews. src/backend/ houses the Flask Python API with business logic separated into tax_logic.py for testability. src/frontend/ contains production-optimized vanilla JavaScript with no framework dependencies. deployment/ provides Docker containerization and Nginx configuration for zero-downtime production deployments. The tests/ directory maintains 100% unit test coverage for tax calculation accuracy across all FY 2024-25 slabs and edge cases.


🏗️ System Architecture Diagram
<img width="100%" height="475" alt="Screenshot 2026-01-11 at 1 11 27 PM" src="https://github.com/user-attachments/assets/bae7500e-a3ba-4460-b635-3cb8d6e84b1f" />


Three-Tier Architecture Explanation: TaxCortex implements a classic three-tier architecture with presentation layer (browser-based HTML/CSS/JS frontend), application layer (Flask REST APIs handling business logic), and data layer (SQLite for development, PostgreSQL for production). Bi-directional communication flows through JSON APIs with WebSocket fallbacks for real-time dashboard updates. Frontend provides React-like UX through custom virtual DOM diffing and cubic-bezier animations. Backend handles complex tax computations offloading CPU-intensive slab calculations from client devices. Progressive Web App (PWA) capabilities ensure complete offline functionality while maintaining seamless online sync.


📊 Data Flow Diagrams (DFDs)

Level 0 DFD - Context Diagram

![PHOTO-2026-01-11-13-38-05](https://github.com/user-attachments/assets/8411a2b6-307e-4554-81ea-10e73ae36e01)



System Boundary Definition: Level 0 DFD defines Taxpayer ↔ TaxCortex System interaction where external entity (user) provides input data stream (6 income sources, 6×80C investments, family profiles) and receives output data stream (tax liability, slab breakdowns, quarterly schedules). LocalStorage acts as persistence layer ensuring data survives browser restarts and network interruptions. Single calculate_tax() function encapsulates all system complexity maintaining black-box abstraction for external consumers.


Level 1 DFD - Main Processes
<img width="100%" height="390" alt="Screenshot 2026-01-11 at 1 53 10 PM" src="https://github.com/user-attachments/assets/6aa0192d-6470-4bf9-b0d9-bbde30e463d2" />

Process Decomposition: Level 1 breaks system into 5 core processes with clear data flows. 1.0 Input Data validates and sanitizes 12+ financial fields. 2.0 Tax Calculator implements FY24-25 compliant algorithms. 3.0 Report Generator formats results for human consumption. 4.0 Data Store handles bi-directional LocalStorage ↔ PostgreSQL sync. 5.0 Data Export generates audit-ready JSON/PDF outputs.

Level 2 DFD - Tax Calculation Process

<img width="100%" height="476" alt="Screenshot 2026-01-11 at 2 01 58 PM" src="https://github.com/user-attachments/assets/05abb4a7-6fe5-4861-872a-6784b13d6c19" />



Algorithmic Detail: Level 2 reveals three-stage tax pipeline. Pre-process aggregates 6 income streams and caps 80C deductions at ₹1.5L (old regime). Slab Calculator applies progressive brackets [0% ₹0-3L, 5% ₹3-7L, 10% ₹7-10L, 15% ₹10-12L, 20% ₹12-15L, 30% >₹15L] with 4% cess. Post-process computes effective rates and quarterly splits (15-Jun, 15-Sep, 15-Dec, 15-Mar deadlines).


🔧 Component Breakdown

<img width="100%" height="202" alt="Screenshot 2026-01-11 at 2 04 49 PM" src="https://github.com/user-attachments/assets/cd2cd9e5-21d0-4129-9838-1c672f9a0d1d" />

Frontend Component Architecture: Dashboard provides real-time ₹12,50,000 → ₹1,25,000 visualization with 60fps animations. Income Sources uses dynamic form factory generating 6 specialized input types with live validation. Tax Regime Comparison renders interactive tables showing OPS ₹1,25,000 vs NPS ₹1,35,000 with slab-wise breakdowns. 80C tracker enforces ₹1.5L cap with category-wise allocation. Family Planning supports consolidated returns across spouses/dependents. Quarterly Tracking displays statutory due dates with payment calculators. Historical Comparison charts YoY tax progression.


Backend (Flask Python)

<img width="100%" height="175" alt="Screenshot 2026-01-11 at 2 30 58 PM" src="https://github.com/user-attachments/assets/48470f9f-9180-4801-9927-f71fbf243e03" />


<img width="100%" height="492" alt="Screenshot 2026-01-11 at 2 30 00 PM" src="https://github.com/user-attachments/assets/de3032b1-a46b-4a1d-860c-b83fc4a73466" />


REST API Design: /api/calculate_tax accepts complete financial profile returning structured results. /api/compare_regimes runs parallel OPS/NPS calculations. /api/generate_pdf produces CA-ready reports via ReportLab. /api/tax_rates serves FY24-25 slab definitions. /api/save_user_data implements user profile persistence. /api/user_data/:id retrieves historical profiles.

Data Models

Data Modeling: TaxProfile encapsulates complete user financial state with type hints for IDE support. IncomeSource models 6 income categories with amount, category, proof_document fields. Investments tracks 6×80C categories with category, amount, proof_url. FamilyMember supports consolidated planning with individual optimizations.

⚡ Scalability & Performance

<img width="100%" height="398" alt="Screenshot 2026-01-11 at 2 36 12 PM" src="https://github.com/user-attachments/assets/7e11eb9f-f552-4e54-9ec0-616f56dbb374" />

