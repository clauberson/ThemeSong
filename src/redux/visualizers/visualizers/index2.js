import { store } from '../redux/store';

import { wavy } from './wavy/wavy';
import { bars } from './bars/bars';
import { circles } from './circles/circles';
// import { addPlayPageVisibilityObserver, removePlayPageVisibilityObserver } from './modules/addPlayPageVisibilityObserver';
import { addPlayPauseChangeObserver, removePlayPauseChangeObserver } from './modules/addPlayPauseChangeObserver'

export let source;
export let audioCtx;
export let analyser;
export let bufferLength;
export let dataArray;

export let activeVisualizer = store.getState().visualizers.activeVisualizer;
export let visualizers = store.getState().visualizers.visualizers;

let isVisualizerOn = false;
let videoElementNode;


let currentValue;
function handleChange() {
  let previousValue = currentValue
  currentValue = store.getState().visualizers;

  if (previousValue.activeVisualizer !== currentValue.activeVisualizer) {
    console.log(
      'Some deep nested property changed from',
      previousValue.activeVisualizer,
      'to',
      currentValue.activeVisualizer
    )
    switchActiveVisualizer(currentValue.activeVisualizer);
  }

  if (previousValue.visualizers !== currentValue.visualizers) {
    console.log(
      'Some deep nested property changed from',
      previousValue.visualizers,
      'to',
      currentValue.visualizers
    )
    if (currentValue.activeVisualizer === "visualizerId:0") {
      wavy.stopAnimate();
      wavy.cleanUp();
    } else if (currentValue.activeVisualizer === "visualizerId:1") {
      setTimeout(() => {
        bars.stopAnimate();
        bars.cleanUp();
        setTimeout(() => {
          bars.setUp();
          bars.animate();
        }, 40);
      }, 40);
    } else if (currentValue.activeVisualizer === "visualizerId:2") {
      setTimeout(() => {
        circles.stopAnimate();
        circles.cleanUp();
        setTimeout(() => {
          circles.setUp();
          circles.animate();
        }, 40);
      }, 40);
    } else {
      bars.stopAnimate();
      bars.cleanUp();
      circles.stopAnimate();
      circles.cleanUp();
    }
  }
}

const unsubscribe = store.subscribe(handleChange)
/*
store.subscribe(() => {
  console.log(`visualizers Index. store changed`);
  // console.log(message);
  // let messageKey = Object.keys(message)[0];
  // console.log(messageKey)



  let visualizersState = store.getState().visualizers;
  console.log(visualizersState);
  // switch (messageKey) {
  //   case "activeVisualizer":
  //     console.log('case activeVisualizer');
  //     activeVisualizer = message[messageKey];
  //     switchActiveVisualizer(activeVisualizer);
  //     break;

  //   case "visualizers":
  //     console.log('received visualizers');
  //     console.log(message[messageKey]);
  //     visualizers = message[messageKey];
  //     if (activeVisualizer === "visualizerId:0") {
  //       wavy.stopAnimate();
  //       wavy.cleanUp();
  //     } else if (activeVisualizer === "visualizerId:1") {
  //       setTimeout(() => {
  //         bars.stopAnimate();
  //         bars.cleanUp();
  //         setTimeout(() => {
  //           bars.setUp();
  //           bars.animate();
  //         }, 40);
  //       }, 40);
  //     } else if (activeVisualizer === "visualizerId:2") {
  //       setTimeout(() => {
  //         circles.stopAnimate();
  //         circles.cleanUp();
  //         setTimeout(() => {
  //           circles.setUp();
  //           circles.animate();
  //         }, 40);
  //       }, 40);
  //     } else {
  //       bars.stopAnimate();
  //       bars.cleanUp();
  //       circles.stopAnimate();
  //       circles.cleanUp();
  //     }
  //     sendResponse('received visualizers');
  //     break;
      
  //   default:
  //     console.log('default visualizer message')
  // }
});
*/
function switchActiveVisualizer(activeVisualizer) {
  console.log(activeVisualizer);
  try {
    wavy.cleanUp();
    wavy.stopAnimate();
  } catch {}
  try {
    bars.cleanUp();
    bars.stopAnimate();
  } catch {}
  try {
    circles.cleanUp();
    circles.stopAnimate();
  } catch {}
  if (isVisualizerOn) {
    setTimeout(() => {
      if (activeVisualizer === "visualizerId:0") {
        wavy.setUp();
        wavy.animate();
      } else if (activeVisualizer === "visualizerId:1") {
        bars.setUp();
        bars.animate();
      } else if (activeVisualizer === "visualizerId:2") {
        circles.setUp();
        circles.animate();
      } else {
        console.log('switchActiveVisualizer active visualizerId not recognized. Stopping all visualizers.')
        try {
          wavy.cleanUp();
          wavy.stopAnimate();
        } catch {}
        try {
          bars.cleanUp();
          bars.stopAnimate();
        } catch {}
        try {
          circles.cleanUp();
          circles.stopAnimate();
        } catch {}
      }
    }, 40);
  }
  setTimeout(() => {
    connectAudio();
  }, 100);
}

