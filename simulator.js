// ===== SIMULATOR ENGINE =====
// Plac zabaw dla działu marketingu — interaktywny symulator promocji katalogowych

document.addEventListener('DOMContentLoaded', () => {
    initSimulator();
});

function initSimulator() {
    // Toggle button
    document.getElementById('simToggleBtn').addEventListener('click', toggleSimulator);

    // Time controls
    document.getElementById('simPlayPause').addEventListener('click', simTogglePlayPause);
    document.getElementById('simStepBack').addEventListener('click', () => simStep(-1));
    document.getElementById('simStepForward').addEventListener('click', () => simStep(1));
    document.getElementById('simSpeed').addEventListener('change', (e) => {
        state.sim.speed = parseInt(e.target.value);
        if (state.sim.isPlaying) { simPause(); simPlay(); }
    });
    document.getElementById('simDateTime').addEventListener('change', (e) => {
        if (e.target.value) setSimTime(new Date(e.target.value));
    });
    document.getElementById('simTimelineSlider').addEventListener('input', (e) => {
        const pct = parseInt(e.target.value) / 1000;
        const range = getTimelineRange();
        if (range) setSimTime(new Date(range.start + pct * (range.end - range.start)));
    });

    // Scenario presets
    document.getElementById('simScenarioPreset').addEventListener('change', (e) => {
        if (e.target.value) { applyScenarioPreset(e.target.value); e.target.value = ''; }
    });
    document.getElementById('simReset').addEventListener('click', simReset);
    document.getElementById('simExportReport').addEventListener('click', downloadReport);

    // Stock simulation
    document.getElementById('stockDepletAllBtn').addEventListener('click', depleteAllStocks);
    document.getElementById('stockResetBtn').addEventListener('click', resetAllStocks);

    // Event log
    document.getElementById('clearEventLog').addEventListener('click', clearEventLog);
}

// ===== TOGGLE SIMULATOR =====
function toggleSimulator() {
    state.sim.enabled = !state.sim.enabled;
    const btn = document.getElementById('simToggleBtn');
    const toolbar = document.getElementById('simToolbar');
    const stockSection = document.getElementById('sectionStockSim');

    btn.classList.toggle('active', state.sim.enabled);
    toolbar.style.display = state.sim.enabled ? '' : 'none';
    stockSection.style.display = state.sim.enabled ? '' : 'none';

    // Show/hide simulator-only tabs
    document.querySelectorAll('.sim-only-tab').forEach(t => t.style.display = state.sim.enabled ? '' : 'none');

    if (state.sim.enabled) {
        // Take initial snapshot
        state.sim.initialSnapshot = {
            campaignStatus: state.campaignStatus,
            products: JSON.parse(JSON.stringify(state.products)),
            cartItems: JSON.parse(JSON.stringify(state.cartItems)),
        };
        // Set initial simulated time to campaign start - 2 hours
        const startVal = document.getElementById('startDate').value;
        const startTime = startVal ? new Date(startVal) : new Date();
        state.sim.currentTime = new Date(startTime.getTime() - 2 * 3600000);
        updateSimTimeDisplay();
        logEvent('system', 'Symulator uruchomiony');
        showToast('Tryb symulatora aktywny', 'info');
    } else {
        simPause();
        state.sim.stockOverrides = {};
        state.sim.eventLog = [];
        showToast('Symulator wyłączony', 'info');
    }
    renderAll();
}

// ===== TIME SIMULATION =====
function setSimTime(dateObj) {
    state.sim.currentTime = new Date(dateObj);
    updateSimTimeDisplay();
    evaluateCampaignStatusFromTime();
    renderAll();
}

function simStep(hours) {
    if (!state.sim.currentTime) return;
    setSimTime(new Date(state.sim.currentTime.getTime() + hours * 3600000));
}

function simPlay() {
    if (state.sim.isPlaying) return;
    state.sim.isPlaying = true;
    document.getElementById('simPlayPause').textContent = '⏸';
    document.getElementById('simPlayPause').classList.add('playing');
    state.sim.intervalId = setInterval(() => {
        if (!state.sim.currentTime) return;
        // Each tick = 1 second real time → speed seconds of sim time
        const advance = state.sim.speed * 1000; // milliseconds
        setSimTime(new Date(state.sim.currentTime.getTime() + advance));
    }, 1000);
}

