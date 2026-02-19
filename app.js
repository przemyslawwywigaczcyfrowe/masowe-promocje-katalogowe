// ===== REAL PRODUCT DATA FROM cyfrowe.pl FEED =====
const PRODUCT_DATABASE = {
    'RAMSANSDTX64GB200': {
        name: 'Sandisk microSDXC 64 GB Extreme Pro 200MB/s A2 C10 V30',
        erpPrice: 89.00, omnibus30: 84.54, stock: 7,
        category: 'Karty pamięci', section: 'Fotografia', brand: 'Sandisk',
        image: 'https://cyfrowe.pl/media/cache/resolve/app_shop_product_gallery_main/a0/72/8deebb715961a020e9199a3694e8.jpg',
        link: 'https://cyfrowe.pl/karta-pamieci-sandisk-microsdxc-64-gb-extreme-pro-200mb-s-a2-c10-v30-uhs-i-u3-i-adapter-p.html',
    },
    'AKWCANEIE': {
        name: 'Canon ER-iE muszla oczna',
        erpPrice: 119.00, omnibus30: 119.00, stock: 2,
        category: 'Akcesoria drobne', section: 'Fotografia', brand: 'Canon',
        image: 'https://cyfrowe.pl/media/cache/resolve/app_shop_product_gallery_main/6f/29/13a2a52969f0a0d6c1088826a2a2.jpg',
        link: 'https://cyfrowe.pl/canon-er-ie-muszla-oczna-p.html',
    },
    'LAMNEWCUTIEPIEW': {
        name: 'Newell RGB Cutie Pie (biała)',
        erpPrice: 131.00, omnibus30: 125.00, stock: 3,
        category: 'Lampy wideo', section: 'Filmowanie', brand: 'Newell',
        image: 'https://cyfrowe.pl/media/cache/resolve/app_shop_product_gallery_main/fe/d6/8e65e1155c0b5d9046790ccfb608.jpg',
        link: 'https://cyfrowe.pl/lampa-led-newell-rgb-cutie-pie-bialy-p.html',
    },
    'MIKRODPSA1': {
        name: 'Rode Uchwyt PSA1 do mikrofonu Podmic',
        erpPrice: 335.00, omnibus30: 319.00, stock: 1,
        category: 'Audio', section: 'Filmowanie', brand: 'Rode',
        image: 'https://cyfrowe.pl/media/cache/resolve/app_shop_product_gallery_main/ca/34/7202ded69c0c829f15624e456a1c.jpg',
        link: 'https://cyfrowe.pl/rode-statyw-do-mikrofonu-psa1-p.html',
    },
    'PASPEASLLEP3': {
        name: 'Peak Design Pasek Slide Lite v3 fioletowy',
        erpPrice: 329.00, omnibus30: 329.00, stock: 6,
        category: 'Paski i szelki', section: 'Fotografia', brand: 'Peak Design',
        image: 'https://cyfrowe.pl/media/cache/resolve/app_shop_product_gallery_main/f9/fd/4c6f13aaca0aa37c0f7777c7f09d.jpg',
        link: 'https://cyfrowe.pl/pasek-peak-design-pasek-na-szyje-slide-lite-v3-fioletowy-do-lekkich-aparatow-p.html',
    },
    'TORFSTSLOM-BLK': {
        name: 'F-Stop Slope Medium wkład do plecaka czarny',
        erpPrice: 429.00, omnibus30: 399.00, stock: 1,
        category: 'Torby, plecaki', section: 'Fotografia', brand: 'F-Stop',
        image: 'https://cyfrowe.pl/media/cache/resolve/app_shop_product_gallery_main/3e/9a/6753f54d46b193f017ccfb340090.jpg',
        link: 'https://cyfrowe.pl/plecak-f-stop-slope-medium-czarny-p.html',
    },
    'LORNIKPROSTP38X42': {
        name: 'Nikon PROSTAFF P3 8x42',
        erpPrice: 719.00, omnibus30: 719.00, stock: 3,
        category: 'Lornetki', section: 'Obserwacja', brand: 'Nikon',
        image: 'https://cyfrowe.pl/media/cache/resolve/app_shop_product_gallery_main/9b/6a/ee9cafd812921c47f68523fd9a63.jpeg',
        link: 'https://cyfrowe.pl/lornetka-nikon-prostaff-p3-8x42-p.html',
    },
    'NADELISKYPORTPLUSHS-S': {
        name: 'Elinchrom Transmitter Pro dla Sony',
        erpPrice: 778.00, omnibus30: 730.95, stock: 1,
        category: 'Wyzwalacze lamp', section: 'Fotografia', brand: 'Elinchrom',
        image: 'https://cyfrowe.pl/media/cache/resolve/app_shop_product_gallery_main/e4/ad/56e0f2f4983ee0233852081031fe.jpg',
        link: 'https://cyfrowe.pl/wyzwalacz-elinchrom-skyport-plus-hs-dla-sony-p.html',
    },
    'LAMGLOVEGA400-LYNX': {
        name: 'GlareOne Zestaw Vega 400 Lynx Kit',
        erpPrice: 926.00, omnibus30: 870.05, stock: 1,
        category: 'Lampy studyjne', section: 'Studio', brand: 'GlareOne',
        image: 'https://cyfrowe.pl/media/cache/resolve/app_shop_product_gallery_main/7a/f6/72206dd24d3e2db192490359afc3.jpg',
        link: 'https://cyfrowe.pl/lampa-studyjna-glareone-zestaw-vega-400-lynx-kit-p.html',
    },
    'STTBNRRHINO14CVX20': {
        name: 'Benro Rhino 14C + głowica VX20',
        erpPrice: 1049.00, omnibus30: 1049.00, stock: 2,
        category: 'Statywy', section: 'Fotografia', brand: 'Benro',
        image: 'https://cyfrowe.pl/media/cache/resolve/app_shop_product_gallery_main/43/64/dbe50b6611bb338be68e89be8cce.jpg',
        link: 'https://cyfrowe.pl/statyw-benro-rhino-14c-i-glowica-vx20-p.html',
    },
    'OBITAM1770F28DIVCRXDSOE': {
        name: 'Tamron 17-70 mm f/2.8 Di III-A VC RXD Sony E',
        erpPrice: 2649.00, omnibus30: 2649.00, stock: 5,
        category: 'Obiektywy', section: 'Fotografia', brand: 'Tamron',
        image: 'https://cyfrowe.pl/media/cache/resolve/app_shop_product_gallery_main/aa/f4/def1beab26d9ff0abc71b860877b.jpg',
        link: 'https://cyfrowe.pl/obiektyw-tamron-17-70-mm-f-28-di-iii-a-vc-rxd-sony-e-p.html',
    },
    'DRUCANPRO200S': {
        name: 'Canon PIXMA PRO-200S',
        erpPrice: 2199.00, omnibus30: 2199.00, stock: 2,
        category: 'Drukarki', section: 'Druk i edycja', brand: 'Canon',
        image: 'https://cyfrowe.pl/media/cache/resolve/app_shop_product_gallery_main/99/49/7ddef719fe9c5a2df326bcace6d0.jpg',
        link: 'https://cyfrowe.pl/drukarka-canon-pixma-pro-200s-p.html',
    },
    'ACFSONA6100OB1650AKB': {
        name: 'Sony A6100 + 16-50 mm f/3.5-5.6 (ILCE-6100AKB)',
        erpPrice: 3195.00, omnibus30: 3069.39, stock: 1,
        category: 'Aparaty cyfrowe', section: 'Fotografia', brand: 'Sony',
        image: 'https://cyfrowe.pl/media/cache/resolve/app_shop_product_gallery_main/26/85/d77c51b6f57d1079e081b9084334.jpg',
        link: 'https://cyfrowe.pl/aparat-cyfrowy-sony-a6100-i-16-50-mm-f-35-56-ilce-6100akb-p.html',
    },
    'ACFCANPSV1PVK': {
        name: 'Canon PowerShot V1 Premium Vloger Kit',
        erpPrice: 4155.00, omnibus30: 3990.00, stock: 7,
        category: 'Aparaty cyfrowe', section: 'Fotografia', brand: 'Canon',
        image: 'https://cyfrowe.pl/media/cache/resolve/app_shop_product_gallery_main/5a/c1/0e79b3f82b3ddd677d0699729cb6.jpg',
        link: 'https://cyfrowe.pl/aparat-cyfrowy-canon-powershot-v1-premium-vloger-kit-p.html',
    },
    'KCFPANHCVX3': {
        name: 'Panasonic HC-VX3',
        erpPrice: 3099.00, omnibus30: 3015.97, stock: 1,
        category: 'Kamery cyfrowe', section: 'Filmowanie', brand: 'Panasonic',
        image: 'https://cyfrowe.pl/media/cache/resolve/app_shop_product_gallery_main/59/88/ddd6b8b13059040eeee41b9f2659.jpg',
        link: 'https://cyfrowe.pl/kamera-cyfrowa-panasonic-hc-vx3-p.html',
    },
    'LAMROGUEXLPRO3': {
        name: 'Rogue FlashBender v3 XL Pro Lighting System',
        erpPrice: 625.00, omnibus30: 599.00, stock: 0,
        category: 'Lampy błyskowe', section: 'Fotografia', brand: 'Rogue',
        image: 'https://cyfrowe.pl/media/cache/resolve/app_shop_product_gallery_main/53/d4/b4633d311a200575558c352d1727.jpg',
        link: 'https://cyfrowe.pl/rogue-dyfuzor-rogue-flashbender-v3-xl-pro-lighting-system-p.html',
    },
};

