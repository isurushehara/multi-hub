const redSlider = document.getElementById("redSlider");
const greenSlider = document.getElementById("greenSlider");
const blueSlider = document.getElementById("blueSlider");


const redvalueSpan = document.getElementById("redValue");
const greenvalueSpan = document.getElementById("greenValue");
const bluevalueSpan = document.getElementById("blueValue");

const colorBox = document.getElementById("color-box");
const copyButton = document.getElementById("copyButton");
const inputypeRGBValue = document.getElementById("inputType");

redSlider.addEventListener('input',updateColor);
greenSlider.addEventListener('input',updateColor);
blueSlider.addEventListener('input',updateColor);
copyButton.addEventListener('click',inputType);

function updateColor(){
    const redValue = redSlider.value;
    const greenValue = greenSlider.value;
    const blueValue = blueSlider.value;

    const rbgColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
    //console.log(rbgColor);

    colorBox.style.backgroundColor = rbgColor;


    redvalueSpan.textContent = redValue;
    greenvalueSpan.textContent = greenValue;
    bluevalueSpan.textContent = blueValue;


    inputType.textContent = rbgColor;




}


updateColor();


function copyButton1(){

    const redValue = redSlider.value;
    const greenValue = greenSlider.value;
    const blueValue = blueSlider.value;

    const rbgColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;

    navigator.clipboard.writeText(rbgColor)

    .then(()=>{
        alert("RGB color value copied to clipboard: " + rbgColor);
    })
    .catch((error)=>{
        console.error("Failded to copy RGB values",error);
    });
}