function simPause() {
    state.sim.isPlaying = false;
    document.getElementById('simPlayPause').textContent = '▶';
    document.getElementById('simPlayPause').classList.remove('playing');
    if (state.sim.intervalId) { clearInterval(state.sim.intervalId); state.sim.intervalId = null; }
}

function simTogglePlayPause() {
    state.sim.isPlaying ? simPause() : simPlay();
}

function updateSimTimeDisplay() {
    if (!state.sim.currentTime) return;
    const dt = state.sim.currentTime;
    const dateStr = dt.toISOString().slice(0, 16);
    document.getElementById('simDateTime').value = dateStr;
    document.getElementById('simClockDisplay').textContent =
        dt.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' }) + ' ' +
        dt.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });

    // Update timeline slider
    const range = getTimelineRange();
    if (range) {
        const pct = (dt.getTime() - range.start) / (range.end - range.start);
        document.getElementById('simTimelineSlider').value = Math.max(0, Math.min(1000, Math.round(pct * 1000)));
    }
}

function getTimelineRange() {
    const startVal = document.getElementById('startDate').value;
    const endVal = document.getElementById('endDate').value;
    if (!startVal || !endVal) return null;
    const start = new Date(startVal).getTime() - 24 * 3600000; // 1 day before
    const end = new Date(endVal).getTime() + 24 * 3600000; // 1 day after
    return { start, end };
}

// ===== AUTOMATIC STATUS EVALUATION =====
let _isEvaluating = false;
function evaluateCampaignStatusFromTime() {
    if (_isEvaluating || !state.sim.enabled || !state.sim.currentTime) return;
    _isEvaluating = true;

    const simTime = state.sim.currentTime.getTime();
    const startVal = document.getElementById('startDate').value;
    const endVal = document.getElementById('endDate').value;
    const startTime = startVal ? new Date(startVal).getTime() : null;
    const endTime = endVal ? new Date(endVal).getTime() : null;
    const cur = state.campaignStatus;

    // Don't override manual paused/cancelled states
    if (cur === 'cancelled' || cur === 'paused') { _isEvaluating = false; return; }

    if (startTime && endTime) {
        if (simTime < startTime) {
            // Before campaign start
            if (cur === 'active') setCampaignStatus('scheduled', 'auto');
        } else if (simTime >= startTime && simTime <= endTime) {
            // During campaign
            if (cur === 'scheduled') setCampaignStatus('active', 'auto');
            if (cur === 'ended') setCampaignStatus('active', 'auto');
        } else if (simTime > endTime) {
            // After campaign end
            if (cur === 'active' || cur === 'scheduled') setCampaignStatus('ended', 'auto');
        }
    }

    _isEvaluating = false;
}

// ===== EVENT LOG =====
function logEvent(type, message) {
    state.sim.eventLog.push({
        time: state.sim.currentTime ? new Date(state.sim.currentTime) : new Date(),
        type,
        message,
    });
    if (state.sim.eventLog.length > 500) state.sim.eventLog.shift();
}

function renderEventLog() {
    const container = document.getElementById('simLogEntries');
    if (!container) return;
    if (state.sim.eventLog.length === 0) {
        container.innerHTML = '<div class="preview-empty-state"><p>Brak zdarzeń. Wykonaj akcje w symulatorze.</p></div>';
        return;
    }
    const badgeMap = {
        status: ['STATUS', 'sim-log-entry__badge--status'],
        stock: ['MAGAZYN', 'sim-log-entry__badge--stock'],
        purchase: ['ZAKUP', 'sim-log-entry__badge--purchase'],
        price: ['CENA', 'sim-log-entry__badge--price'],
        system: ['SYSTEM', 'sim-log-entry__badge--system'],
        scenario: ['SCENARIUSZ', 'sim-log-entry__badge--scenario'],
    };
    container.innerHTML = state.sim.eventLog.slice().reverse().map(e => {
        const [label, cls] = badgeMap[e.type] || ['INFO', 'sim-log-entry__badge--status'];
        const timeStr = e.time.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' }) + ' ' +
            e.time.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return `<div class="sim-log-entry">
            <span class="sim-log-entry__time">${timeStr}</span>
            <span class="sim-log-entry__badge ${cls}">${label}</span>
            <span class="sim-log-entry__message">${e.message}</span>
        </div>`;
    }).join('');
}

