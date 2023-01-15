/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import SongPanel from './components/SongPanel';
import VisualizerPanel from './components/VisualizerPanel';
import AppearancePanel from './components/AppearancePanel';
import UtilitiesPanel from './components/UtilitiesPanel';
import UpdatePanel from './components/UpdatePanel';

import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import TuneIcon from '@mui/icons-material/Tune';

import { useStore } from '../store';

function PanelPage() {
  const showUpdateNote = useStore(state => state.extension.showUpdateNote);

  return (
    <div
      css={css`
        padding: 6px;
        background: var(--themesong-playbarbg-color, #222);
        border: 1px solid var(--themesong-base-30-color, rgba(255,255,255,0.2));
        border-radius: 4px;
        backdrop-filter: blur(6px);
        transition: var(--themesong-bgcolor-transition);
        color: var(--themesong-secondary-text-color, #fff);
      `}
    >
      <div css={css`text-align: right;`}>
        <Tooltip title={<p css={css`font-size: 12px;`}>ThemeSong Quick Access Panel</p>}>
          <HelpIcon style={{fontSize: '14px'}} />
        </Tooltip>
      </div>
      <div>
        <SongPanel />
        <AppearancePanel />
        <VisualizerPanel />
        {(process.env.NODE_ENV === 'development') && (
          <UtilitiesPanel />
        )}
        {showUpdateNote && <UpdatePanel />}
      </div>
      <div css={css`text-align: right;`}>
        <Tooltip 
          title={
            <p css={css`font-size: 12px;`}>
              Additional settings and options available through the ThemeSong popup icon on your toolbar.
            </p>
          }
        >
          <TuneIcon style={{fontSize: '16px'}} />
        </Tooltip>
      </div>
    </div>
  )
}

export default PanelPage;