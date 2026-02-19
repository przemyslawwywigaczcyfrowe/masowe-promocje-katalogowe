// ===== SAMPLE DATA =====
const PRODUCT_DATABASE = {
    'SKU-1001': { name: 'Kabel USB-C 2m Premium', erpPrice: 89.99, omnibus30: 79.99, stock: 150, category: 'Kable', icon: '🔌' },
    'SKU-1002': { name: 'Adapter HDMI 4K', erpPrice: 129.00, omnibus30: 119.00, stock: 85, category: 'Adaptery', icon: '🔗' },
    'SKU-1003': { name: 'Mysz bezprzewodowa Ergo', erpPrice: 199.00, omnibus30: 189.00, stock: 42, category: 'Peryferia', icon: '🖱️' },
    'SKU-1004': { name: 'Hub USB 7-portowy', erpPrice: 149.00, omnibus30: 139.00, stock: 0, category: 'Huby', icon: '🔲' },
    'SKU-1005': { name: 'Klawiatura mechaniczna RGB', erpPrice: 349.00, omnibus30: 299.00, stock: 23, category: 'Peryferia', icon: '⌨️' },
    'SKU-1006': { name: 'Słuchawki nauszne BT 5.0', erpPrice: 279.00, omnibus30: 259.00, stock: 67, category: 'Audio', icon: '🎧' },
    'SKU-1007': { name: 'Mata na biurko XXL', erpPrice: 69.00, omnibus30: 59.00, stock: 200, category: 'Akcesoria', icon: '🖥️' },
    'SKU-1008': { name: 'Stacja dokująca USB-C', erpPrice: 459.00, omnibus30: 429.00, stock: 18, category: 'Stacje', icon: '🖧' },
    'SKU-1009': { name: 'Kamera internetowa FHD', erpPrice: 219.00, omnibus30: 199.00, stock: 55, category: 'Kamery', icon: '📷' },
    'SKU-1010': { name: 'Power Bank 20000mAh', erpPrice: 159.00, omnibus30: 149.00, stock: 130, category: 'Zasilanie', icon: '🔋' },
    'SKU-1011': { name: 'Etui na laptop 15"', erpPrice: 99.00, omnibus30: 89.00, stock: 95, category: 'Akcesoria', icon: '💼' },
    'SKU-1012': { name: 'Lampka LED na monitor', erpPrice: 189.00, omnibus30: 179.00, stock: 34, category: 'Oświetlenie', icon: '💡' },
};

const EXISTING_CAMPAIGNS = {
    'Promocja Wiosenna': ['SKU-1004', 'SKU-1008']
};

// ===== STATE =====
const state = {
    campaignStatus: 'draft', // draft, scheduled, active, paused, ended, cancelled
    products: [],
    selectedProductSku: null,
    cartItems: [],
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initSectionToggles();
    initInputTabs();
    initPreviewTabs();
    initSplitHandle();
    initProductInput();
    initCampaignActions();
    initConfigListeners();
    loadSampleData();
});

// ===== SECTION TOGGLES =====
function initSectionToggles() {
    document.querySelectorAll('.config-section__title[data-toggle]').forEach(title => {
        title.addEventListener('click', () => {
            const bodyId = title.getAttribute('data-toggle');
            const body = document.getElementById(bodyId);
            body.classList.toggle('collapsed');
            title.classList.toggle('collapsed');
        });
    });
}

// ===== INPUT TABS =====
function initInputTabs() {
    document.querySelectorAll('.input-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.input-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
        });
    });
}

// ===== PREVIEW TABS =====
function initPreviewTabs() {
    document.querySelectorAll('.preview-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.preview-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`preview-${tab.dataset.preview}`).classList.add('active');
        });
    });
}

// ===== SPLIT HANDLE =====
function initSplitHandle() {
    const handle = document.getElementById('splitHandle');
    const configPanel = document.getElementById('configPanel');
    let isDragging = false;

    handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        handle.classList.add('dragging');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const newWidth = Math.min(Math.max(e.clientX, 360), 650);
        configPanel.style.width = newWidth + 'px';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        handle.classList.remove('dragging');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    });
}

