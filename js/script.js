/// ------ Play the music ------ ///

const playButton = document.getElementById("playButton");
const easterEgg = document.querySelector(".easterEgg");
const vinyl = document.getElementById("vinyl");
const needle = document.getElementById("needle")
const canvas = document.getElementById("visualizer");
const canvasContext = canvas.getContext("2d");

const highwayAudio = new Audio("./audio/Highway.mp3");
const eaAudio = new Audio("./audio/Great.mp3");

const vinylImg = document.getElementById("vinyl");


let current = highwayAudio;

easterEgg.addEventListener("click", () => {
  if (current == eaAudio) {
    current = highwayAudio;
    vinylImg.src = "../imgs/vinyl.png";
    console.log("Highway");
  } else {
    current = eaAudio;
    vinylImg.src = "../imgs/show.png";
    console.log("Show");
  }
});

let isPlaying = false;

playButton.addEventListener("click", () => {
  if (isPlaying) {
    highwayAudio.pause();
    eaAudio.pause();
    playButton.textContent = "Play";
    vinyl.classList.remove("rotate");
    needle.classList.remove("needleDrop");
    needle.classList.add("needleUp");
    console.log("speelt niet af");
  } else {
    current.play();
    playButton.textContent = "Pause";
    vinyl.classList.add("rotate");
    needle.classList.remove("needleUp");
    needle.classList.add("needleDrop");
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

  let lightBlue = 'rgb(32, 203, 229)';
  let lightRed = 'rgb(159, 32, 37)';

  let currentColor

  if(current = highwayAudio ) {
    currentColor = lightRed
  } else {
    currentColor = lightBlue
  }

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
      canvasContext.strokeStyle = lightRed;
      canvasContext.lineWidth = 7;
      canvasContext.stroke();
    }

    requestAnimationFrame(draw);
  }

  audioContext.resume().then(draw);
}