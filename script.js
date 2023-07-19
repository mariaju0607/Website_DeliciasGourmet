const main = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const primeiraLargura = carousel.querySelector(".card").offsetWidth;
const setas = document.querySelectorAll(".wrapper i");
const cards = [...carousel.children];

let iniciarPlayAutomatico = true, startX, startScrollLeft, idTimeout;

// Quantidade de cards
let qtdCards = Math.round(carousel.offsetWidth / primeiraLargura);

// Repopulando cards
cards.slice(-qtdCards).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

cards.slice(0, qtdCards).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Ajuste para Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Setas devem mover o carousel
setas.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -primeiraLargura : primeiraLargura;
    });
});

const scrollInfinito = () => {
    // Se está no começo, ir ao final
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }

    // Se está no final, ir ao começo
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(idTimeout);
    if(!main.matches(":hover")) playAutomatico();
}

const playAutomatico = () => {
    if(window.innerWidth < 800 || !iniciarPlayAutomatico) return;
    idTimeout = setTimeout(() => carousel.scrollLeft += primeiraLargura, 2500);
}

playAutomatico();

carousel.addEventListener("scroll", scrollInfinito);
main.addEventListener("mouseenter", () => clearTimeout(idTimeout));
main.addEventListener("mouseleave", playAutomatico);