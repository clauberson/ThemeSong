import { useStore } from '../../../store';
import { css } from '@emotion/react';
import VariantButton from '../components/VariantButton';

import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';

const StyledSlider = styled(Slider)`
  width: 180px;
  color: royalblue;

  .MuiSlider-thumb {
    color: #fff;
    border: 1px solid #fff;
    width: 14px;
    height: 14px;
  }

  .MuiSlider-thumb::after {
    width: 1px;
    height: 1px;
  }
`;

function BarsSettings() {
  const barsVisualizer = useStore(state => state.visualizer.visualizers.find(visualizer => (visualizer.visualizerId === "visualizerId:1")));
  const barsPrefs = useStore(state => state.visualizer.visualizerPrefs.find(visualizer => (visualizer.visualizerId === "visualizerId:1")));
  const visualizerPrefs = useStore(state => state.visualizer.visualizerPrefs)
  const changeVisualizerPrefs = useStore(state => state.visualizer.changeVisualizerPrefs);

  const handleVisualizersChange = visualizerObject => {
    console.log(visualizerObject);
    let visualizerPrefsCopy = [...visualizerPrefs];
    let newCopy = visualizerPrefsCopy.map(visualizer => {
      if (visualizer.visualizerId === visualizerObject.visualizerId) {
        return visualizerObject;
      } else {
        return visualizer;
      }
    });
    changeVisualizerPrefs(newCopy);
    chrome.storage.local.set({visualizerPrefs: newCopy}, () => console.log('chrome.storage.local.set({visualizerPrefs}'))
  }

  const handleVariantClick = (e, id) => {
    let copy = {...barsPrefs};
    copy.activeVariant = id;
    handleVisualizersChange(copy);
  }

  const handleBarSettingsChange = (e, id) => {
    let copy = {...barsPrefs};
    copy[e.target.name] = Number(e.target.value);
    console.log(copy);
    handleVisualizersChange(copy);
  }

  if (!barsVisualizer) {
    return <h1>hi</h1>
  } else {
    return (
      <div
        css={css`
          .MuiSlider-root {
            padding: 0;
          }
        `}
      >
        <h2 css={css`color: #ff3232; font-size: 16px; margin-bottom: 4px;`}>Visualizer: Bars</h2>
        <div>
          <form onSubmit={e => e.preventDefault()}>
            <div style={{display: 'flex', justifyContent: 'space-between', height: '21px'}}>
              <label htmlFor="barWidth">Bar Width:</label>
              <div style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
                <StyledSlider name="barWidth" value={barsPrefs.barWidth} onChange={handleBarSettingsChange} step={5} min={5} max={80} />
                <input type="number" min="5" max="80" name="barWidth" value={barsPrefs.barWidth} onChange={handleBarSettingsChange} style={{maxWidth: '40px', backgroundColor: 'inherit', border: 0, borderBottom: '1px solid black', color: 'white', marginLeft: '8px'}} />
              </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', height: '21px'}}>
              <label htmlFor="borderWidth">Border Width:</label>
              <div style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
                <StyledSlider name="borderWidth" value={barsPrefs.borderWidth} onChange={handleBarSettingsChange} step={1} min={0} max={10} />
                <input type="number" min="0" max="10" name="borderWidth" value={barsPrefs.borderWidth} onChange={handleBarSettingsChange} style={{maxWidth: '40px', backgroundColor: 'inherit', border: 0, borderBottom: '1px solid black', color: 'white', marginLeft: '8px'}} />
              </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', height: '21px'}}>
              <label htmlFor="gap">Gap Width:</label>
              <div style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
                <StyledSlider name="gap" value={barsPrefs.gap} onChange={handleBarSettingsChange} step={2} min={0} max={20} />
                <input type="number" min="0" max="20" name="gap" value={barsPrefs.gap} onChange={handleBarSettingsChange} style={{maxWidth: '40px', backgroundColor: 'inherit', border: 0, borderBottom: '1px solid black', color: 'white', marginLeft: '8px'}} />
              </div>
            </div>
          </form>
          <p style={{marginBottom: '6px'}}>Style Variant:</p>
          <div 
            className="VariantsContainer" 
            css={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridAutoRows: '1fr',
              gap: '10px'
            }}
          >
            {barsVisualizer.variants.map(variant => (
              <VariantButton
                key={variant.variantId} 
                id={variant.variantId} 
                onClick={e => handleVariantClick(e, variant.variantId)}
                isActive={variant.variantId === barsPrefs.activeVariant}
                name={variant.name}
              />
            ))}
          </div>  
        </div>
      </div>
    )   
  }
}

export default BarsSettings;