const EXISTING_CAMPAIGNS = {
    'Promocja Wiosenna': ['LAMROGUEXLPRO3']
};

// ===== STATE =====
const state = {
    campaignStatus: 'draft',
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
        isDragging = true; handle.classList.add('dragging');
        document.body.style.cursor = 'col-resize'; document.body.style.userSelect = 'none'; e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => { if (!isDragging) return; configPanel.style.width = Math.min(Math.max(e.clientX, 360), 650) + 'px'; });
    document.addEventListener('mouseup', () => { isDragging = false; handle.classList.remove('dragging'); document.body.style.cursor = ''; document.body.style.userSelect = ''; });
}

// ===== PRODUCT INPUT =====
function initProductInput() {
    document.getElementById('addManualBtn').addEventListener('click', () => {
        const sku = document.getElementById('manualSku').value.trim();
        const value = parseFloat(document.getElementById('manualValue').value);
        const limit = document.getElementById('manualLimit').value ? parseInt(document.getElementById('manualLimit').value) : null;
        if (!sku || isNaN(value)) { showToast('Podaj SKU i wartość rabatu', 'error'); return; }
        addProduct(sku, value, limit);
        document.getElementById('manualSku').value = ''; document.getElementById('manualValue').value = ''; document.getElementById('manualLimit').value = '';
    });

    const csvInput = document.getElementById('csvFileInput');
    document.getElementById('csvBrowseBtn').addEventListener('click', () => csvInput.click());
    csvInput.addEventListener('change', (e) => { if (e.target.files[0]) { const r = new FileReader(); r.onload = (ev) => parseCSVData(ev.target.result); r.readAsText(e.target.files[0]); }});

    const dropZone = document.getElementById('csvDropZone');
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.classList.remove('dragover'); if (e.dataTransfer.files[0]) { const r = new FileReader(); r.onload = (ev) => parseCSVData(ev.target.result); r.readAsText(e.dataTransfer.files[0]); }});

    document.getElementById('parsePasteBtn').addEventListener('click', () => {
        const text = document.getElementById('pasteInput').value.trim();
        if (!text) { showToast('Wklej dane w formacie CSV', 'error'); return; }
        parseCSVData(text);
    });

    document.getElementById('loadSampleBtn').addEventListener('click', loadSampleData);
    document.getElementById('clearAllBtn').addEventListener('click', () => { state.products = []; state.selectedProductSku = null; state.cartItems = []; renderAll(); showToast('Wyczyszczono listę produktów', 'info'); });
}