function clearEventLog() {
    state.sim.eventLog = [];
    renderEventLog();
    showToast('Dziennik zdarzeń wyczyszczony', 'info');
}

// ===== STOCK SIMULATION =====
function renderStockSimPanel() {
    const container = document.getElementById('stockSimProducts');
    if (!container) return;
    const products = state.products.filter(p => p.valid && p.dbProduct);
    if (products.length === 0) {
        container.innerHTML = '<p style="font-size:12px;color:var(--text-muted);">Dodaj produkty aby symulować stany.</p>';
        return;
    }
    container.innerHTML = products.map(p => {
        const original = p.dbProduct.stock;
        const current = getEffectiveStock(p.sku);
        return `<div class="stock-sim-product">
            <span class="stock-sim-product__name" title="${p.dbProduct.name}">${p.dbProduct.name}</span>
            <input type="range" class="stock-sim-product__slider" min="0" max="${Math.max(original * 2, 20)}" value="${current}"
                onchange="setSimStock('${p.sku}', parseInt(this.value))"
                oninput="this.nextElementSibling.textContent=this.value">
            <span class="stock-sim-product__value ${current === 0 ? 'stock-sim-product__value--zero' : ''}">${current}</span>
            <span style="font-size:9px;color:var(--text-muted);">/${original}</span>
        </div>`;
    }).join('');
}

function setSimStock(sku, newStock) {
    const old = getEffectiveStock(sku);
    state.sim.stockOverrides[sku] = Math.max(0, newStock);
    if (old !== newStock) {
        const db = PRODUCT_DATABASE[sku];
        logEvent('stock', `${db ? db.name : sku}: stan ${old} → ${newStock}`);
        if (newStock === 0 && old > 0) {
            const stockMode = document.querySelector('input[name="stockMode"]:checked').value;
            logEvent('stock', `${sku} — stan = 0. ${stockMode === 'A' ? 'Wypadnie z promocji (Tryb A).' : 'Pozostanie w promocji (Tryb B).'}`);
        }
    }
    renderAll();
}

function depleteAllStocks() {
    state.products.filter(p => p.valid).forEach(p => {
        state.sim.stockOverrides[p.sku] = 0;
    });
    logEvent('stock', 'Wyczerpano stany wszystkich produktów');
    renderAll();
    showToast('Wszystkie stany ustawione na 0', 'warning');
}

function resetAllStocks() {
    state.sim.stockOverrides = {};
    logEvent('stock', 'Przywrócono oryginalne stany magazynowe');
    renderAll();
    showToast('Stany magazynowe przywrócone', 'success');
}

