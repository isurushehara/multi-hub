// Elements
const redSlider = document.getElementById('redSlider');
const greenSlider = document.getElementById('greenSlider');
const blueSlider = document.getElementById('blueSlider');
const redValue = document.getElementById('redValue');
const greenValue = document.getElementById('greenValue');
const blueValue = document.getElementById('blueValue');
const colorBox = document.getElementById('color-box');

const rgbChip = document.getElementById('rgbChip');
const hexChip = document.getElementById('hexChip');
const hslChip = document.getElementById('hslChip');

const randomBtn = document.getElementById('randomBtn');
const resetBtn = document.getElementById('resetBtn');
const copyBtn = document.getElementById('copyBtn');
const toast = document.getElementById('toast');

// Helpers
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

function toHex(n) {
    const s = clamp(Number(n) || 0, 0, 255).toString(16);
    return s.length === 1 ? '0' + s : s;
}

function rgbToHex(r, g, b) {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function getRGB() {
    const r = Number(redSlider.value);
    const g = Number(greenSlider.value);
    const b = Number(blueSlider.value);
    return { r, g, b };
}

function setRGB(r, g, b) {
    redSlider.value = clamp(r, 0, 255);
    greenSlider.value = clamp(g, 0, 255);
    blueSlider.value = clamp(b, 0, 255);
    updateUI();
}

function showToast(text) {
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 1400);
}

function updateUI() {
    const { r, g, b } = getRGB();
    const rgbStr = `rgb(${r}, ${g}, ${b})`;
    const hexStr = rgbToHex(r, g, b);
    const hslStr = rgbToHsl(r, g, b);

    // Preview
    colorBox.style.background = rgbStr;
    colorBox.setAttribute('aria-label', `Color preview ${rgbStr}`);

    // Outputs
    redValue.textContent = r;
    greenValue.textContent = g;
    blueValue.textContent = b;
    rgbChip.textContent = rgbStr;
    hexChip.textContent = hexStr;
    hslChip.textContent = hslStr;
}

function copyText(text) {
    if (navigator.clipboard?.writeText) {
        return navigator.clipboard.writeText(text);
    }
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return Promise.resolve();
}

// Events
['input', 'change'].forEach(evt => {
    redSlider.addEventListener(evt, updateUI);
    greenSlider.addEventListener(evt, updateUI);
    blueSlider.addEventListener(evt, updateUI);
});

randomBtn.addEventListener('click', () => {
    setRGB(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
    showToast('Random color generated');
});

resetBtn.addEventListener('click', () => {
    setRGB(0, 0, 0);
    showToast('Reset to black');
});

copyBtn.addEventListener('click', () => {
    const { r, g, b } = getRGB();
    const rgbStr = `rgb(${r}, ${g}, ${b})`;
    copyText(rgbStr).then(() => showToast('Copied RGB to clipboard'));
});

[rgbChip, hexChip, hslChip].forEach(chip => {
    chip.addEventListener('click', () => {
        const { r, g, b } = getRGB();
        const type = chip.dataset.type;
        const text = type === 'rgb' ? `rgb(${r}, ${g}, ${b})` : type === 'hex' ? rgbToHex(r, g, b) : rgbToHsl(r, g, b);
        copyText(text).then(() => showToast(`Copied ${type.toUpperCase()}!`));
    });
});

// Init
updateUI();