function parseCSVData(text) {
    const lines = text.split('\n').filter(l => l.trim());
    let added = 0, failed = 0;
    lines.forEach(line => {
        const parts = line.split(/[;,]/).map(p => p.trim());
        if (parts.length >= 2) {
            const sku = parts[0], value = parseFloat(parts[1].replace(',', '.')), limit = parts[2] ? parseInt(parts[2]) : null;
            if (sku && !isNaN(value)) { addProduct(sku, value, limit, true); added++; } else { failed++; }
        } else { failed++; }
    });
    renderAll();
    showToast(`Dodano ${added} produktów${failed ? `, ${failed} błędnych wierszy` : ''}`, added ? 'success' : 'error');
}

function addProduct(sku, discountValue, limit, batch = false) {
    if (state.products.find(p => p.sku === sku)) { if (!batch) showToast(`${sku} jest już na liście`, 'warning'); return; }
    const dbProduct = PRODUCT_DATABASE[sku];
    const promoType = document.getElementById('promoType').value;
    let promoPrice, discountAmount, discountPercent;
    if (dbProduct) {
        if (promoType === 'amount') { discountAmount = discountValue; promoPrice = dbProduct.erpPrice - discountValue; discountPercent = Math.round((discountValue / dbProduct.erpPrice) * 100); }
        else if (promoType === 'percent') { discountPercent = discountValue; discountAmount = Math.round(dbProduct.erpPrice * discountValue / 100 * 100) / 100; promoPrice = dbProduct.erpPrice - discountAmount; }
        else { promoPrice = discountValue; discountAmount = dbProduct.erpPrice - discountValue; discountPercent = Math.round((discountAmount / dbProduct.erpPrice) * 100); }
    }
    state.products.push({
        sku, discountValue, limit, dbProduct,
        promoPrice: dbProduct ? Math.round(promoPrice * 100) / 100 : null,
        discountAmount: dbProduct ? Math.round(discountAmount * 100) / 100 : null,
        discountPercent: dbProduct ? discountPercent : null,
        conflict: checkConflict(sku), valid: !!dbProduct, soldCount: 0,
    });
    if (!batch) renderAll();
}

function removeProduct(sku) { state.products = state.products.filter(p => p.sku !== sku); if (state.selectedProductSku === sku) state.selectedProductSku = null; renderAll(); }

function checkConflict(sku) { for (const [campaign, skus] of Object.entries(EXISTING_CAMPAIGNS)) { if (skus.includes(sku)) return campaign; } return null; }

function recalculatePrices() {
    const promoType = document.getElementById('promoType').value;
    state.products.forEach(p => {
        if (!p.dbProduct) return;
        const erp = p.dbProduct.erpPrice;
        if (promoType === 'amount') { p.discountAmount = p.discountValue; p.promoPrice = Math.round((erp - p.discountValue) * 100) / 100; p.discountPercent = Math.round((p.discountValue / erp) * 100); }
        else if (promoType === 'percent') { p.discountPercent = p.discountValue; p.discountAmount = Math.round(erp * p.discountValue / 100 * 100) / 100; p.promoPrice = Math.round((erp - p.discountAmount) * 100) / 100; }
        else { p.promoPrice = p.discountValue; p.discountAmount = Math.round((erp - p.discountValue) * 100) / 100; p.discountPercent = Math.round((p.discountAmount / erp) * 100); }
    });
}

// ===== LOAD SAMPLE DATA =====
function loadSampleData() {
    state.products = [];
    const samples = [
        ['RAMSANSDTX64GB200', 15, 50],
        ['AKWCANEIE', 20, null],
        ['LAMNEWCUTIEPIEW', 25, 20],
        ['MIKRODPSA1', 50, null],
        ['PASPEASLLEP3', 60, 30],
        ['TORFSTSLOM-BLK', 80, null],
        ['LORNIKPROSTP38X42', 100, 15],
        ['NADELISKYPORTPLUSHS-S', 120, null],
        ['LAMGLOVEGA400-LYNX', 150, 5],
        ['STTBNRRHINO14CVX20', 200, null],
        ['OBITAM1770F28DIVCRXDSOE', 400, 10],
        ['DRUCANPRO200S', 350, null],
        ['ACFSONA6100OB1650AKB', 500, 5],
        ['ACFCANPSV1PVK', 600, null],
        ['KCFPANHCVX3', 450, 3],
        ['LAMROGUEXLPRO3', 100, null],
    ];
    samples.forEach(([sku, val, lim]) => addProduct(sku, val, lim, true));
    renderAll();
    showToast('Załadowano 16 produktów z feeda cyfrowe.pl', 'success');
}

