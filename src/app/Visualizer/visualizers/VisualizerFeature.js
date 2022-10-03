import React from 'react';
import { createRoot } from 'react-dom/client';

import VisualizerToggleButton from './components/VisualizerToggleButton';
import Visualizer from './Visualizer';

function addVisualizerContainer() {
  let ytmusicplayer = document.querySelector("ytmusic-player")
  let tsvisualizercontainer;

  /* if i want to do the audioCtx.close() trick in Visualizer.js, i have to
    comment out or remove the following 3 lines. */
  if (document.getElementById("ts-visualizer-container")) {
    document.getElementById("ts-visualizer-container").remove();
  }

  ytmusicplayer.appendChild(document.createElement('div')).id = 'ts-visualizer-container';
  tsvisualizercontainer = document.getElementById("ts-visualizer-container");
  tsvisualizercontainer.style.borderRadius = "inherit";
  // tsvisualizercontainer.style.border = "1px solid lightgreen";

  if (!tsvisualizercontainer) {
    ytmusicplayer.appendChild(document.createElement('canvas')).id = 'ts-visualizer-canvas';
  }

  ytmusicplayer.append(tsvisualizercontainer);

  const root = createRoot(tsvisualizercontainer)
  root.render(<Visualizer />)
}

function addVisualizerButton() {
  const topRowButtons = document.querySelector('.top-row-buttons');
  let visualizerDivContainer;

  if (document.getElementById("visualizerDivContainer")) {
    document.getElementById("visualizerDivContainer").remove();
  }

  visualizerDivContainer = document.createElement("span");
  visualizerDivContainer.id = "visualizerDivContainer";

  topRowButtons.prepend(visualizerDivContainer);

  const root = createRoot(visualizerDivContainer)
  root.render(<VisualizerToggleButton />)
}


function VisualizerFeature() {
  React.useEffect(() => {
    addVisualizerContainer();
    addVisualizerButton();
  }, []);

  return <div id="ThemeSong-Visualizer"></div>
}

export default VisualizerFeature;