// ===== PRODUCT INPUT =====
function initProductInput() {
    // Manual add
    document.getElementById('addManualBtn').addEventListener('click', () => {
        const sku = document.getElementById('manualSku').value.trim();
        const value = parseFloat(document.getElementById('manualValue').value);
        const limit = document.getElementById('manualLimit').value ? parseInt(document.getElementById('manualLimit').value) : null;

        if (!sku || isNaN(value)) {
            showToast('Podaj SKU i wartość rabatu', 'error');
            return;
        }
        addProduct(sku, value, limit);
        document.getElementById('manualSku').value = '';
        document.getElementById('manualValue').value = '';
        document.getElementById('manualLimit').value = '';
    });

    // CSV file
    const csvInput = document.getElementById('csvFileInput');
    document.getElementById('csvBrowseBtn').addEventListener('click', () => csvInput.click());
    csvInput.addEventListener('change', (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => parseCSVData(ev.target.result);
            reader.readAsText(e.target.files[0]);
        }
    });

    // Drag & drop
    const dropZone = document.getElementById('csvDropZone');
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => parseCSVData(ev.target.result);
            reader.readAsText(e.dataTransfer.files[0]);
        }
    });

    // Paste
    document.getElementById('parsePasteBtn').addEventListener('click', () => {
        const text = document.getElementById('pasteInput').value.trim();
        if (!text) { showToast('Wklej dane w formacie CSV', 'error'); return; }
        parseCSVData(text);
    });

    // Sample & Clear
    document.getElementById('loadSampleBtn').addEventListener('click', loadSampleData);
    document.getElementById('clearAllBtn').addEventListener('click', () => {
        state.products = [];
        state.selectedProductSku = null;
        state.cartItems = [];
        renderAll();
        showToast('Wyczyszczono listę produktów', 'info');
    });
}

function parseCSVData(text) {
    const lines = text.split('\n').filter(l => l.trim());
    let added = 0, failed = 0;

    lines.forEach(line => {
        const parts = line.split(/[;,]/).map(p => p.trim());
        if (parts.length >= 2) {
            const sku = parts[0];
            const value = parseFloat(parts[1].replace(',', '.'));
            const limit = parts[2] ? parseInt(parts[2]) : null;
            if (sku && !isNaN(value)) {
                addProduct(sku, value, limit, true);
                added++;
            } else { failed++; }
        } else { failed++; }
    });

    renderAll();
    showToast(`Dodano ${added} produktów${failed ? `, ${failed} błędnych wierszy` : ''}`, added ? 'success' : 'error');
}

function addProduct(sku, discountValue, limit, batch = false) {
    if (state.products.find(p => p.sku === sku)) {
        if (!batch) showToast(`${sku} jest już na liście`, 'warning');
        return;
    }

    const dbProduct = PRODUCT_DATABASE[sku];
    const promoType = document.getElementById('promoType').value;

    let promoPrice, discountAmount, discountPercent;
    if (dbProduct) {
        if (promoType === 'amount') {
            discountAmount = discountValue;
            promoPrice = dbProduct.erpPrice - discountValue;
            discountPercent = Math.round((discountValue / dbProduct.erpPrice) * 100);
        } else if (promoType === 'percent') {
            discountPercent = discountValue;
            discountAmount = Math.round(dbProduct.erpPrice * discountValue / 100 * 100) / 100;
            promoPrice = dbProduct.erpPrice - discountAmount;
        } else {
            promoPrice = discountValue;
            discountAmount = dbProduct.erpPrice - discountValue;
            discountPercent = Math.round((discountAmount / dbProduct.erpPrice) * 100);
        }
    }

    const conflict = checkConflict(sku);

    state.products.push({
        sku,
        discountValue,
        limit,
        dbProduct,
        promoPrice: dbProduct ? Math.round(promoPrice * 100) / 100 : null,
        discountAmount: dbProduct ? Math.round(discountAmount * 100) / 100 : null,
        discountPercent: dbProduct ? discountPercent : null,
        conflict,
        valid: !!dbProduct,
        soldCount: 0,
    });

    if (!batch) renderAll();
}

function removeProduct(sku) {
    state.products = state.products.filter(p => p.sku !== sku);
    if (state.selectedProductSku === sku) state.selectedProductSku = null;
    renderAll();
}

function checkConflict(sku) {
    for (const [campaign, skus] of Object.entries(EXISTING_CAMPAIGNS)) {
        if (skus.includes(sku)) return campaign;
    }
    return null;
}

function recalculatePrices() {
    const promoType = document.getElementById('promoType').value;
    state.products.forEach(p => {
        if (!p.dbProduct) return;
        const erp = p.dbProduct.erpPrice;
        if (promoType === 'amount') {
            p.discountAmount = p.discountValue;
            p.promoPrice = Math.round((erp - p.discountValue) * 100) / 100;
            p.discountPercent = Math.round((p.discountValue / erp) * 100);
        } else if (promoType === 'percent') {
            p.discountPercent = p.discountValue;
            p.discountAmount = Math.round(erp * p.discountValue / 100 * 100) / 100;
            p.promoPrice = Math.round((erp - p.discountAmount) * 100) / 100;
        } else {
            p.promoPrice = p.discountValue;
            p.discountAmount = Math.round((erp - p.discountValue) * 100) / 100;
            p.discountPercent = Math.round((p.discountAmount / erp) * 100);
        }
    });
}