// ===== CONFIG LISTENERS =====
function initConfigListeners() {
    ['campaignName','campaignShortName','startDate','endDate','promoType','labelText','badgeType','landingPageUrl'].forEach(id => {
        const el = document.getElementById(id);
        const handler = () => { if (id === 'promoType') recalculatePrices(); renderAll(); };
        el.addEventListener('input', handler); el.addEventListener('change', handler);
    });
    document.querySelectorAll('input[name="stockMode"]').forEach(r => r.addEventListener('change', renderAll));
}

// ===== CAMPAIGN LIFECYCLE =====
function initCampaignActions() {
    document.getElementById('publishBtn').addEventListener('click', () => {
        if (state.products.length === 0) { showToast('Dodaj przynajmniej jeden produkt', 'error'); return; }
        if (state.products.some(p => p.conflict)) { showToast('Rozwiąż konflikty SKU przed publikacją', 'error'); return; }
        setCampaignStatus('scheduled'); showToast('Kampania zaplanowana!', 'success');
    });
    document.getElementById('activateBtn').addEventListener('click', () => { setCampaignStatus('active'); showToast('Kampania aktywna!', 'success'); });
    document.getElementById('pauseBtn').addEventListener('click', () => { setCampaignStatus('paused'); showToast('Kampania wstrzymana.', 'warning'); });
    document.getElementById('resumeBtn').addEventListener('click', () => { setCampaignStatus('active'); showToast('Kampania wznowiona!', 'success'); });
    document.getElementById('cancelBtn').addEventListener('click', () => { setCampaignStatus('cancelled'); showToast('Kampania anulowana.', 'error'); });
}

function setCampaignStatus(status) { state.campaignStatus = status; renderAll(); }

// ===== RENDER ALL =====
function renderAll() { renderProductTable(); renderValidations(); renderLifecycle(); renderPreviewListing(); renderPreviewProduct(); renderPreviewCart(); renderPreviewFeed(); updateStatusBar(); updateProductCount(); }

function updateStatusBar() {
    const m = { draft:['Szkic','draft'], scheduled:['Zaplanowana','scheduled'], active:['Aktywna','active'], paused:['Wstrzymana','paused'], ended:['Zakończona','ended'], cancelled:['Anulowana','cancelled'] };
    const [text,cls] = m[state.campaignStatus]; document.getElementById('campaignStatusText').textContent = text;
    document.querySelector('.status-dot').className = `status-dot status-dot--${cls}`;
}

function updateProductCount() { document.getElementById('productCount').textContent = state.products.length; }

// ===== RENDER PRODUCT TABLE =====
function renderProductTable() {
    const tbody = document.getElementById('productTableBody'), empty = document.getElementById('emptyProducts'), bulk = document.getElementById('bulkActions');
    const promoType = document.getElementById('promoType').value;
    if (state.products.length === 0) { tbody.innerHTML = ''; empty.style.display = ''; bulk.style.display = 'none'; return; }
    empty.style.display = 'none'; bulk.style.display = 'flex';
    const typeLabel = { amount: 'zł', percent: '%', fixed: 'zł (fixed)' }[promoType];
    tbody.innerHTML = state.products.map(p => {
        let st = '';
        if (!p.valid) st = '<span class="sku-status sku-status--error">Nie znaleziono</span>';
        else if (p.conflict) st = `<span class="sku-status sku-status--error" title="Konflikt: ${p.conflict}">Konflikt</span>`;
        else if (p.dbProduct?.stock === 0) st = '<span class="sku-status sku-status--warn">Brak stanu</span>';
        else if (p.promoPrice !== null && p.promoPrice <= 0) st = '<span class="sku-status sku-status--error">Cena ≤ 0</span>';
        else st = '<span class="sku-status sku-status--ok">OK</span>';
        return `<tr class="${p.conflict ? 'conflict' : ''}">
            <td><code style="font-size:10px">${p.sku}</code></td>
            <td>${p.dbProduct ? p.dbProduct.name : '—'}</td>
            <td class="text-right">${p.dbProduct ? p.dbProduct.erpPrice.toFixed(2) + ' zł' : '—'}</td>
            <td class="text-right">${p.discountValue} ${typeLabel}</td>
            <td class="text-right">${p.promoPrice !== null ? `<span class="price-promo">${p.promoPrice.toFixed(2)} zł</span>` : '—'}</td>
            <td class="text-right">${p.limit !== null ? p.limit + ' szt.' : '∞'}</td>
            <td>${st}</td>
            <td><button class="btn-icon" onclick="removeProduct('${p.sku}')" title="Usuń"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></td>
        </tr>`;
    }).join('');
}