// ===== SCENARIO PRESETS =====
function applyScenarioPreset(name) {
    const startVal = document.getElementById('startDate').value;
    const endVal = document.getElementById('endDate').value;
    const startTime = startVal ? new Date(startVal) : new Date();
    const endTime = endVal ? new Date(endVal) : new Date(startTime.getTime() + 7 * 86400000);
    const midTime = new Date(startTime.getTime() + (endTime.getTime() - startTime.getTime()) / 2);

    const labels = {
        before_start: 'Przed startem kampanii',
        mid_campaign: 'W trakcie kampanii',
        normal_purchase: 'Normalny zakup',
        over_limit: 'Przekroczenie limitu',
        stock_depleted: 'Wyczerpanie stanu',
        campaign_expired: 'Kampania wygasła',
        sku_conflict: 'Konflikt SKU',
    };

    logEvent('scenario', `Załadowano scenariusz: ${labels[name] || name}`);

    switch (name) {
        case 'before_start': {
            // Publikuj kampanię i cofnij czas do przed startem
            if (state.campaignStatus === 'draft') {
                state.campaignStatus = 'scheduled';
                logEvent('status', 'Szkic → Zaplanowana (scenariusz)');
            }
            setSimTime(new Date(startTime.getTime() - 2 * 3600000));
            state.cartItems = [];
            showToast('Scenariusz: 2h przed startem kampanii', 'info');
            break;
        }
        case 'mid_campaign': {
            if (state.campaignStatus === 'draft') state.campaignStatus = 'scheduled';
            setSimTime(midTime);
            // Add some sold counts
            state.products.filter(p => p.valid && p.limit).forEach(p => {
                p.soldCount = Math.floor(Math.random() * Math.min(p.limit, 5));
            });
            showToast('Scenariusz: kampania w połowie trwania', 'info');
            break;
        }
        case 'normal_purchase': {
            if (state.campaignStatus === 'draft') state.campaignStatus = 'scheduled';
            setSimTime(midTime);
            // Add 2 items to cart with normal quantities
            const vp = state.products.filter(p => p.valid && p.dbProduct && p.promoPrice > 0);
            if (vp.length >= 2) {
                state.cartItems = [
                    { sku: vp[0].sku, qty: 1 },
                    { sku: vp[1].sku, qty: 2 },
                ];
                logEvent('purchase', `Koszyk: 1× ${vp[0].dbProduct.name}, 2× ${vp[1].dbProduct.name}`);
            }
            showToast('Scenariusz: normalny zakup 2 produktów', 'info');
            break;
        }
        case 'over_limit': {
            if (state.campaignStatus === 'draft') state.campaignStatus = 'scheduled';
            setSimTime(midTime);
            // Find a product with a limit and add more than the limit
            const limited = state.products.find(p => p.valid && p.dbProduct && p.limit !== null && p.limit > 0);
            if (limited) {
                state.cartItems = [{ sku: limited.sku, qty: limited.limit + 5 }];
                logEvent('purchase', `Koszyk: ${limited.limit + 5}× ${limited.dbProduct.name} (limit: ${limited.limit})`);
                logEvent('system', `Split order: ${limited.limit} szt. w cenie promo, 5 szt. w cenie regularnej`);
            }
            showToast('Scenariusz: zakup ponad limit promocyjny', 'warning');
            break;
        }
        case 'stock_depleted': {
            if (state.campaignStatus === 'draft') state.campaignStatus = 'scheduled';
            setSimTime(midTime);
            // Deplete stock of first 3 products
            const first3 = state.products.filter(p => p.valid).slice(0, 3);
            first3.forEach(p => { state.sim.stockOverrides[p.sku] = 0; });
            logEvent('stock', `Wyczerpano stan ${first3.length} produktów`);
            const stockMode = document.querySelector('input[name="stockMode"]:checked').value;
            logEvent('system', `Tryb stocku: ${stockMode}. ${stockMode === 'A' ? 'Produkty wypadną z listingu.' : 'Produkty pozostaną widoczne.'}`);
            showToast(`Scenariusz: 3 produkty bez stanu (Tryb ${stockMode})`, 'warning');
            break;
        }
        case 'campaign_expired': {
            if (state.campaignStatus === 'draft') state.campaignStatus = 'scheduled';
            setSimTime(new Date(endTime.getTime() + 3600000));
            state.cartItems = [];
            showToast('Scenariusz: kampania zakończona — ceny wróciły do regularnych', 'info');
            break;
        }
        case 'sku_conflict': {
            // Make sure the conflicting SKU is added
            const conflictSku = 'LAMROGUEXLPRO3';
            if (!state.products.find(p => p.sku === conflictSku)) {
                addProduct(conflictSku, 100, null, true);
            }
            logEvent('system', `Produkt ${conflictSku} jest już w kampanii "Promocja Wiosenna" — konflikt SKU`);
            showToast('Scenariusz: konflikt SKU — produkt w innej kampanii', 'error');
            renderAll();
            break;
        }
    }
}

