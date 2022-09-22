import React from 'react';
import { createRoot } from 'react-dom/client';
import Panel from './Panel';
import { store } from '../store';
import { Provider  } from 'react-redux';

function PanelContainer() {
  React.useEffect(() => {
    const middleControlButtonsDiv = document.querySelector(".middle-controls-buttons");
    let panelContainer;
  
    panelContainer = document.createElement('div');
    panelContainer.id = "ts-panel-container";
  
    if (document.getElementById("ts-panel-container") === null) {
      middleControlButtonsDiv.append(panelContainer);
    } else {
      document.getElementById("ts-panel-container").remove();
      middleControlButtonsDiv.append(panelContainer);
    }
  
    const root = createRoot(panelContainer)
    root.render(<Provider store={store}><Panel /></Provider>)
  }, [])

  return null;
}

export default PanelContainer;

