/* ===========================
   DATA STORE
=========================== */
let taxData = {
    incomeSources: [],
    investments: {
        lic: 0, ppf: 0, nps: 0,
        homePayment: 0, elss: 0, sukanya: 0
    },
    selectedRegime: 'ops'
};

/* ===========================
   INIT
=========================== */
window.onload = () => {
    loadFromLocalStorage();
    if (taxData.incomeSources.length === 0) addIncomeSource();
    updateDashboard();
};

/* ===========================
   LOCAL STORAGE
=========================== */
function saveToLocalStorage() {
    localStorage.setItem('taxData', JSON.stringify(taxData));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('taxData');
    if (saved) taxData = JSON.parse(saved);
}

/* ===========================
   INCOME SOURCES
=========================== */
function addIncomeSource() {
    const source = {
        id: Date.now(),
        type: 'salary',
        amount: 0
    };
    taxData.incomeSources.push(source);
    renderIncomeSource(source);
    saveToLocalStorage();
    updateDashboard();
}

function renderIncomeSource(source) {
    const container = document.getElementById('incomeSourcesContainer');

    const html = `
        <div class="income-item" id="income-${source.id}">
            <select onchange="updateIncomeSource(${source.id}, 'type', this.value)">
                <option value="salary">Salary</option>
                <option value="freelance">Freelance</option>
                <option value="rental">Rental</option>
            </select>

            <input type="number" placeholder="Amount"
                onchange="updateIncomeSource(${source.id}, 'amount', +this.value || 0)">

            <button type="button" onclick="removeIncomeSource(${source.id})">X</button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function updateIncomeSource(id, field, value) {
    const src = taxData.incomeSources.find(s => s.id === id);
    if (!src) return;
    src[field] = value;
    saveToLocalStorage();
    updateDashboard();
}

function removeIncomeSource(id) {
    taxData.incomeSources = taxData.incomeSources.filter(s => s.id !== id);
    document.getElementById(`income-${id}`)?.remove();
    saveToLocalStorage();
    updateDashboard();
}

/* ===========================
   BEFORE FORM SUBMIT
=========================== */
function prepareFormData() {
    const totalIncome = taxData.incomeSources.reduce((s, i) => s + i.amount, 0);
    const totalInvestments = Object.values(taxData.investments)
        .reduce((a, b) => a + b, 0);

    document.getElementById("totalIncome").value = totalIncome;
    document.getElementById("totalInvestments").value = totalInvestments;
}

// send taxData to backend
async function submitTaxData(payload) {
    const res = await fetch('http://127.0.0.1:5000/calculate-tax', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Request failed');
    }
    return res.json();
}

// update dashboard cards from taxData and (optionally) last API response
function updateDashboard(lastApiResult) {
    const totalIncome = taxData.incomeSources.reduce((s, i) => s + (+i.amount || 0), 0);
    const totalInvestments = Object.values(taxData.investments).reduce((a, b) => a + (+b || 0), 0);

    const el = id => document.getElementById(id);
    if (el('totalIncomeDisplay')) el('totalIncomeDisplay').textContent = totalIncome;
    if (el('annualIncomeDisplay')) el('annualIncomeDisplay').textContent = totalIncome;
    if (el('investmentsUtilizedDisplay')) el('investmentsUtilizedDisplay').textContent = totalInvestments;

    // if we have last API result, update tax displays
    if (lastApiResult) {
        if (el('taxOpsDisplay')) el('taxOpsDisplay').textContent = lastApiResult.old_regime_tax ?? lastApiResult.old_regime_tax ?? 0;
        if (el('taxNpsDisplay')) el('taxNpsDisplay').textContent = lastApiResult.new_regime_tax ?? lastApiResult.new_regime_tax ?? 0;
        if (el('recommendedRegimeDisplay')) el('recommendedRegimeDisplay').textContent = lastApiResult.best_regime || lastApiResult.best || '—';
        // compute effective rate based on chosen regime
        const chosenTax = (lastApiResult.best_regime === 'new' ? lastApiResult.new_regime_tax : lastApiResult.old_regime_tax) || 0;
        const eff = totalIncome ? Math.round((chosenTax / totalIncome) * 100) : 0;
        if (el('effectiveRateDisplay')) el('effectiveRateDisplay').textContent = eff;
        if (el('maxSavingsDisplay')) el('maxSavingsDisplay').textContent = 0; // placeholder
    } else {
        // no API result, clear or calculate defaults
        if (el('taxOpsDisplay')) el('taxOpsDisplay').textContent = 0;
        if (el('taxNpsDisplay')) el('taxNpsDisplay').textContent = 0;
        if (el('recommendedRegimeDisplay')) el('recommendedRegimeDisplay').textContent = '—';
        if (el('effectiveRateDisplay')) el('effectiveRateDisplay').textContent = 0;
        if (el('maxSavingsDisplay')) el('maxSavingsDisplay').textContent = 0;
    }
}

// wire UI
document.addEventListener('DOMContentLoaded', () => {
    // regime select sync
    const regimeSelect = document.getElementById('regimeSelect');
    if (regimeSelect) {
        regimeSelect.value = taxData.selectedRegime;
        regimeSelect.addEventListener('change', () => {
            taxData.selectedRegime = regimeSelect.value;
            saveToLocalStorage();
        });
    }

    const btn = document.getElementById('calculateBtn');
    if (btn) {
        btn.addEventListener('click', async () => {
            try {
                // prepare and update UI
                prepareFormData();
                updateDashboard();

                const payload = {
                    income: +document.getElementById('totalIncome').value || 0,
                    investments: +document.getElementById('totalInvestments').value || 0,
                    regime: taxData.selectedRegime,
                    incomeSources: taxData.incomeSources
                };
                const result = await submitTaxData(payload);
                document.getElementById('result').textContent = JSON.stringify(result, null, 2);

                // update dashboard with API response
                updateDashboard(result);
            } catch (err) {
                console.error(err);
                alert('Error: ' + (err.message || err));
            }
        });
    }

    // action buttons
    document.getElementById('addIncomeBtn')?.addEventListener('click', () => addIncomeSource());
    document.getElementById('resetBtn')?.addEventListener('click', () => {
        if (!confirm('Reset all data?')) return;
        taxData = { incomeSources: [], investments: { lic: 0, ppf: 0, nps: 0, homePayment: 0, elss: 0, sukanya: 0 }, selectedRegime: 'ops' };
        localStorage.removeItem('taxData');
        document.getElementById('incomeSourcesContainer').innerHTML = '';
        addIncomeSource();
        updateDashboard();
    });
    document.getElementById('exportPdfBtn')?.addEventListener('click', () => alert('Export PDF not implemented in this demo'));
    document.getElementById('planInvestBtn')?.addEventListener('click', () => alert('Plan investments - feature TBD'));

});