// ===== LOAD SAMPLE DATA =====
function loadSampleData() {
    state.products = [];
    const samples = [
        ['SKU-1001', 30, 100],
        ['SKU-1002', 40, null],
        ['SKU-1003', 50, 30],
        ['SKU-1004', 25, null],
        ['SKU-1005', 100, 15],
        ['SKU-1006', 60, 50],
        ['SKU-1007', 20, null],
        ['SKU-1008', 80, 10],
        ['SKU-1009', 50, null],
        ['SKU-1010', 35, 80],
        ['SKU-1011', 25, null],
        ['SKU-1012', 40, 20],
    ];
    samples.forEach(([sku, val, lim]) => addProduct(sku, val, lim, true));
    renderAll();
    showToast('Załadowano 12 przykładowych produktów', 'success');
}

// ===== CONFIG LISTENERS =====
function initConfigListeners() {
    const fields = ['campaignName', 'campaignShortName', 'startDate', 'endDate', 'promoType', 'labelText', 'badgeType', 'landingPageUrl'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        el.addEventListener('input', () => {
            if (id === 'promoType') recalculatePrices();
            renderAll();
        });
        el.addEventListener('change', () => {
            if (id === 'promoType') recalculatePrices();
            renderAll();
        });
    });
    document.querySelectorAll('input[name="stockMode"]').forEach(r => {
        r.addEventListener('change', renderAll);
    });
}

// ===== CAMPAIGN LIFECYCLE =====
function initCampaignActions() {
    document.getElementById('publishBtn').addEventListener('click', () => {
        if (state.products.length === 0) {
            showToast('Dodaj przynajmniej jeden produkt', 'error');
            return;
        }
        if (state.products.some(p => p.conflict)) {
            showToast('Rozwiąż konflikty SKU przed publikacją', 'error');
            return;
        }
        setCampaignStatus('scheduled');
        showToast('Kampania zaplanowana! Aktywuje się automatycznie.', 'success');
    });
    document.getElementById('activateBtn').addEventListener('click', () => {
        setCampaignStatus('active');
        showToast('Kampania aktywna! Ceny promocyjne widoczne w sklepie.', 'success');
    });
    document.getElementById('pauseBtn').addEventListener('click', () => {
        setCampaignStatus('paused');
        showToast('Kampania wstrzymana. Ceny wróciły do bazowych.', 'warning');
    });
    document.getElementById('resumeBtn').addEventListener('click', () => {
        setCampaignStatus('active');
        showToast('Kampania wznowiona!', 'success');
    });
    document.getElementById('cancelBtn').addEventListener('click', () => {
        setCampaignStatus('cancelled');
        showToast('Kampania anulowana.', 'error');
    });
}

function setCampaignStatus(status) {
    state.campaignStatus = status;
    renderAll();
}

// ===== RENDER ALL =====
function renderAll() {
    renderProductTable();
    renderValidations();
    renderLifecycle();
    renderPreviewListing();
    renderPreviewProduct();
    renderPreviewCart();
    renderPreviewFeed();
    updateStatusBar();
    updateProductCount();
}

function updateStatusBar() {
    const statusMap = {
        draft: ['Szkic', 'draft'],
        scheduled: ['Zaplanowana', 'scheduled'],
        active: ['Aktywna', 'active'],
        paused: ['Wstrzymana', 'paused'],
        ended: ['Zakończona', 'ended'],
        cancelled: ['Anulowana', 'cancelled'],
    };
    const [text, cls] = statusMap[state.campaignStatus];
    document.getElementById('campaignStatusText').textContent = text;
    const dot = document.querySelector('.status-dot');
    dot.className = `status-dot status-dot--${cls}`;
}

function updateProductCount() {
    document.getElementById('productCount').textContent = state.products.length;
}

// ===== RENDER PRODUCT TABLE =====
function renderProductTable() {
    const tbody = document.getElementById('productTableBody');
    const empty = document.getElementById('emptyProducts');
    const bulk = document.getElementById('bulkActions');
    const promoType = document.getElementById('promoType').value;

    if (state.products.length === 0) {
        tbody.innerHTML = '';
        empty.style.display = '';
        bulk.style.display = 'none';
        return;
    }

    empty.style.display = 'none';
    bulk.style.display = 'flex';

    const typeLabel = { amount: 'zł', percent: '%', fixed: 'zł (fixed)' }[promoType];

    tbody.innerHTML = state.products.map(p => {
        let statusHtml = '';
        if (!p.valid) {
            statusHtml = '<span class="sku-status sku-status--error">Nie znaleziono</span>';
        } else if (p.conflict) {
            statusHtml = `<span class="sku-status sku-status--error" title="Konflikt z: ${p.conflict}">Konflikt</span>`;
        } else if (p.dbProduct && p.dbProduct.stock === 0) {
            statusHtml = '<span class="sku-status sku-status--warn">Brak stanu</span>';
        } else if (p.promoPrice !== null && p.promoPrice <= 0) {
            statusHtml = '<span class="sku-status sku-status--error">Cena ≤ 0</span>';
        } else {
            statusHtml = '<span class="sku-status sku-status--ok">OK</span>';
        }

        return `<tr class="${p.conflict ? 'conflict' : ''}">
            <td><code>${p.sku}</code></td>
            <td>${p.dbProduct ? p.dbProduct.name : '<em style="color:var(--text-muted)">—</em>'}</td>
            <td class="text-right">${p.dbProduct ? p.dbProduct.erpPrice.toFixed(2) + ' zł' : '—'}</td>
            <td class="text-right">${p.discountValue} ${typeLabel}</td>
            <td class="text-right">${p.promoPrice !== null ? `<span class="price-promo">${p.promoPrice.toFixed(2)} zł</span>` : '—'}</td>
            <td class="text-right">${p.limit !== null ? p.limit + ' szt.' : '∞'}</td>
            <td>${statusHtml}</td>
            <td><button class="btn-icon" onclick="removeProduct('${p.sku}')" title="Usuń"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></td>
        </tr>`;
    }).join('');
}

