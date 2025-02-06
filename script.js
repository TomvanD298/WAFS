const fetched = await fetch('https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"CMD%20Minor%20Web%20Dev"}}}},{"squads":{"squad_id":{"cohort":"2425"}}}, {"id":224 }]}');
const derulo = await fetched.json();

const template = document.querySelector('template');
const result = document.querySelector('#result');
const engine = new liquidjs.Liquid();

engine.parseAndRender(template.innerHTML, {persons: derulo.data}).then(html => result.innerHTML = html);


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
