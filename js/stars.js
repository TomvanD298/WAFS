const numberOfStars = 1000;

for (let i = 0; i < numberOfStars; i++) {
    const stars = document.createElement('div');
    stars.className = 'stars';
    stars.style.left = Math.random() * 100 + 'vw'; 
    stars.style.top = Math.random() * 280 + 'vh'; 
    stars.style.animationDuration = Math.random() * 10 + 2 + 's';

    const starSize = Math.random() * 4  + 0.1; 
    stars.style.width = starSize + 'px';
    stars.style.height = starSize + 'px';

    document.body.appendChild(stars);
}