// ===== RENDER VALIDATIONS =====
function renderValidations() {
    const list = document.getElementById('validationList'), items = [];
    if (state.products.length === 0) { items.push({ type:'info', icon:'ℹ️', text:'Dodaj produkty aby uruchomić walidacje' }); }
    else {
        const invalid = state.products.filter(p => !p.valid), conflicts = state.products.filter(p => p.conflict);
        const zeroStock = state.products.filter(p => p.dbProduct?.stock === 0), negPrice = state.products.filter(p => p.promoPrice !== null && p.promoPrice <= 0);
        const valid = state.products.filter(p => p.valid && !p.conflict && (p.promoPrice === null || p.promoPrice > 0));
        if (valid.length === state.products.length) items.push({ type:'ok', icon:'✅', text:`Wszystkie ${state.products.length} produktów przeszło walidację` });
        if (invalid.length) items.push({ type:'error', icon:'❌', text:`${invalid.length} SKU nie znaleziono: ${invalid.map(p=>p.sku).join(', ')}` });
        if (conflicts.length) items.push({ type:'error', icon:'⚠️', text:`Konflikt SKU: ${conflicts.map(p=>`${p.sku} (w "${p.conflict}")`).join(', ')}` });
        if (zeroStock.length) { const mode = document.querySelector('input[name="stockMode"]:checked').value; items.push({ type: mode==='A'?'warn':'info', icon: mode==='A'?'📦':'ℹ️', text:`${zeroStock.length} produktów ze stanem 0. ${mode==='A'?'Wypadną z promocji (Tryb A).':'Pozostaną w promocji (Tryb B).'}` }); }
        if (negPrice.length) items.push({ type:'error', icon:'💰', text:`${negPrice.length} produktów z ceną ≤ 0 zł!` });
        items.push({ type:'ok', icon:'⚖️', text:'Omnibus: Najniższa cena z 30 dni wyświetlana automatycznie przy każdym produkcie.' });
    }
    list.innerHTML = items.map(i => `<div class="validation-item validation-item--${i.type}"><span class="validation-icon">${i.icon}</span><span>${i.text}</span></div>`).join('');
}

// ===== RENDER LIFECYCLE =====
function renderLifecycle() {
    const states = ['draft','scheduled','active','ended'], current = state.campaignStatus, idx = states.indexOf(current);
    document.querySelectorAll('.lifecycle-node[data-state]').forEach(node => {
        const ns = node.dataset.state, ni = states.indexOf(ns); node.classList.remove('active','passed');
        if (ns === current) node.classList.add('active');
        else if (current === 'paused' && ns === 'active') node.classList.add('passed');
        else if (current !== 'cancelled' && ni >= 0 && ni < idx) node.classList.add('passed');
        if (ns === 'paused') node.classList.toggle('active', current === 'paused');
        if (ns === 'cancelled') node.classList.toggle('active', current === 'cancelled');
    });
    const show = (id, v) => document.getElementById(id).style.display = v ? '' : 'none';
    show('publishBtn', current === 'draft'); show('activateBtn', current === 'scheduled');
    show('pauseBtn', current === 'active'); show('resumeBtn', current === 'paused');
    show('cancelBtn', !['ended','cancelled'].includes(current));
}

// ===== HELPER: product image HTML =====
function productImageHtml(db, size = 140) {
    return `<img src="${db.image}" alt="${db.name}" style="width:100%;height:${size}px;object-fit:contain;background:#f9fafb;" onerror="this.style.display='none';this.parentElement.innerHTML='📷';" loading="lazy">`;
}

// ===== PREVIEW: LISTING =====
function renderPreviewListing() {
    const grid = document.getElementById('previewGrid');
    const label = document.getElementById('labelText').value || 'Promocja';
    const badge = document.getElementById('badgeType').value;
    const badgeEmojis = { sale:'🔥', promo:'⭐', hot:'💥', last:'⏰' };
    const isPaused = ['paused','ended','cancelled'].includes(state.campaignStatus);
    const stockMode = document.querySelector('input[name="stockMode"]:checked').value;

    document.getElementById('previewCategoryTitle').textContent = label;

    const validProducts = state.products.filter(p => { if (!p.valid) return false; if (stockMode === 'A' && p.dbProduct?.stock === 0) return false; return true; });
    if (validProducts.length === 0) { grid.innerHTML = '<div class="preview-empty-state"><p>Dodaj produkty do kampanii, aby zobaczyć podgląd</p></div>'; return; }

    let banner = isPaused ? `<div style="grid-column:1/-1;background:#fef3c7;border:1px solid #fcd34d;border-radius:8px;padding:10px 16px;font-size:12px;color:#92400e;margin-bottom:8px;">⏸️ Kampania ${state.campaignStatus === 'paused' ? 'wstrzymana' : state.campaignStatus === 'ended' ? 'zakończona' : 'anulowana'} — poniżej podgląd jak wyglądały ceny promocyjne</div>` : '';

    grid.innerHTML = banner + validProducts.map(p => {
        const db = p.dbProduct;
        const stockLabel = db.stock > 5 ? `<span class="in-stock">W magazynie (${db.stock})</span>` : db.stock > 0 ? `<span class="low-stock">Ostatnie ${db.stock} szt.</span>` : `<span class="no-stock">Brak</span>`;
        const showPromo = p.promoPrice !== null && p.promoPrice > 0;
        const available = p.limit !== null ? Math.min(p.limit - p.soldCount, db.stock) : db.stock;
        const conflict = p.conflict ? `<div style="position:absolute;bottom:8px;left:8px;right:8px;background:#fef2f2;border:1px solid #fca5a5;border-radius:4px;padding:3px 6px;font-size:9px;color:#991b1b;text-align:center;">⚠️ Konflikt: ${p.conflict}</div>` : '';

        return `<div class="product-card" onclick="selectProduct('${p.sku}')" style="${p.conflict ? 'opacity:0.7;' : ''}">
            ${showPromo ? `<div class="product-card__badge">${badgeEmojis[badge]||'🔥'} ${label}</div>` : ''}
            ${showPromo && p.discountPercent ? `<div class="product-card__discount-badge">-${p.discountPercent}%</div>` : ''}
            <div class="product-card__image">${productImageHtml(db)}</div>
            <div class="product-card__body">
                <div class="product-card__name">${db.name}</div>
                <div class="product-card__sku">${p.sku}</div>
                <div class="product-card__prices">
                    ${showPromo ? `<span class="product-card__price-promo">${p.promoPrice.toFixed(2)} zł</span><span class="product-card__price-old">${db.erpPrice.toFixed(2)} zł</span>`
                    : `<span style="font-size:16px;font-weight:600;">${db.erpPrice.toFixed(2)} zł</span>`}
                </div>
                ${showPromo ? `<div class="product-card__omnibus">Najniższa cena z 30 dni: ${db.omnibus30.toFixed(2)} zł</div>` : ''}
                <div class="product-card__stock">${stockLabel}${p.limit !== null ? ` · Promo: ${available} szt.` : ''}</div>
            </div>${conflict}
        </div>`;
    }).join('');
}