export function addVisualizerButton() {
  let topRowButtons = document.querySelector('.top-row-buttons');
  let button = document.createElement('span');
  button.id = "ts-visualizer-toggle";
  button.innerText = "🥽 OFF";
  button.style.border = "0";
  button.style.height = "30px";
  button.style.width = "60px";
  button.style.backgroundColor = "transparent";
  button.style.fontSize = "17px";
  button.style.padding = "9px 2px";
  button.style.cursor = "pointer";
  button.title = "Turn ON Visualizer";
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    handleVisualizerButtonClick();
  });


  //when script is executed, it adds a new updated button (in case there's updated logic)
  if (document.getElementById("ts-visualizer-toggle") === null) {
    topRowButtons.prepend(button);
  } else {
    document.getElementById("ts-visualizer-toggle").remove();
    topRowButtons.prepend(button);
  }
}

function handleVisualizerButtonClick() {
  if (!isVisualizerOn) {
    isVisualizerOn = true;
    document.getElementById("ts-visualizer-toggle").innerText = "🥽 ON";
    document.getElementById("ts-visualizer-toggle").title = "Turn OFF Visualizer";
    addPlayPauseChangeObserver();
    // addPlayPageVisibilityObserver();
    if (activeVisualizer === "visualizerId:0") {
      wavy.setUp();
    } else if (activeVisualizer === "visualizerId:1") {
      bars.setUp();
    } else {
      circles.setUp();
    }
    connectAudio();
    console.log(analyser);
    console.log(dataArray);
    console.log(bufferLength);
    if (activeVisualizer === "visualizerId:0") {
      wavy.animate();
    } else if (activeVisualizer === "visualizerId:1") {
      bars.animate();
    } else {
      circles.animate();
    }
    console.log(audioCtx);
    console.log(analyser);
  } else {
    isVisualizerOn = false;
    document.getElementById("ts-visualizer-toggle").innerText = "🥽 OFF";
    document.getElementById("ts-visualizer-toggle").title = "Turn ON Visualizer";
    removePlayPauseChangeObserver();
    // removePlayPageVisibilityObserver();
    if (activeVisualizer === "visualizerId:0") {
      wavy.stopAnimate();
      wavy.cleanUp();
    } else if (activeVisualizer === "visualizerId:1") {
      bars.stopAnimate();
      bars.cleanUp();
    } else if (activeVisualizer === "visualizerId:2") {
      circles.stopAnimate();
      circles.cleanUp();
    } else {
      circles.stopAnimate();
      circles.cleanUp();
    }
    console.log(audioCtx);
    console.log(analyser);
  }
}


export function connectAudio() {
  console.log('connectAudio()')
  if (audioCtx === undefined) {
    console.log('audioCtx is undefined')
    audioCtx = new AudioContext();
    console.log(audioCtx);
    analyser = audioCtx.createAnalyser();
  } 
  if (activeVisualizer === "visualizerId:0") {
    analyser.fftSize = 2048;
  } else if (activeVisualizer === "visualizerId:1") {
    analyser.fftSize = 2048;
  } else if (activeVisualizer === "visualizerId:2") {
    analyser.fftSize = 512;
  } else {
    analyser.fftSize = 2048;
  }
  analyser.maxDecibels = -18;
  analyser.smoothingTimeConstant = 0.8;
  
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteTimeDomainData(dataArray);
  
  connectSource();

  analyser.connect(audioCtx.destination);  
}


export function connectSource() {
  console.log('connectsource()')
  console.log(source)
  videoElementNode = document.querySelector('video');

  try {
    source = audioCtx.createMediaElementSource(videoElementNode);
    source.connect(analyser);
  } catch {
    // source = audioCtx.createMediaElementSource(document.querySelector('audio'));
    // source.connect(analyser);
    console.log('hi');
  }
  // source = audioCtx.createMediaElementSource(document.querySelector('video'));
  // source.connect(analyser);

  // source = audioCtx.createMediaElementSource(videoElementNode);
  // source.connect(analyser);
}
