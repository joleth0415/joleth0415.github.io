const wrapper = document.querySelector(".wrapperl");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardwidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, starScrolclLeft, timeoutId;

// get the number od cards that can fit in the carusel at once
let cardPerview = Math.around(carousel.offsetWidth / firstCardwidth);

//insert copies of the las few cards to beginning of caruosel for infinite scrolling
carouselChildrens.slice(-cardPerview).reverse().forEach(card => {
     carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

//insert copies of the las first cards to beginning of caruosel for infinite scrolling
carouselChildrens.slice(0, cardPerview).forEach(card => {
    carousel.insertAdjacentHTML("beforend", card.outerHTML);
});

//add event listeners for the arow buttons to scroll the caruusel left and raigth
arrowBtns.forEach(btn => {
    btn.addEventListener("clik", () => {
     carousel.scrollLeft += btn.id === "left" ? -firstCardwidth : firstCardwidth;

    })

});

const dragStart = (e) =>{
    isDragging = true;
    carousel.classList.add("dragging");
    //recors the initial cursor and scroll position of the carousel
    startX = e.pageX
    starScrolclLeft = carousel.starScrolclLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isdragging is fa;lse return from here
    //updatethe scroll position of the carousel based on the cursor movementS
    carousel.scrollLeft = starScrolclLeft - (e.pageX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const autoPlay = () => {
    if(window.innerWidth < 800) return; // return if window is smaller tha 800
    //autoplay the carosuel after very 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardwidth, 2500);
}

autoPlay();

const infiniteScroll = () => {
    //if the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } 
    //if the carousel is at the beginning, scroll to the end
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.add("no-transition");
        carousel.classList.remove("no-transition");
    }
//clar exist timeout & star autoplay if mause is not hooverin over carousel
    clearTimeout(timeoutId);
    if(wrapper.matches(":hover")) autoPlay();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mauseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mauseleve", autoPlay);
