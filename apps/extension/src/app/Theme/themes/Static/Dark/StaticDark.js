import { useEffect } from "react";
import { useStore } from "/src/app/store";
import { menubar } from "../../../selectors";
import { scrollbars } from "../../../css/core/scrollbars";
import { playerbar_progressbar } from "../../../css/core/playerbar_progressbar";
import { backgrounds } from "../../../css/core/backgrounds";
import { song_image } from "../../../css/extra/song_image";
import { misc_style_improvements } from "../../../css/extra/misc_style_improvements";
import { dark_base_colors } from "../../../css/colors/dark_base_colors";
import { icons_buttons } from "../../../css/core/icons_buttons";

function StaticDark() {
  const { hue, saturation, lightness } = useStore(
    (state) => state.theme.prefs["b458eaae-0cbd-4a44-8847-c7a6a6ea1be8"].dark
  );
  const playerUiState = useStore((state) => state.player.playerUiState);

  useEffect(() => {
    if (playerUiState === "PLAYER_PAGE_OPEN") {
      menubar.content = `hsl(${hue}, ${saturation}%, ${lightness[1]}%)`;
    } else {
      menubar.content = `hsl(${hue}, ${saturation}%, ${lightness[0]}%)`;
    }
  }, [hue, saturation, lightness, playerUiState]);

  return (
    <style id="StaticDark">
      {
        /*css*/ `
        ${dark_base_colors}
        ${backgrounds}
        ${scrollbars}
        ${playerbar_progressbar}
        ${song_image}
        ${misc_style_improvements}
        ${icons_buttons}
        
        :root {
          --ts-navbar-color: hsl(${hue}, ${saturation}%, ${lightness[0]}%);
          --ts-playerpage-color: hsl(${hue}, ${saturation}%, ${lightness[1]}%);
          --ts-playerpageavtoggle-color: hsl(${hue}, ${saturation}%, ${Math.max(25, lightness[1]) + 12}%);
          --ts-playerbar-color: hsl(${hue}, ${saturation}%, ${lightness[2]}%);
          --ts-body-color: hsl(${hue}, ${saturation}%, ${lightness[3]}%);
          --ts-body-alpha-gradient-color: hsl(${hue} ${saturation}% ${lightness[3]}% / 80%);
        }
      
      `
      }

      {(playerUiState === "PLAYER_PAGE_OPEN" || playerUiState === "FULLSCREEN") &&
        /* css */ ` 
        :root  {
          --ts-navbar-color: var(--ts-playerpage-color);
          --ts-sidebar-color: var(--ts-playerpage-color);
          --ts-playerbar-color: var(--ts-playerpage-color);
        }
      `}
    </style>
  );
}

export default StaticDark;
