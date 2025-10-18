const redSlider = document.getElementById("redSlider");
const greenSlider = document.getElementById("greenSlider");
const blueSlider = document.getElementById("blueSlider");


const redValueSpan = document.getElementById("redValue");
const greenValueSpan = document.getElementById("greenValue");
const blueValueSpan = document.getElementById("blueValue");

const colorBox = document.getElementById("color-box");
const copyButton = document.getElementById("copyButton");
const inputTypeValue = document.getElementById("inputType");

redSlider.addEventListener('input', updateColor);
greenSlider.addEventListener('input', updateColor);
blueSlider.addEventListener('input', updateColor);
copyButton.addEventListener('click', copyToClipboard);
inputTypeValue.addEventListener('click', copyToClipboard);
inputTypeValue.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        copyToClipboard();
    }
});

function updateColor(){
    const redValue = redSlider.value;
    const greenValue = greenSlider.value;
    const blueValue = blueSlider.value;

    const rgbColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
    //console.log(rbgColor);

    colorBox.style.backgroundColor = rgbColor;


    redValueSpan.textContent = redValue;
    greenValueSpan.textContent = greenValue;
    blueValueSpan.textContent = blueValue;


    inputTypeValue.textContent = rgbColor;


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

function copyToClipboard(){

    const redValue = redSlider.value;
    const greenValue = greenSlider.value;
    const blueValue = blueSlider.value;

    const rgbColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;

    navigator.clipboard.writeText(rgbColor)

    .then(()=>{
        alert("RGB color value copied to clipboard: " + rgbColor);
    })
    .catch((error)=>{
        console.error("Failded to copy RGB values",error);
    });
}
