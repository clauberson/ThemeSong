import React from 'react';
import { static_light_css } from './static-light-css';
import { useStore } from '../../../../store';

function StaticLight({processColors}) {
  const staticLightPrefs = useStore(state => state.theme.themes.find(theme => (theme.themeId === "themeId:7")).userPrefs.lightPrefs);

  React.useEffect(() => {
    processColors(staticLightPrefs);

    //apply dark logo on load
    document.querySelectorAll("ytmusic-nav-bar #left-content picture source")[1].srcset = chrome.runtime.getURL("/assets/images/dark_youtube_music_logo_themesong_mod.svg")
    document.querySelector("ytmusic-nav-bar #left-content picture img").src = chrome.runtime.getURL("/assets/images/dark_youtube_music_logo_themesong_mod.svg")

    //remove dark logo on unload
    return function() {
      document.querySelectorAll("ytmusic-nav-bar #left-content picture source")[1].srcset = "//music.youtube.com/img/on_platform_logo_dark.svg";
      document.querySelector("ytmusic-nav-bar #left-content picture img").src = "//music.youtube.com/img/on_platform_logo_dark.svg";
    }
  }, [])

  React.useEffect(() => {
    processColors(staticLightPrefs);
  }, [staticLightPrefs])
  
  return <style id="StaticLight">{static_light_css}</style>
}

export default StaticLight;