// ===== RENDER VALIDATIONS =====
function renderValidations() {
    const list = document.getElementById('validationList');
    const items = [];

    if (state.products.length === 0) {
        items.push({ type: 'info', icon: 'ℹ️', text: 'Dodaj produkty aby uruchomić walidacje' });
    } else {
        const valid = state.products.filter(p => p.valid && !p.conflict && (p.promoPrice === null || p.promoPrice > 0));
        const invalid = state.products.filter(p => !p.valid);
        const conflicts = state.products.filter(p => p.conflict);
        const zeroStock = state.products.filter(p => p.dbProduct && p.dbProduct.stock === 0);
        const negativePrice = state.products.filter(p => p.promoPrice !== null && p.promoPrice <= 0);

        if (valid.length === state.products.length) {
            items.push({ type: 'ok', icon: '✅', text: `Wszystkie ${state.products.length} produktów przeszło walidację` });
        }
        if (invalid.length > 0) {
            items.push({ type: 'error', icon: '❌', text: `${invalid.length} SKU nie znaleziono w bazie: ${invalid.map(p => p.sku).join(', ')}` });
        }
        if (conflicts.length > 0) {
            items.push({ type: 'error', icon: '⚠️', text: `Konflikt SKU: ${conflicts.map(p => `${p.sku} (w "${p.conflict}")`).join(', ')}` });
        }
        if (zeroStock.length > 0) {
            const mode = document.querySelector('input[name="stockMode"]:checked').value;
            items.push({
                type: mode === 'A' ? 'warn' : 'info',
                icon: mode === 'A' ? '📦' : 'ℹ️',
                text: `${zeroStock.length} produktów ze stanem 0: ${zeroStock.map(p => p.sku).join(', ')}. ${mode === 'A' ? 'Wypadną z promocji (Tryb A).' : 'Pozostaną w promocji (Tryb B).'}`
            });
        }
        if (negativePrice.length > 0) {
            items.push({ type: 'error', icon: '💰', text: `${negativePrice.length} produktów z ceną ≤ 0 zł: rabat zbyt wysoki!` });
        }

        // Omnibus check
        const omnibusIssues = state.products.filter(p => p.dbProduct && p.promoPrice !== null && p.promoPrice > p.dbProduct.omnibus30);
        if (omnibusIssues.length > 0) {
            items.push({
                type: 'info',
                icon: '📋',
                text: `Dyrektywa Omnibus: Cena referencyjna (najniższa z 30 dni) będzie wyświetlana przy każdym produkcie promocyjnym.`
            });
        }

        items.push({ type: 'ok', icon: '⚖️', text: 'Omnibus: System automatycznie wyświetli najniższą cenę z 30 dni jako cenę referencyjną.' });
    }

    list.innerHTML = items.map(i =>
        `<div class="validation-item validation-item--${i.type}"><span class="validation-icon">${i.icon}</span><span>${i.text}</span></div>`
    ).join('');
}

// ===== RENDER LIFECYCLE =====
function renderLifecycle() {
    const states = ['draft', 'scheduled', 'active', 'ended'];
    const current = state.campaignStatus;
    const currentIdx = states.indexOf(current);

    document.querySelectorAll('.lifecycle-node[data-state]').forEach(node => {
        const nodeState = node.dataset.state;
        const nodeIdx = states.indexOf(nodeState);
        node.classList.remove('active', 'passed');

        if (nodeState === current) {
            node.classList.add('active');
        } else if (current === 'paused' && nodeState === 'active') {
            node.classList.add('passed');
        } else if (current === 'cancelled') {
            // nothing
        } else if (nodeIdx >= 0 && nodeIdx < currentIdx) {
            node.classList.add('passed');
        }

        if (nodeState === 'paused') {
            node.classList.toggle('active', current === 'paused');
        }
        if (nodeState === 'cancelled') {
            node.classList.toggle('active', current === 'cancelled');
        }
    });

    // Buttons
    const show = (id, visible) => document.getElementById(id).style.display = visible ? '' : 'none';
    show('publishBtn', current === 'draft');
    show('activateBtn', current === 'scheduled');
    show('pauseBtn', current === 'active');
    show('resumeBtn', current === 'paused');
    show('cancelBtn', !['ended', 'cancelled'].includes(current));
}

