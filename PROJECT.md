TaxCortex - Complete Technical Documentation & Architecture

📁 GitHub Repository Structure

taxcortex/
├── README.md                 # Project documentation (this file)
│
├── docs/                     # Documentation and design assets
│   ├── architecture/         # System design diagrams
│   │   ├── system-architecture.png
│   │   ├── dfd-level-0.png
│   │   ├── dfd-level-1.png
│   │   └── dfd-level-2.png
│   ├── api/                  # API documentation (future scope)
│   └── deployment/           # Deployment-related docs
│
├── src/                      # Source code
│   ├── backend/              # Backend (Python / Flask)
│   │   ├── app.py            # Main Flask application & API routes
│   │   ├── tax_logic.py      # Core tax calculation logic
│   │   └── requirements.txt  # Backend dependencies
│   │
│   ├── frontend/             # Frontend (HTML, CSS, JS)
│   │   ├── index.html        # Main UI page
│   │   ├── styles.css        # Styling for the frontend
│   │   └── app.js            # Frontend logic & API calls
│   │
│   └── static/               # Static assets
│       └── logo.png
│
├── deployment/               # Production & container setup
│   ├── docker-compose.yml    # Docker multi-container configuration
│   └── nginx.conf            # NGINX reverse proxy configuration
│
└── tests/                    # Unit and integration tests (to be added)


🏗️ System Architecture Diagram
<img width="844" height="475" alt="Screenshot 2026-01-11 at 1 11 27 PM" src="https://github.com/user-attachments/assets/bae7500e-a3ba-4460-b635-3cb8d6e84b1f" />


