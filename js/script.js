/// ------ Play the music ------ ///

const playButton = document.getElementById("playButton");
const easterEgg = document.getElementById("easterEgg");
const vinyl = document.getElementById("vinyl");
const canvas = document.getElementById("visualizer");
const canvasContext = canvas.getContext("2d");

const audio = new Audio("./audio/Highway.mp3");
const eaAudio = new Audio("./audio/Great.mp3");


let current = audio;

easterEgg.addEventListener("click", () => {
current = eaAudio;
console.log("liedje geswapt");
});

let isPlaying = false;

playButton.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    current.pause();
    playButton.textContent = "Play";
    vinyl.classList.remove("rotate");
    console.log("speelt niet af");
  } else {
    current.play();
    playButton.textContent = "Pause";
    vinyl.classList.add("rotate");
    console.log("speelt af");
visualizeAudio();

  }
  isPlaying = !isPlaying;
});




/// ------ Visualizer ------ ///
/// ------ Done with AI, math is to hard for me lol.
/// ------ (I uploaded the code above in GPT) 
///  Prompt: is het moeilijk om een audio visualizer hierbij te maken? ------ ///

let audioContext;
let analyser;
let source;

function visualizeAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();

    // Ensure the audio source is connected only once
    source = audioContext.createMediaElementSource(current);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 256;
  }

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
      canvasContext.strokeStyle = 'rgb(159, 32, 37)';
      canvasContext.lineWidth = 7;
      canvasContext.stroke();
    }

    requestAnimationFrame(draw);
  }

  audioContext.resume().then(draw);
}