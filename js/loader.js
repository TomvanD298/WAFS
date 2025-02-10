const rocket = document.querySelector('.rocket');
const loader = document.querySelector('.loader');


rocket.style.animation = "slide-top 1s ease-in-out alternate 6 forwards";

rocket.addEventListener('animationend', () => {
    rocket.style.animation = "slide-out-blurred-right 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) forwards";
  
    setTimeout(() => {
        loader.style.animation = "slide-out-blurred-right 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) forwards";
    }, 450);
});

const numberOfStars = 1000;

for (let i = 0; i < numberOfStars; i++) {
    const stars = document.createElement('div');
    stars.className = 'stars';
    stars.style.left = Math.random() * 100 + 'vw'; 
    stars.style.top = Math.random() * 300 + 'vh'; 
    stars.style.animationDuration = Math.random() * 10 + 2 + 's';

    const starSize = Math.random() * 4  + 0.1; 
    stars.style.width = starSize + 'px';
    stars.style.height = starSize + 'px';

    document.body.appendChild(stars);
}