// ===== PREVIEW: LISTING =====
function renderPreviewListing() {
    const grid = document.getElementById('previewGrid');
    const label = document.getElementById('labelText').value || 'Promocja';
    const badge = document.getElementById('badgeType').value;
    const badgeEmojis = { sale: '🔥', promo: '⭐', hot: '💥', last: '⏰' };
    const isPaused = ['paused', 'ended', 'cancelled'].includes(state.campaignStatus);
    const stockMode = document.querySelector('input[name="stockMode"]:checked').value;

    document.getElementById('previewCategoryTitle').textContent = label;

    const validProducts = state.products.filter(p => {
        if (!p.valid) return false;
        if (stockMode === 'A' && p.dbProduct && p.dbProduct.stock === 0) return false;
        return true;
    });

    if (validProducts.length === 0) {
        grid.innerHTML = '<div class="preview-empty-state"><p>Dodaj produkty do kampanii, aby zobaczyć podgląd listingu</p></div>';
        return;
    }

    // Status banner for preview context
    let bannerHtml = '';
    if (isPaused) {
        bannerHtml = `<div style="grid-column:1/-1;background:#fef3c7;border:1px solid #fcd34d;border-radius:8px;padding:10px 16px;font-size:12px;color:#92400e;margin-bottom:8px;">
            ⏸️ Kampania ${state.campaignStatus === 'paused' ? 'wstrzymana' : state.campaignStatus === 'ended' ? 'zakończona' : 'anulowana'} — poniżej podgląd jak wyglądały ceny promocyjne
        </div>`;
    }

    grid.innerHTML = bannerHtml + validProducts.map(p => {
        const db = p.dbProduct;
        const stockLabel = db.stock > 10 ? `<span class="in-stock">W magazynie (${db.stock} szt.)</span>` :
            db.stock > 0 ? `<span class="low-stock">Ostatnie ${db.stock} szt.</span>` :
            `<span class="no-stock">Brak na stanie</span>`;

        // Podgląd ZAWSZE pokazuje ceny promocyjne (to narzędzie wizualizacji)
        const showPromo = p.promoPrice !== null && p.promoPrice > 0;
        const available = p.limit !== null ? Math.min(p.limit - p.soldCount, db.stock) : db.stock;
        const conflictBadge = p.conflict ? `<div style="position:absolute;bottom:8px;left:8px;right:8px;background:#fef2f2;border:1px solid #fca5a5;border-radius:4px;padding:3px 6px;font-size:9px;color:#991b1b;text-align:center;">⚠️ Konflikt: ${p.conflict}</div>` : '';

        return `<div class="product-card" onclick="selectProduct('${p.sku}')" style="${p.conflict ? 'opacity:0.7;' : ''}">
            ${showPromo ? `<div class="product-card__badge">${badgeEmojis[badge] || '🔥'} ${label}</div>` : ''}
            ${showPromo && p.discountPercent ? `<div class="product-card__discount-badge">-${p.discountPercent}%</div>` : ''}
            <div class="product-card__image">${db.icon}</div>
            <div class="product-card__body">
                <div class="product-card__name">${db.name}</div>
                <div class="product-card__sku">${p.sku}</div>
                <div class="product-card__prices">
                    ${showPromo ? `
                        <span class="product-card__price-promo">${p.promoPrice.toFixed(2)} zł</span>
                        <span class="product-card__price-old">${db.erpPrice.toFixed(2)} zł</span>
                    ` : `
                        <span style="font-size:16px;font-weight:600;">${db.erpPrice.toFixed(2)} zł</span>
                    `}
                </div>
                ${showPromo ? `<div class="product-card__omnibus">Najniższa cena z 30 dni: ${db.omnibus30.toFixed(2)} zł</div>` : ''}
                <div class="product-card__stock">${stockLabel}${p.limit !== null ? ` · Promocja: ${available} szt.` : ''}</div>
            </div>
            ${conflictBadge}
        </div>`;
    }).join('');
}

// ===== PREVIEW: PRODUCT DETAIL =====
function selectProduct(sku) {
    state.selectedProductSku = sku;
    // switch to product tab
    document.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.preview-content').forEach(c => c.classList.remove('active'));
    document.querySelector('[data-preview="product"]').classList.add('active');
    document.getElementById('preview-product').classList.add('active');
    renderPreviewProduct();
}

