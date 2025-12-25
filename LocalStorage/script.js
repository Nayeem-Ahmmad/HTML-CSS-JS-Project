
// selected element

const currentFontSize = document.querySelector("#fontSize");
const currentColor = document.querySelector("#textColor");
const mainSection = document.querySelector("main");
const resetbtn = document.querySelector(".btn");


const setNewValue = (color, fontSize) =>{
    mainSection.style.fontSize = fontSize;
    mainSection.style.backgroundColor = color;
    currentColor.value = color;
    currentFontSize.value = fontSize;
}

const initialValue = () => {
    let getLocalColor = localStorage.getItem("color");
    let getLocalFont = localStorage.getItem("font");

    if( getLocalColor && getLocalFont ){
        setNewValue(getLocalColor, getLocalFont);
    }else if( !getLocalColor && !getLocalFont ){
        setNewValue("white", "16px");
    }else if( !getLocalColor ){
        setNewValue("white", getLocalFont);
    }else{
        setNewValue(getLocalColor, "16px");
    }

}

// change font size...

const changeFontSize = (event) => {
    const newFontSize = event.target.value;
    mainSection.style.fontSize = newFontSize;
    localStorage.setItem("font", newFontSize);
}

// change color...

const changecolor = (event) => {
    const newColor = event.target.value;
    mainSection.style.backgroundColor = newColor;
    localStorage.setItem("color", newColor);
}

// resetButton..

const resetButton = () => {
    localStorage.removeItem("font");
    localStorage.removeItem("color");
    mainSection.style.fontSize = "16px";
    mainSection.style.backgroundColor = "white";
    currentColor.value = "white";
    currentFontSize.value = "16px";
}

currentFontSize.addEventListener("change", changeFontSize);
currentColor.addEventListener("change", changecolor);
resetbtn.addEventListener("click", resetButton );
initialValue();