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
    stars.style.top = Math.random() * 300 + 'vh'; 
    stars.style.animationDuration = Math.random() * 10 + 2 + 's';
    // stars.style.animationDelay = Math.random() * 2 + 's'; //buggt met de animatie

    const starSize = Math.random() * 4  + 0.1; 
    stars.style.width = starSize + 'px';
    stars.style.height = starSize + 'px';

    document.body.appendChild(stars);
}



/// ------ Muziek afspelen ------ ///

const playButton = document.getElementById("playButton");
const vinyl = document.getElementById("vinyl");
const canvas = document.getElementById("visualizer");
const canvasContext = canvas.getContext("2d");

const audio = new Audio("audio/Highway.mp3");
audio.id = "audio";

visualizeAudio();

let isPlaying = false;

playButton.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playButton.textContent = "Play";
    vinyl.classList.remove("rotate");
  } else {
    audio.play();
    playButton.textContent = "Pause";
    vinyl.classList.add("rotate");
  }
  isPlaying = !isPlaying;
});


/// ------ visualizer ------ ///
/// ------ Gedaan met AI, dit werd anders veel te ingewikkeld qua wiskunde voor mij. lol 
/// ------ (ik had de code hierboven geupload) 
///  Prompt: is het moeilijk om een audio visualizer hierbij te maken? ------ ///


function visualizeAudio() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
  
    source.connect(analyser);
    analyser.connect(audioContext.destination);
  
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
  
    function draw() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
  
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  
      analyser.getByteFrequencyData(dataArray);
  
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = canvas.width / 4;
  
      for (let i = 0; i < bufferLength; i++) {
        const angle = (i / bufferLength) * Math.PI * 2.9 - Math.PI / 2;
  
        const barHeight = dataArray[i] / 2;
  
        const xStart = centerX + Math.cos(angle) * radius;
        const yStart = centerY + Math.sin(angle) * radius;
        const xEnd = centerX + Math.cos(angle) * (radius + barHeight);
        const yEnd = centerY + Math.sin(angle) * (radius + barHeight);
  
        canvasContext.beginPath();
        canvasContext.moveTo(xStart, yStart);
        canvasContext.lineTo(xEnd, yEnd);
        // canvasContext.strokeStyle = `hsl(${(i / bufferLength) * 360}, 100%, 70%)`;
        canvasContext.strokeStyle = 'rgb(159, 32, 37)'; // donkerrood


        canvasContext.lineWidth = 7;
        canvasContext.stroke();
      }
  
      requestAnimationFrame(draw);
    }
  
    audioContext.resume().then(draw);
  }