function renderPreviewProduct() {
    const view = document.getElementById('productDetailView');
    const p = state.products.find(pr => pr.sku === state.selectedProductSku);

    if (!p || !p.dbProduct) {
        view.innerHTML = '<div class="preview-empty-state"><p>Kliknij produkt na listingu aby zobaczyć kartę produktu</p></div>';
        document.getElementById('productUrlSlug').textContent = 'wybierz-produkt';
        return;
    }

    const db = p.dbProduct;
    // Podgląd ZAWSZE pokazuje ceny promo (to narzędzie wizualizacji)
    const showPromo = p.promoPrice !== null && p.promoPrice > 0;
    const label = document.getElementById('labelText').value || 'Promocja';
    const available = p.limit !== null ? Math.min(p.limit - p.soldCount, db.stock) : db.stock;
    const promoType = document.getElementById('promoType').value;
    const promoTypeLabel = { amount: 'Obniżka kwotowa', percent: 'Obniżka procentowa', fixed: 'Fixed Price' }[promoType];

    document.getElementById('productUrlSlug').textContent = db.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    view.innerHTML = `
        <div class="product-detail__image">
            ${showPromo ? `<div class="product-card__badge" style="top:12px;left:12px;font-size:12px;">${label}</div>` : ''}
            ${db.icon}
        </div>
        <div class="product-detail__info">
            <h3>${db.name}</h3>
            <div class="product-detail__sku-line">SKU: ${p.sku} · Kategoria: ${db.category}</div>

            ${showPromo ? `
                <div class="product-detail__price-block">
                    <div class="detail-promo-label">${label} -${p.discountPercent}%</div>
                    <div>
                        <span class="detail-price-promo">${p.promoPrice.toFixed(2)} zł</span>
                        <span class="detail-price-old">${db.erpPrice.toFixed(2)} zł</span>
                    </div>
                    <div class="detail-savings">Oszczędzasz ${p.discountAmount.toFixed(2)} zł (${promoTypeLabel}: ${p.discountValue}${promoType === 'percent' ? '%' : ' zł'})</div>
                    <div class="detail-omnibus">
                        <strong>Najniższa cena z ostatnich 30 dni przed obniżką:</strong><br>
                        ${db.omnibus30.toFixed(2)} zł
                        <br><span style="font-size:10px;color:#9ca3af;">(Dyrektywa Omnibus UE 2019/2161)</span>
                    </div>
                </div>
            ` : `
                <div style="font-size:28px;font-weight:700;margin-bottom:16px;">${db.erpPrice.toFixed(2)} zł</div>
            `}

            <div class="detail-stock">
                Dostępność: ${db.stock > 0 ? `<span style="color:var(--success);font-weight:600;">${db.stock} szt. w magazynie</span>` : '<span style="color:var(--danger);font-weight:600;">Brak na stanie</span>'}
            </div>

            ${showPromo && p.limit !== null ? `
                <div class="detail-limit-info">
                    ⚠️ Maksymalna ilość w cenie promocyjnej: <strong>${p.limit} szt.</strong>
                    ${p.limit < db.stock ? '<br>Większe ilości — cena regularna.' : ''}
                </div>
            ` : ''}

            <div class="detail-add-cart">
                <input type="number" class="detail-qty" value="1" min="1" max="${db.stock || 999}" id="detailQty">
                <button class="detail-cart-btn" onclick="addToCart('${p.sku}')">🛒 Dodaj do koszyka</button>
            </div>
        </div>
    `;
}

// ===== CART LOGIC =====
function addToCart(sku) {
    const p = state.products.find(pr => pr.sku === sku);
    if (!p || !p.dbProduct) return;

    const qtyInput = document.getElementById('detailQty');
    const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;

    const existing = state.cartItems.find(c => c.sku === sku);
    if (existing) {
        existing.qty += qty;
    } else {
        state.cartItems.push({ sku, qty });
    }

    showToast(`Dodano ${qty} szt. ${p.dbProduct.name} do koszyka`, 'success');

    // Switch to cart
    document.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.preview-content').forEach(c => c.classList.remove('active'));
    document.querySelector('[data-preview="cart"]').classList.add('active');
    document.getElementById('preview-cart').classList.add('active');
    renderPreviewCart();
}