// ===== PREVIEW: PRODUCT DETAIL =====
function selectProduct(sku) {
    state.selectedProductSku = sku;
    document.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.preview-content').forEach(c => c.classList.remove('active'));
    document.querySelector('[data-preview="product"]').classList.add('active');
    document.getElementById('preview-product').classList.add('active');
    renderPreviewProduct();
}

function renderPreviewProduct() {
    const view = document.getElementById('productDetailView');
    const p = state.products.find(pr => pr.sku === state.selectedProductSku);
    if (!p || !p.dbProduct) { view.innerHTML = '<div class="preview-empty-state"><p>Kliknij produkt na listingu aby zobaczyć kartę produktu</p></div>'; document.getElementById('productUrlSlug').textContent = 'wybierz-produkt'; return; }

    const db = p.dbProduct, showPromo = p.promoPrice !== null && p.promoPrice > 0;
    const label = document.getElementById('labelText').value || 'Promocja';
    const promoType = document.getElementById('promoType').value;
    const promoTypeLabel = { amount:'Obniżka kwotowa', percent:'Obniżka procentowa', fixed:'Fixed Price' }[promoType];

    document.getElementById('productUrlSlug').textContent = db.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    view.innerHTML = `
        <div class="product-detail__image">
            ${showPromo ? `<div class="product-card__badge" style="top:12px;left:12px;font-size:12px;">${label}</div>` : ''}
            ${productImageHtml(db, 280)}
        </div>
        <div class="product-detail__info">
            <h3>${db.name}</h3>
            <div class="product-detail__sku-line">SKU: ${p.sku} · ${db.brand} · ${db.category}</div>
            ${showPromo ? `
                <div class="product-detail__price-block">
                    <div class="detail-promo-label">${label} -${p.discountPercent}%</div>
                    <div><span class="detail-price-promo">${p.promoPrice.toFixed(2)} zł</span><span class="detail-price-old">${db.erpPrice.toFixed(2)} zł</span></div>
                    <div class="detail-savings">Oszczędzasz ${p.discountAmount.toFixed(2)} zł (${promoTypeLabel}: ${p.discountValue}${promoType==='percent'?'%':' zł'})</div>
                    <div class="detail-omnibus"><strong>Najniższa cena z ostatnich 30 dni przed obniżką:</strong><br>${db.omnibus30.toFixed(2)} zł<br><span style="font-size:10px;color:#9ca3af;">(Dyrektywa Omnibus UE 2019/2161)</span></div>
                </div>
            ` : `<div style="font-size:28px;font-weight:700;margin-bottom:16px;">${db.erpPrice.toFixed(2)} zł</div>`}
            <div class="detail-stock">Dostępność: ${db.stock > 0 ? `<span style="color:var(--success);font-weight:600;">${db.stock} szt. w magazynie</span>` : '<span style="color:var(--danger);font-weight:600;">Brak na stanie</span>'}</div>
            ${showPromo && p.limit !== null ? `<div class="detail-limit-info">⚠️ Maks. ilość w cenie promocyjnej: <strong>${p.limit} szt.</strong>${p.limit < db.stock ? '<br>Większe ilości — cena regularna.' : ''}</div>` : ''}
            <div class="detail-add-cart"><input type="number" class="detail-qty" value="1" min="1" max="${db.stock||999}" id="detailQty"><button class="detail-cart-btn" onclick="addToCart('${p.sku}')">🛒 Dodaj do koszyka</button></div>
        </div>`;
}

// ===== CART =====
function addToCart(sku) {
    const p = state.products.find(pr => pr.sku === sku); if (!p || !p.dbProduct) return;
    const qty = parseInt(document.getElementById('detailQty')?.value || 1) || 1;
    const existing = state.cartItems.find(c => c.sku === sku);
    if (existing) existing.qty += qty; else state.cartItems.push({ sku, qty });
    showToast(`Dodano ${qty}× ${p.dbProduct.name}`, 'success');
    document.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.preview-content').forEach(c => c.classList.remove('active'));
    document.querySelector('[data-preview="cart"]').classList.add('active');
    document.getElementById('preview-cart').classList.add('active');
    renderPreviewCart();
}