// ===== RESET =====
function simReset() {
    if (state.sim.initialSnapshot) {
        state.campaignStatus = state.sim.initialSnapshot.campaignStatus;
        state.products = JSON.parse(JSON.stringify(state.sim.initialSnapshot.products));
        state.cartItems = JSON.parse(JSON.stringify(state.sim.initialSnapshot.cartItems));
    }
    state.sim.stockOverrides = {};
    state.sim.eventLog = [];
    state.products.forEach(p => p.soldCount = 0);

    // Reset time to before campaign start
    const startVal = document.getElementById('startDate').value;
    const startTime = startVal ? new Date(startVal) : new Date();
    state.sim.currentTime = new Date(startTime.getTime() - 2 * 3600000);
    simPause();
    updateSimTimeDisplay();

    logEvent('system', 'Symulacja zresetowana do stanu początkowego');
    renderAll();
    showToast('Symulacja zresetowana', 'info');
}

// ===== PROMO TYPE COMPARISON =====
function renderPromoComparison() {
    const container = document.getElementById('promoComparisonView');
    if (!container) return;
    const products = state.products.filter(p => p.valid && p.dbProduct);
    if (products.length === 0) {
        container.innerHTML = '<div class="preview-empty-state"><p>Dodaj produkty aby porównać typy promocji</p></div>';
        return;
    }

    const currentType = document.getElementById('promoType').value;
    let rows = '';
    let totals = { amount: 0, percent: 0, fixed: 0 };

    products.slice(0, 12).forEach(p => {
        const erp = p.dbProduct.erpPrice;
        const dv = p.discountValue;

        // Calculate price for each type
        const amountPrice = Math.round((erp - dv) * 100) / 100;
        const percentPrice = Math.round((erp - erp * dv / 100) * 100) / 100;
        const fixedPrice = dv;

        const amountValid = amountPrice > 0 && amountPrice < erp;
        const percentValid = percentPrice > 0 && percentPrice < erp;
        const fixedValid = fixedPrice > 0 && fixedPrice < erp;

        totals.amount += amountValid ? amountPrice : erp;
        totals.percent += percentValid ? percentPrice : erp;
        totals.fixed += fixedValid ? fixedPrice : erp;

        const best = Math.min(
            amountValid ? amountPrice : Infinity,
            percentValid ? percentPrice : Infinity,
            fixedValid ? fixedPrice : Infinity
        );

        rows += `<tr>
            <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${p.dbProduct.name}">${p.dbProduct.name}</td>
            <td class="text-right">${erp.toFixed(2)} zł</td>
            <td class="text-right ${currentType === 'amount' ? 'active-type' : ''} ${amountValid && amountPrice === best ? 'best-price' : ''}">
                ${amountValid ? amountPrice.toFixed(2) + ' zł' : '<span style="color:var(--danger);">✗</span>'}
                ${amountValid ? `<br><span style="font-size:9px;color:var(--text-muted);">-${dv} zł</span>` : ''}
            </td>
            <td class="text-right ${currentType === 'percent' ? 'active-type' : ''} ${percentValid && percentPrice === best ? 'best-price' : ''}">
                ${percentValid ? percentPrice.toFixed(2) + ' zł' : '<span style="color:var(--danger);">✗</span>'}
                ${percentValid ? `<br><span style="font-size:9px;color:var(--text-muted);">-${dv}%</span>` : ''}
            </td>
            <td class="text-right ${currentType === 'fixed' ? 'active-type' : ''} ${fixedValid && fixedPrice === best ? 'best-price' : ''}">
                ${fixedValid ? fixedPrice.toFixed(2) + ' zł' : '<span style="color:var(--danger);">✗</span>'}
                ${fixedValid ? `<br><span style="font-size:9px;color:var(--text-muted);">stała cena</span>` : ''}
            </td>
        </tr>`;
    });

    const erpTotal = products.slice(0, 12).reduce((s, p) => s + p.dbProduct.erpPrice, 0);

    container.innerHTML = `
        <h4 style="font-size:15px;font-weight:700;margin-bottom:4px;">Porównanie typów promocji</h4>
        <p style="font-size:11px;color:var(--text-muted);margin-bottom:16px;">
            Ta sama wartość rabatu (${products[0]?.discountValue || '?'}, ${products[1]?.discountValue || '?'}, ...) interpretowana jako kwota, procent lub fixed price.
            <span style="color:var(--success);font-weight:600;">Zielony</span> = najniższa cena w wierszu.
        </p>
        <table class="promo-comparison-table">
            <thead>
                <tr>
                    <th>Produkt</th>
                    <th class="text-right">Cena ERP</th>
                    <th class="text-right ${currentType === 'amount' ? 'active-type' : ''}">Kwotowa (−X zł)</th>
                    <th class="text-right ${currentType === 'percent' ? 'active-type' : ''}">Procentowa (−X%)</th>
                    <th class="text-right ${currentType === 'fixed' ? 'active-type' : ''}">Fixed Price (X zł)</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
                <tr style="font-weight:700;border-top:2px solid var(--text);">
                    <td>SUMA</td>
                    <td class="text-right">${erpTotal.toFixed(2)} zł</td>
                    <td class="text-right ${currentType === 'amount' ? 'active-type' : ''}">${totals.amount.toFixed(2)} zł<br><span style="font-size:9px;color:var(--promo-red);">-${(erpTotal - totals.amount).toFixed(2)} zł</span></td>
                    <td class="text-right ${currentType === 'percent' ? 'active-type' : ''}">${totals.percent.toFixed(2)} zł<br><span style="font-size:9px;color:var(--promo-red);">-${(erpTotal - totals.percent).toFixed(2)} zł</span></td>
                    <td class="text-right ${currentType === 'fixed' ? 'active-type' : ''}">${totals.fixed.toFixed(2)} zł<br><span style="font-size:9px;color:var(--promo-red);">-${(erpTotal - totals.fixed).toFixed(2)} zł</span></td>
                </tr>
            </tbody>
        </table>
        <div style="margin-top:12px;padding:10px 14px;background:var(--primary-light);border-radius:8px;font-size:11px;color:var(--primary-dark);">
            <strong>Aktualnie wybrany typ:</strong> ${currentType === 'amount' ? 'Obniżka kwotowa (V1)' : currentType === 'percent' ? 'Obniżka procentowa (V2)' : 'Fixed Price (V2)'}
            — zmień w ustawieniach globalnych aby zobaczyć efekt na żywo.
        </div>
    `;
}

