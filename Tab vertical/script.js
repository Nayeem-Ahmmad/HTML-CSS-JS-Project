

function showTab(event, tab){
    let tabs = document.getElementsByClassName("tab");
    for( let i = 0; i < tabs.length; i++ ){
        tabs[i].style.display = "none";
    }
    let buttonLink = document.getElementsByClassName("buttonLink");
    for( let i = 0; i < buttonLink.length; i++ ){
        buttonLink[i].className = buttonLink[i].className.replace(" active", "");
    }
    document.getElementById(tab).style.display = "block";
    event.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();