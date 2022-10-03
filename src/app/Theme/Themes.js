import React from 'react';
import { useStore } from '../store';

import Off from './themes/Off/Off';
import Dynamic from './themes/Dynamic/Dynamic';
import Static from './themes/Static/Static';

function Themes() {
  const activeTheme = useStore(state => state.theme.activeTheme);

  function returnTheme() {
    switch (activeTheme) {
      case "themeId:0":
        return <Off />
      case "themeId:6":
        return <Dynamic />
      case "themeId:7":
        return <Static />
      default:
        return <Dynamic />
    }
  }

  return (
    <div id="ThemeSong-Themes">{returnTheme()}</div>
  )
}

export default Themes;