function renderPreviewCart() {
    const container = document.getElementById('cartItems');

    // Auto-populate demo cart on first render
    if (state.cartItems.length === 0 && state.products.length > 0) {
        const vp = state.products.filter(p => p.valid && p.dbProduct);
        if (vp.length >= 3) {
            state.cartItems = [
                { sku: vp[0].sku, qty: vp[0].limit !== null ? vp[0].limit + 3 : 2 },
                { sku: vp[1].sku, qty: 1 },
                { sku: vp[2].sku, qty: 3 },
            ];
        }
    }
    if (state.cartItems.length === 0) { container.innerHTML = '<div class="preview-empty-state"><p>Dodaj produkty do koszyka</p></div>'; return; }

    let totalRegular = 0, totalPromo = 0, totalOmnibus = 0;
    let itemsHtml = '';

    state.cartItems.forEach(item => {
        const p = state.products.find(pr => pr.sku === item.sku); if (!p || !p.dbProduct) return;
        const db = p.dbProduct;
        const showPromo = p.promoPrice !== null && p.promoPrice > 0;

        if (showPromo && p.limit !== null && item.qty > p.limit) {
            // === SPLIT ORDER ===
            const promoQty = p.limit, regQty = item.qty - p.limit;
            const promoTotal = promoQty * p.promoPrice, regTotal = regQty * db.erpPrice;
            const lineRegular = item.qty * db.erpPrice;
            const lineOmnibus = item.qty * db.omnibus30;
            totalRegular += lineRegular; totalPromo += promoTotal + regTotal; totalOmnibus += lineOmnibus;

            itemsHtml += `
                <div class="cart-split-notice"><span>⚠️</span><span>Maks. ilość <strong>${db.name}</strong> w cenie promo: ${p.limit} szt. Pozostałe ${regQty} szt. w cenie regularnej.</span></div>
                <div class="cart-item">
                    <div class="cart-item__image">${productImageHtml(db, 60)}</div>
                    <div class="cart-item__info">
                        <div class="cart-item__name">${db.name} <span style="color:var(--promo-red);font-weight:600;font-size:10px;">PROMO</span></div>
                        <div class="cart-item__sku">${p.sku}</div>
                        <div class="cart-item__omnibus">Omnibus: ${db.omnibus30.toFixed(2)} zł/szt.</div>
                    </div>
                    <div class="cart-item__pricing">
                        <div class="price-promo">${promoTotal.toFixed(2)} zł</div>
                        <div class="cart-item__qty">${promoQty} × ${p.promoPrice.toFixed(2)} zł</div>
                    </div>
                </div>
                <div class="cart-item">
                    <div class="cart-item__image">${productImageHtml(db, 60)}</div>
                    <div class="cart-item__info">
                        <div class="cart-item__name">${db.name} <span style="color:var(--text-muted);font-size:10px;">CENA REG.</span></div>
                        <div class="cart-item__sku">${p.sku}</div>
                    </div>
                    <div class="cart-item__pricing">
                        <div>${regTotal.toFixed(2)} zł</div>
                        <div class="cart-item__qty">${regQty} × ${db.erpPrice.toFixed(2)} zł</div>
                    </div>
                </div>`;
        } else {
            const unitPrice = showPromo ? p.promoPrice : db.erpPrice;
            const lineTotal = item.qty * unitPrice;
            const lineRegular = item.qty * db.erpPrice;
            const lineOmnibus = item.qty * db.omnibus30;
            totalRegular += lineRegular; totalPromo += lineTotal; totalOmnibus += lineOmnibus;

            itemsHtml += `
                <div class="cart-item">
                    <div class="cart-item__image">${productImageHtml(db, 60)}</div>
                    <div class="cart-item__info">
                        <div class="cart-item__name">${db.name} ${showPromo ? '<span style="color:var(--promo-red);font-weight:600;font-size:10px;">PROMO</span>' : ''}</div>
                        <div class="cart-item__sku">${p.sku}</div>
                        ${showPromo ? `<div class="cart-item__omnibus">Omnibus: ${db.omnibus30.toFixed(2)} zł/szt.</div>` : ''}
                    </div>
                    <div class="cart-item__pricing">
                        <div class="${showPromo ? 'price-promo' : ''}">${lineTotal.toFixed(2)} zł</div>
                        <div class="cart-item__qty">${item.qty} × ${unitPrice.toFixed(2)} zł</div>
                        ${showPromo ? `<div class="price-old">${lineRegular.toFixed(2)} zł</div>` : ''}
                    </div>
                </div>`;
        }
    });

    const savings = totalRegular - totalPromo;

    // === FULL PRICE BREAKDOWN ===
    itemsHtml += `
        <div class="cart-summary">
            <h4 style="font-size:14px;font-weight:700;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid var(--text);">Podsumowanie zamówienia</h4>

            <div class="cart-summary-row">
                <span>Wartość produktów (cena regularna):</span>
                <span>${totalRegular.toFixed(2)} zł</span>
            </div>

            ${savings > 0 ? `
            <div class="cart-summary-row" style="color:var(--promo-red);font-weight:600;">
                <span>Rabat z promocji katalogowej:</span>
                <span>- ${savings.toFixed(2)} zł</span>
            </div>
            ` : ''}

            <div class="cart-summary-row" style="border-top:1px dashed var(--border);padding-top:8px;margin-top:4px;">
                <span>Najniższa cena z 30 dni (Omnibus) za koszyk:</span>
                <span style="color:var(--omnibus);">${totalOmnibus.toFixed(2)} zł</span>
            </div>

            <div class="cart-summary-row cart-summary-row--total">
                <span>Do zapłaty:</span>
                <span>${totalPromo.toFixed(2)} zł</span>
            </div>
        </div>

        ${savings > 0 ? `
        <div class="cart-savings">🎉 Oszczędzasz <strong>${savings.toFixed(2)} zł</strong> dzięki promocji katalogowej!</div>

        <div style="background:var(--info-light);border:1px solid #bfdbfe;border-radius:8px;padding:12px 16px;margin-top:10px;font-size:11px;color:#1e40af;line-height:1.5;">
            <strong>⚖️ Informacja Omnibus:</strong><br>
            Cena referencyjna (najniższa z 30 dni przed obniżką) dla produktów w koszyku: <strong>${totalOmnibus.toFixed(2)} zł</strong>.<br>
            Aktualna cena promocyjna: <strong>${totalPromo.toFixed(2)} zł</strong>
            ${totalPromo < totalOmnibus ? ` — <span style="color:var(--success);font-weight:600;">niższa o ${(totalOmnibus - totalPromo).toFixed(2)} zł od ceny Omnibus</span>` : ''}
        </div>
        ` : ''}
    `;

    container.innerHTML = itemsHtml;
}

