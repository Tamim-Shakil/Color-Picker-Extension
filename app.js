// TODO : Sellect all selectors -Done
// TODO : Make Pick color btn functional  -Done
// TODO : Make Copy color functional  -Done
// TODO : SHOW color on the DOM
// TODO : Local Storage
// TODO : Clear button to clear all the previous colors

// Selectors
const colorPickerBtn = document.getElementById("color-picker");
const clearAll = document.querySelector(".clear-all");
const colorList = document.querySelector(".all-colors");
// let pickedColors = [];
// Step 05
let pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");

// Step 01

const activateEyeDropper = async () => {
  try {
    const eyeDropper = new EyeDropper();
    console.log(eyeDropper);
    // const test = eyeDropper.open();
    // console.log(test);
    const colorCode = await eyeDropper.open();
    console.log(colorCode.sRGBHex);
    // Copy to clipboard
    navigator.clipboard.writeText(colorCode.sRGBHex);
    // Sending the new color code to tha Array
    pickedColors.push(colorCode.sRGBHex);
    showColor();

    // Step 04
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    // console.log(pickedColors);
  } catch (error) {
    alert("Failed");
  }
};

// Step 02

const showColor = () => {
  if (pickedColors.length > 0) {
    document.querySelector(".picked-colors").computedStyleMap.display = "block";
    colorList.innerHTML = pickedColors
      .map(
        (color) => `
    <li class="color">
    <span class="rect" style="background-color:${color}"></span>
    <span class="value hex">${color}</span>
   </li>
   `
      )
      .join("");

    // Step 07 (Copy Color)
    let colors = document.querySelectorAll(".color");
    console.log(colors);
    colors.forEach((li) => {
      li.addEventListener("click", (e) => {
        let color = e.target.innerText;
        navigator.clipboard.writeText(color);
        e.target.innerText = "Copied";

        // Set color to the initial stage
        setTimeout(() => (e.target.innerText = color), 1000);
      });
    });
  } else {
    document.querySelector(".picked-colors").computedStyleMap.display = "none";
    colorList.innerHTML = "<li>No Color Found</li>";
  }
};

// Step 03
const clearListOfColors = () => {
  colorList.innerHTML = "";

  // Step 06
  pickedColors.length = 0;
  localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
  document.querySelector(".picked-colors").computedStyleMap.display = "none";
};

// Activate color picker
colorPickerBtn.addEventListener("click", activateEyeDropper);
// Call clear function
clearAll.addEventListener("click", clearListOfColors);
// Show color by default
showColor();
