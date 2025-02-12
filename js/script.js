/// ------ Play the music ------ ///
const playButton = document.getElementById("playButton");
const easterEgg = document.querySelector(".easterEgg");
const vinyl = document.getElementById("vinyl");
const needle = document.getElementById("needle");
const canvas = document.getElementById("visualizer");
const canvasContext = canvas.getContext("2d");

const highwayAudio = new Audio("./audio/Highway.mp3");
const eaAudio = new Audio("./audio/Great.mp3");
let current = highwayAudio;

const vinylImg = document.getElementById("vinyl");

let isPlaying = false;
let audioContext;
let analyser;
let sourceNodes = new Map(); 

function setupAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
  }

  if (!sourceNodes.has(current)) {
    const sourceNode = audioContext.createMediaElementSource(current);
    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
    sourceNodes.set(current, sourceNode); 
  }
}

//Easteregg swap song

easterEgg.addEventListener("click", () => {
  if (current === eaAudio) {
    current.pause();  
    current = highwayAudio;
    vinylImg.src = "./imgs/vinyl.png";
  } else {
    current.pause();  
    current = eaAudio;
    vinylImg.src = "./imgs/show.png";
  }

  if (isPlaying) {
    current.play();
    visualizeAudio();
  }
});

//Click on the button to play or pause the song

playButton.addEventListener("click", () => {
  if (isPlaying) {
    current.pause();
    playButton.classList.remove("pause");
    playButton.classList.add("play");
    vinyl.classList.remove("rotate");
    needle.classList.remove("needleDrop");
    needle.classList.add("needleUp");
  } else {
    setupAudioContext();
    current.play();
    playButton.classList.remove("play");
    playButton.classList.remove("zero");
    playButton.classList.add("pause");
    vinyl.classList.add("rotate");
    needle.classList.remove("needleUp");
    needle.classList.add("needleDrop");
    visualizeAudio();
  }
  isPlaying = !isPlaying;
});



/// ------ Visualizer ------ ///
/// ------ Done with AI, math is to hard for me lol.
/// ------ (I uploaded the code above in GPT) 
///  Prompt: is het moeilijk om een audio visualizer hierbij te maken? ------ ///

function visualizeAudio() {
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
      canvasContext.strokeStyle =`hsl(${(i / bufferLength) * 360}, 100%, 50%)`; 
      canvasContext.lineWidth = 10;
      canvasContext.stroke();
    }

    requestAnimationFrame(draw);
  }

  audioContext.resume().then(draw);
}
