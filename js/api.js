const fetched = await fetch('https://fdnd.directus.app/items/person/?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"CMD%20Minor%20Web%20Dev"}}}},{"squads":{"squad_id":{"cohort":"2425"}}}, {"id":224 }]}');
const derulo = await fetched.json();

const template = document.querySelector('template');
const result = document.querySelector('#result');
const engine = new liquidjs.Liquid();

engine.parseAndRender(template.innerHTML, {persons: derulo.data}).then(html => result.innerHTML = html);