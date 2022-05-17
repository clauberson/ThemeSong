import { analyser, dataArray, bufferLength } from '../';

let tsvisualizercanvas;
let tsvisualizercontainer;
let ctx;
let isPlaying = false;

export function setUp() {
  isPlaying = true;
  // Get a canvas defined with ID "oscilloscope"
  let ytmusicplayer = document.querySelector("ytmusic-player")
  tsvisualizercanvas = document.getElementById("ts-visualizer-canvas");

  ytmusicplayer.appendChild(document.createElement('div')).id = 'ts-visualizer-container';
  tsvisualizercontainer = document.getElementById("ts-visualizer-container");
  tsvisualizercontainer.style.position = "absolute";
  tsvisualizercontainer.style.height = "45%";
  tsvisualizercontainer.style.width = "100%";
  tsvisualizercontainer.style.bottom = "5%";
  tsvisualizercontainer.style.left = "0";
  tsvisualizercontainer.style.background = "linear-gradient(0deg, transparent 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.5) 50%,  rgba(0,0,0,0.4) 70%, transparent 100%)";

  if (!tsvisualizercanvas) {
    ytmusicplayer.appendChild(document.createElement('canvas')).id = 'ts-visualizer-canvas';
  }

  tsvisualizercanvas = document.getElementById("ts-visualizer-canvas");

  tsvisualizercanvas.style.position = "absolute";
  tsvisualizercanvas.style.height = "45%";
  tsvisualizercanvas.style.width = "100%";
  tsvisualizercanvas.style.bottom = "5%";
  tsvisualizercanvas.style.left = "0";
  tsvisualizercanvas.style.zIndex = '1';
  // tsvisualizercanvas.style.border = "2px solid tomato";
  tsvisualizercanvas.height = '256';
  tsvisualizercanvas.width = '1100';


  //set up data for visualizer
  ctx = tsvisualizercanvas.getContext("2d");

  ctx.lineWidth = 5;
  ctx.strokeStyle = '#ffffff';
}

export function drawOscilloscope() {
  analyser.getByteTimeDomainData(dataArray);

  ctx.clearRect(0, 0, tsvisualizercanvas.width, tsvisualizercanvas.height);

  ctx.beginPath();

  let sliceWidth = tsvisualizercanvas.width * 1.0 / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    let v = dataArray[i] / 128;
    let y = v * tsvisualizercanvas.height / 2;
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  ctx.lineTo(tsvisualizercanvas.width, tsvisualizercanvas.height / 2);
  ctx.stroke();

  // requestAnimationFrame(drawOscilloscope);

  if (isPlaying) {
    setTimeout(() => {
      requestAnimationFrame(drawOscilloscope);
    }, 16);
  }
}

function animate() {
  isPlaying = true;
  drawOscilloscope();
}

function stopAnimate() {
  isPlaying = false;
}

function cleanUp() {
  tsvisualizercanvas.remove();
  tsvisualizercontainer.remove();
}

export const wavy = {
  setUp,
  animate,
  stopAnimate,
  cleanUp
};