// ===== PREVIEW: FEED =====
function renderPreviewFeed() {
    const isActive = ['active','scheduled'].includes(state.campaignStatus);
    const validProducts = state.products.filter(p => p.valid && p.dbProduct);

    const dfwEl = document.getElementById('feedDataFeedWatch');
    if (validProducts.length === 0) { dfwEl.textContent = '// Dodaj produkty'; } else {
        const items = validProducts.slice(0,4).map(p => {
            const db = p.dbProduct, sp = (p.promoPrice > 0) ? p.promoPrice : null;
            return `  {\n    <span class="key">"id"</span>: <span class="str">"${p.sku}"</span>,\n    <span class="key">"title"</span>: <span class="str">"${db.name}"</span>,\n    <span class="key">"price"</span>: <span class="num">${db.erpPrice.toFixed(2)}</span>,${sp ? `\n    <span class="key">"sale_price"</span>: <span class="changed">${sp.toFixed(2)}</span>,  <span class="comment">← promo${!isActive?' (po aktywacji)':''}</span>` : ''}\n    <span class="key">"availability"</span>: <span class="str">"${db.stock>0?'in stock':'out of stock'}"</span>\n  }`;
        }).join(',\n');
        dfwEl.innerHTML = `<span class="comment">// DataFeedWatch Feed${!isActive?' (podgląd)':''}</span>\n[\n${items}${validProducts.length>4?`\n  <span class="comment">// +${validProducts.length-4} więcej</span>`:''}\n]`;
    }

    const blEl = document.getElementById('feedBaseLinker');
    if (validProducts.length === 0) { blEl.textContent = '// Dodaj produkty'; } else {
        const items = validProducts.slice(0,4).map(p => {
            const db = p.dbProduct, price = (p.promoPrice > 0) ? p.promoPrice : db.erpPrice, hp = p.promoPrice > 0;
            return `  {\n    <span class="key">"sku"</span>: <span class="str">"${p.sku}"</span>,\n    <span class="key">"name"</span>: <span class="str">"${db.name}"</span>,\n    <span class="key">"price"</span>: <span class="${hp?'changed':'num'}">${price.toFixed(2)}</span>,${hp?`  <span class="comment">← promo${!isActive?' (po aktywacji)':''}</span>`:''}\n    <span class="key">"stock"</span>: <span class="num">${db.stock}</span>\n  }`;
        }).join(',\n');
        blEl.innerHTML = `<span class="comment">// BaseLinker → Allegro${!isActive?' (podgląd)':''}</span>\n[\n${items}${validProducts.length>4?`\n  <span class="comment">// +${validProducts.length-4} więcej</span>`:''}\n]`;
    }

    const emailEl = document.getElementById('emailPreview');
    const cn = document.getElementById('campaignName').value || 'Kampania';
    const sd = document.getElementById('startDate').value, ed = document.getElementById('endDate').value;
    if (state.campaignStatus === 'active') {
        emailEl.innerHTML = `<div class="email-header"><div><strong>Od:</strong> system@cyfrowe.pl</div><div><strong>Do:</strong> marketing@cyfrowe.pl</div><div><strong>Temat:</strong> ✅ Kampania "${cn}" aktywowana</div></div><div class="email-body"><p>Kampania <strong>"${cn}"</strong> jest aktywna.</p><p>Okres: ${formatDate(sd)} — ${formatDate(ed)}</p><p>Produktów: <strong>${validProducts.length}</strong></p></div>`;
    } else if (['ended','cancelled'].includes(state.campaignStatus)) {
        emailEl.innerHTML = `<div class="email-header"><div><strong>Od:</strong> system@cyfrowe.pl</div><div><strong>Do:</strong> marketing@cyfrowe.pl</div><div><strong>Temat:</strong> ${state.campaignStatus==='ended'?'🏁':'❌'} Kampania "${cn}" — ${state.campaignStatus==='ended'?'zakończona':'anulowana'}</div></div><div class="email-body"><p>Kampania <strong>"${cn}"</strong> została ${state.campaignStatus==='ended'?'zakończona':'anulowana'}.</p><p>Ceny wróciły do bazowych.</p></div>`;
    } else {
        emailEl.innerHTML = '<div class="preview-empty-state"><p>Zmień status kampanii aby zobaczyć powiadomienia</p></div>';
    }
}

function formatDate(d) { if (!d) return '—'; return new Date(d).toLocaleDateString('pl-PL', {day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'}); }

// ===== TOAST =====
function showToast(message, type = 'info') {
    const c = document.getElementById('toastContainer'), t = document.createElement('div');
    t.className = `toast toast--${type}`; t.textContent = message; c.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(100%)'; t.style.transition = 'all .3s ease'; setTimeout(() => t.remove(), 300); }, 3000);
}