function renderPreviewCart() {
    const container = document.getElementById('cartItems');

    if (state.cartItems.length === 0 || state.products.length === 0) {
        container.innerHTML = '<div class="preview-empty-state"><p>Dodaj produkty do kampanii i kliknij "Dodaj do koszyka" na karcie produktu</p></div>';
        // Add demo items if products exist
        if (state.products.length > 0 && state.cartItems.length === 0) {
            const validProds = state.products.filter(p => p.valid && p.dbProduct);
            if (validProds.length >= 2) {
                state.cartItems = [
                    { sku: validProds[0].sku, qty: validProds[0].limit !== null ? validProds[0].limit + 2 : 3 },
                    { sku: validProds[1].sku, qty: 1 },
                ];
                if (validProds.length >= 3) {
                    state.cartItems.push({ sku: validProds[2].sku, qty: 2 });
                }
            }
        }
        if (state.cartItems.length === 0) return;
    }

    let totalRegular = 0;
    let totalPromo = 0;
    let hasSplit = false;
    let html = '';

    state.cartItems.forEach(item => {
        const p = state.products.find(pr => pr.sku === item.sku);
        if (!p || !p.dbProduct) return;

        const db = p.dbProduct;
        // Podgląd ZAWSZE pokazuje ceny promo
        const showPromo = p.promoPrice !== null && p.promoPrice > 0;

        if (showPromo && p.limit !== null && item.qty > p.limit) {
            // Split order!
            hasSplit = true;
            const promoQty = p.limit;
            const regularQty = item.qty - p.limit;
            const promoTotal = promoQty * p.promoPrice;
            const regularTotal = regularQty * db.erpPrice;

            totalRegular += item.qty * db.erpPrice;
            totalPromo += promoTotal + regularTotal;

            html += `
                <div class="cart-split-notice">
                    <span>⚠️</span>
                    <span>Maksymalna ilość produktu <strong>${db.name}</strong> w cenie promocyjnej to ${p.limit} szt. Pozostałe ${regularQty} szt. naliczono w cenie regularnej.</span>
                </div>
                <div class="cart-item">
                    <div class="cart-item__image">${db.icon}</div>
                    <div class="cart-item__info">
                        <div class="cart-item__name">${db.name} <span style="color:var(--promo-red);font-weight:600;font-size:10px;">PROMO</span></div>
                        <div class="cart-item__sku">${p.sku}</div>
                    </div>
                    <div class="cart-item__pricing">
                        <div class="price-promo">${promoTotal.toFixed(2)} zł</div>
                        <div class="cart-item__qty">${promoQty} × ${p.promoPrice.toFixed(2)} zł</div>
                    </div>
                </div>
                <div class="cart-item">
                    <div class="cart-item__image">${db.icon}</div>
                    <div class="cart-item__info">
                        <div class="cart-item__name">${db.name} <span style="color:var(--text-muted);font-size:10px;">CENA REG.</span></div>
                        <div class="cart-item__sku">${p.sku}</div>
                    </div>
                    <div class="cart-item__pricing">
                        <div>${regularTotal.toFixed(2)} zł</div>
                        <div class="cart-item__qty">${regularQty} × ${db.erpPrice.toFixed(2)} zł</div>
                    </div>
                </div>`;
        } else {
            const unitPrice = showPromo ? p.promoPrice : db.erpPrice;
            const lineTotal = item.qty * unitPrice;
            totalRegular += item.qty * db.erpPrice;
            totalPromo += lineTotal;

            html += `
                <div class="cart-item">
                    <div class="cart-item__image">${db.icon}</div>
                    <div class="cart-item__info">
                        <div class="cart-item__name">${db.name} ${showPromo ? '<span style="color:var(--promo-red);font-weight:600;font-size:10px;">PROMO</span>' : ''}</div>
                        <div class="cart-item__sku">${p.sku}</div>
                    </div>
                    <div class="cart-item__pricing">
                        <div class="${showPromo ? 'price-promo' : ''}">${lineTotal.toFixed(2)} zł</div>
                        <div class="cart-item__qty">${item.qty} × ${unitPrice.toFixed(2)} zł</div>
                        ${showPromo ? `<div class="price-old">${(item.qty * db.erpPrice).toFixed(2)} zł</div>` : ''}
                    </div>
                </div>`;
        }
    });

    const savings = totalRegular - totalPromo;

    html += `
        <div class="cart-summary">
            <div class="cart-summary-row">
                <span>Cena regularna:</span>
                <span style="text-decoration:line-through;color:var(--text-muted);">${totalRegular.toFixed(2)} zł</span>
            </div>
            <div class="cart-summary-row cart-summary-row--total">
                <span>Do zapłaty:</span>
                <span>${totalPromo.toFixed(2)} zł</span>
            </div>
        </div>
        ${savings > 0 ? `<div class="cart-savings">🎉 Oszczędzasz ${savings.toFixed(2)} zł dzięki promocji!</div>` : ''}
    `;

    container.innerHTML = html;
}