// ===== EXPORT REPORT =====
function generateReport() {
    const cn = document.getElementById('campaignName').value || 'Kampania';
    const csn = document.getElementById('campaignShortName').value || '';
    const sd = document.getElementById('startDate').value;
    const ed = document.getElementById('endDate').value;
    const pt = document.getElementById('promoType').value;
    const sm = document.querySelector('input[name="stockMode"]:checked').value;
    const ptLabels = { amount: 'Obniżka kwotowa (V1)', percent: 'Obniżka procentowa (V2)', fixed: 'Fixed Price (V2)' };

    let report = '';
    report += '═══════════════════════════════════════════════════\n';
    report += '  RAPORT Z SYMULACJI PROMOCJI KATALOGOWEJ\n';
    report += '  cyfrowe.pl — Masowe Promocje Katalogowe\n';
    report += '═══════════════════════════════════════════════════\n\n';

    report += `Kampania: ${cn}${csn ? ` (${csn})` : ''}\n`;
    report += `Typ promocji: ${ptLabels[pt]}\n`;
    report += `Okres: ${sd || '—'} → ${ed || '—'}\n`;
    report += `Status końcowy: ${state.campaignStatus}\n`;
    report += `Tryb stocku: ${sm} (${sm === 'A' ? 'produkt wypada z promocji przy stock=0' : 'promocja trwa niezależnie od stanu'})\n`;
    report += `Liczba produktów: ${state.products.length}\n\n`;

    report += '─── PRODUKTY W KAMPANII ───\n';
    state.products.filter(p => p.valid).forEach(p => {
        const stk = getEffectiveStock(p.sku);
        report += `  ${p.sku} | ${p.dbProduct.name}\n`;
        report += `    Cena ERP: ${p.dbProduct.erpPrice.toFixed(2)} zł → Promo: ${p.promoPrice ? p.promoPrice.toFixed(2) : '—'} zł`;
        report += ` | Rabat: ${p.discountAmount ? p.discountAmount.toFixed(2) : '—'} zł (${p.discountPercent || '—'}%)`;
        report += ` | Limit: ${p.limit !== null ? p.limit + ' szt.' : '∞'}`;
        report += ` | Stan: ${stk}${p.conflict ? ' | KONFLIKT: ' + p.conflict : ''}\n`;
    });

    if (state.sim.eventLog.length > 0) {
        report += '\n─── DZIENNIK ZDARZEŃ ───\n';
        state.sim.eventLog.forEach(e => {
            const ts = e.time.toLocaleDateString('pl-PL') + ' ' + e.time.toLocaleTimeString('pl-PL');
            report += `  [${ts}] [${e.type.toUpperCase()}] ${e.message}\n`;
        });
    }

    report += '\n─── REGUŁY DLA PROGRAMISTÓW ───\n';
    report += generateDeveloperRules();

    report += '\n═══════════════════════════════════════════════════\n';
    report += `Wygenerowano: ${new Date().toLocaleString('pl-PL')}\n`;
    report += 'Narzędzie: Symulator Masowych Promocji Katalogowych\n';

    return report;
}

