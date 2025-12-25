

const totalElement = document.querySelectorAll('.slide_show_element');

let counter = 1;

setInterval(() => {

    counter++;
    let currentElement = document.querySelector('.current');

    currentElement.classList.remove("current");

    if( counter > totalElement.length ){
        totalElement[0].classList.add("current");
        counter = 1;
    }else{
        currentElement.nextElementSibling.classList.add("current");
    }

    
}, 1000);