TaxCortex - Complete Technical Documentation & Architecture

📁 GitHub Repository Structure

![PHOTO-2026-01-11-13-32-21](https://github.com/user-attachments/assets/1f1315e6-b0f5-42e0-b493-394ac56042a6)


Detailed Repository Organization: The repository follows industry-standard monorepo architecture with clear separation of concerns. The docs/architecture/ directory contains all Data Flow Diagrams (DFDs) and system diagrams exported as PNG for hackathon submissions and technical reviews. src/backend/ houses the Flask Python API with business logic separated into tax_logic.py for testability. src/frontend/ contains production-optimized vanilla JavaScript with no framework dependencies. deployment/ provides Docker containerization and Nginx configuration for zero-downtime production deployments. The tests/ directory maintains 100% unit test coverage for tax calculation accuracy across all FY 2024-25 slabs and edge cases.


🏗️ System Architecture Diagram
<img width="844" height="475" alt="Screenshot 2026-01-11 at 1 11 27 PM" src="https://github.com/user-attachments/assets/bae7500e-a3ba-4460-b635-3cb8d6e84b1f" />


Three-Tier Architecture Explanation: TaxCortex implements a classic three-tier architecture with presentation layer (browser-based HTML/CSS/JS frontend), application layer (Flask REST APIs handling business logic), and data layer (SQLite for development, PostgreSQL for production). Bi-directional communication flows through JSON APIs with WebSocket fallbacks for real-time dashboard updates. Frontend provides React-like UX through custom virtual DOM diffing and cubic-bezier animations. Backend handles complex tax computations offloading CPU-intensive slab calculations from client devices. Progressive Web App (PWA) capabilities ensure complete offline functionality while maintaining seamless online sync.


📊 Data Flow Diagrams (DFDs)

Level 0 DFD - Context Diagram


<img width="844" height="475" alt="![WhatsApp Image 2026-01-11 at 1 38 07 PM]" src="(https://github.com/user-attachments/assets/a27d2d9a-a970-4c4c-be3d-b14791d7b454)" />

System Boundary Definition: Level 0 DFD defines Taxpayer ↔ TaxCortex System interaction where external entity (user) provides input data stream (6 income sources, 6×80C investments, family profiles) and receives output data stream (tax liability, slab breakdowns, quarterly schedules). LocalStorage acts as persistence layer ensuring data survives browser restarts and network interruptions. Single calculate_tax() function encapsulates all system complexity maintaining black-box abstraction for external consumers.