function generateDeveloperRules() {
    let rules = '';
    const sm = document.querySelector('input[name="stockMode"]:checked').value;
    const pt = document.getElementById('promoType').value;
    const hasLimits = state.products.some(p => p.limit !== null);
    const hasConflicts = state.products.some(p => p.conflict);
    const hasZeroStock = state.products.some(p => getEffectiveStock(p.sku) === 0);

    rules += `  1. Typ promocji: ${pt}\n`;
    if (pt === 'amount') rules += '     → Cena promo = cena ERP − kwota rabatu\n';
    if (pt === 'percent') rules += '     → Cena promo = cena ERP × (1 − procent/100)\n';
    if (pt === 'fixed') rules += '     → Cena promo = stała cena (wartość z definicji)\n';

    rules += `  2. Tryb stocku: ${sm}\n`;
    if (sm === 'A') rules += '     → Gdy stock = 0: produkt ZNIKA z listingu promocji\n';
    else rules += '     → Gdy stock = 0: produkt POZOSTAJE na listingu (kupujący widzi "brak na stanie")\n';

    if (hasLimits) {
        rules += '  3. Limit sztuk w promocji:\n';
        rules += '     → Gdy klient dodaje > limit szt.: zamówienie dzielone na 2 pozycje\n';
        rules += '     → Pozycja 1: limit szt. × cena promo\n';
        rules += '     → Pozycja 2: reszta × cena regularna\n';
    }

    rules += `  ${hasLimits ? 4 : 3}. Omnibus (Dyrektywa UE 2019/2161):\n`;
    rules += '     → Przy każdym produkcie: "Najniższa cena z 30 dni: X.XX zł"\n';
    rules += '     → W koszyku: suma Omnibus dla całego zamówienia\n';
    rules += '     → Porównanie: cena promo vs cena Omnibus\n';

    if (hasConflicts) {
        rules += `  ${hasLimits ? 5 : 4}. Walidacja konfliktów SKU:\n`;
        rules += '     → Jeden SKU nie może być w 2 aktywnych kampaniach jednocześnie\n';
        rules += '     → Blokuj publikację kampanii jeśli są konflikty\n';
    }

    rules += `  ${hasLimits ? (hasConflicts ? 6 : 5) : (hasConflicts ? 5 : 4)}. Cykl życia kampanii:\n`;
    rules += '     → Szkic → Zaplanowana → Aktywna → Zakończona\n';
    rules += '     → Aktywna ↔ Wstrzymana (pauza/wznowienie)\n';
    rules += '     → Dowolny stan → Anulowana (oprócz Zakończona)\n';
    rules += '     → Aktywacja automatyczna na podstawie daty startu\n';
    rules += '     → Zakończenie automatyczne na podstawie daty końca\n';

    return rules;
}

function downloadReport() {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `raport-symulacji-${date}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    logEvent('system', 'Wygenerowano raport symulacji');
    showToast('Raport wyeksportowany!', 'success');
}

// ===== SIMULATOR RENDER ENTRY POINT =====
function renderSimPanels() {
    renderStockSimPanel();
    renderEventLog();
    renderPromoComparison();
    updateSimTimeDisplay();
}
