const fetched = await fetch('https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"CMD%20Minor%20Web%20Dev"}}}},{"squads":{"squad_id":{"cohort":"2425"}}}, {"id":224 }]}');
const derulo = await fetched.json();

const template = document.querySelector('template');
const result = document.querySelector('#result');
const engine = new liquidjs.Liquid();

engine.parseAndRender(template.innerHTML, {persons: derulo.data}).then(html => result.innerHTML = html);


const rocket = document.querySelector('.rocket');
const loader = document.querySelector('.loader');

// Start de eerste animatie op .rocket
rocket.style.animation = "slide-top 1s ease-in-out alternate 6 forwards";

// Wacht tot de heen-en-weer animatie op .rocket klaar is en start dan de tweede animatie
rocket.addEventListener('animationend', () => {
    // Tweede animatie op .rocket
    rocket.style.animation = "slide-out-blurred-right 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) forwards";
    
    // Start de animatie op .loader na een korte vertraging
    setTimeout(() => {
        loader.style.animation = "slide-out-blurred-right 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) forwards";
    }, 450); // Vertraging van 450ms, gelijk aan de duur van de tweede animatie op .rocket
});

const numberOfStars = 1000;

for (let i = 0; i < numberOfStars; i++) {
    const stars = document.createElement('div');
    stars.className = 'stars';
    stars.style.left = Math.random() * 100 + 'vw'; 
    stars.style.top = Math.random() * 100 + 'vh'; 
    stars.style.animationDuration = Math.random() * 10 + 2 + 's';
    // stars.style.animationDelay = Math.random() * 2 + 's'; //buggt met de animatie

    const starSize = Math.random() * 4  + 0.1; 
    stars.style.width = starSize + 'px';
    stars.style.height = starSize + 'px';

    document.body.appendChild(stars);
}