// ===== PREVIEW: FEED =====
function renderPreviewFeed() {
    const isActive = ['active', 'scheduled'].includes(state.campaignStatus);
    const validProducts = state.products.filter(p => p.valid && p.dbProduct);

    // DataFeedWatch — zawsze pokazuje podgląd z cenami promo
    const dfwEl = document.getElementById('feedDataFeedWatch');
    if (validProducts.length === 0) {
        dfwEl.textContent = '// Dodaj produkty do kampanii';
    } else {
        const items = validProducts.slice(0, 4).map(p => {
            const db = p.dbProduct;
            const salePrice = (p.promoPrice !== null && p.promoPrice > 0) ? p.promoPrice : null;
            return `  {
    <span class="key">"id"</span>: <span class="str">"${p.sku}"</span>,
    <span class="key">"title"</span>: <span class="str">"${db.name}"</span>,
    <span class="key">"price"</span>: <span class="num">${db.erpPrice.toFixed(2)}</span>,${salePrice ? `
    <span class="key">"sale_price"</span>: <span class="changed">${salePrice.toFixed(2)}</span>,  <span class="comment">← cena promocyjna${!isActive ? ' (po aktywacji)' : ''}</span>` : `
    <span class="comment">// brak ceny promocyjnej</span>`}
    <span class="key">"availability"</span>: <span class="str">"${db.stock > 0 ? 'in stock' : 'out of stock'}"</span>
  }`;
        }).join(',\n');
        dfwEl.innerHTML = `<span class="comment">// DataFeedWatch Product Feed${!isActive ? ' (podgląd — aktywne po uruchomieniu kampanii)' : ''}</span>\n[\n${items}${validProducts.length > 4 ? `\n  <span class="comment">// ... i ${validProducts.length - 4} więcej produktów</span>` : ''}\n]`;
    }

    // BaseLinker — zawsze pokazuje podgląd z cenami promo
    const blEl = document.getElementById('feedBaseLinker');
    if (validProducts.length === 0) {
        blEl.textContent = '// Dodaj produkty do kampanii';
    } else {
        const items = validProducts.slice(0, 4).map(p => {
            const db = p.dbProduct;
            const price = (p.promoPrice !== null && p.promoPrice > 0) ? p.promoPrice : db.erpPrice;
            const hasPromo = p.promoPrice !== null && p.promoPrice > 0;
            return `  {
    <span class="key">"sku"</span>: <span class="str">"${p.sku}"</span>,
    <span class="key">"name"</span>: <span class="str">"${db.name}"</span>,
    <span class="key">"price"</span>: <span class="${hasPromo ? 'changed' : 'num'}">${price.toFixed(2)}</span>,${hasPromo ? `  <span class="comment">← uwzględnia promocję${!isActive ? ' (po aktywacji)' : ''}</span>` : ''}
    <span class="key">"stock"</span>: <span class="num">${db.stock}</span>,
    <span class="key">"ean"</span>: <span class="str">"590${Math.random().toString().slice(2,12)}"</span>
  }`;
        }).join(',\n');
        blEl.innerHTML = `<span class="comment">// BaseLinker → Allegro / Marketplace${!isActive ? ' (podgląd — aktywne po uruchomieniu kampanii)' : ''}</span>\n[\n${items}${validProducts.length > 4 ? `\n  <span class="comment">// ... i ${validProducts.length - 4} więcej produktów</span>` : ''}\n]`;
    }

    // Email preview
    const emailEl = document.getElementById('emailPreview');
    const campaignName = document.getElementById('campaignName').value || 'Kampania';
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (state.campaignStatus === 'active') {
        emailEl.innerHTML = `
            <div class="email-header">
                <div><strong>Od:</strong> system@cyfrowe.pl</div>
                <div><strong>Do:</strong> marketing@cyfrowe.pl</div>
                <div><strong>Temat:</strong> ✅ Kampania "${campaignName}" została aktywowana</div>
            </div>
            <div class="email-body">
                <p>Kampania <strong>"${campaignName}"</strong> jest teraz aktywna.</p>
                <p>Okres: ${formatDate(startDate)} — ${formatDate(endDate)}</p>
                <p>Produktów w promocji: <strong>${validProducts.length}</strong></p>
                <p>Ceny promocyjne są widoczne na: karcie produktu, listingu kategorii, Landing Page, feedzie DataFeedWatch oraz BaseLinkera.</p>
            </div>`;
    } else if (state.campaignStatus === 'ended' || state.campaignStatus === 'cancelled') {
        emailEl.innerHTML = `
            <div class="email-header">
                <div><strong>Od:</strong> system@cyfrowe.pl</div>
                <div><strong>Do:</strong> marketing@cyfrowe.pl</div>
                <div><strong>Temat:</strong> ${state.campaignStatus === 'ended' ? '🏁' : '❌'} Kampania "${campaignName}" — ${state.campaignStatus === 'ended' ? 'zakończona' : 'anulowana'}</div>
            </div>
            <div class="email-body">
                <p>Kampania <strong>"${campaignName}"</strong> została ${state.campaignStatus === 'ended' ? 'zakończona' : 'anulowana'}.</p>
                <p>Ceny produktów wróciły do wartości bazowych z ERP.</p>
                <p>Feedy DataFeedWatch i BaseLinker zostały zaktualizowane.</p>
            </div>`;
    } else {
        emailEl.innerHTML = `<div class="preview-empty-state"><p>Zmień status kampanii aby zobaczyć podgląd powiadomień e-mail</p></div>`;
    }
}

function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// ===== TOAST =====
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all .3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
