/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import { useStore } from '../../store';

function ThemeButton({theme}) {
  const activeTheme = useStore(state => state.theme.activeTheme);
  const changeActiveTheme = useStore(state => state.theme.changeActiveTheme);

  return (
    <button 
      css={css`
        border-radius: 24px;
        border: 4px solid ${activeTheme === theme.themeId ? '#135eeb' : '#454545'};
        width: 100%;
        min-height: 80px;
        height: 100%;
        background: #111;
        color: white;
        padding: 10px;
        :hover {
          background: ${activeTheme === theme.themeId ? '#111' : '#082a69'};
        }
      `} 
      disabled={activeTheme === theme.themeId}
      onClick={e => {
        changeActiveTheme(theme.themeId);
        chrome.storage.local.set({activeTheme: theme.themeId}, () => console.log('chrome.storage.local.set({activeTheme}'));
      }}
    >
      <h4>{theme.name}</h4>
    </button>
  )
}

export default ThemeButton;


