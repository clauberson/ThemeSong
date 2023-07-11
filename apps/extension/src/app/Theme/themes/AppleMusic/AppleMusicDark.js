import { useEffect } from "react";
import { menubar } from "../../selectors";
import { useStore } from "/src/app/store";
import { dark_base_colors } from "../../css/colors/dark_base_colors";
import { texts } from "../../css/core/texts";
import { icons_buttons } from "../../css/core/icons_buttons";
import { gradients_overlays } from "../../css/core/gradients_overlays";
import { rulers_borders } from "../../css/core/rulers_borders";
import { scrollbars } from "../../css/core/scrollbars";
import { playerbar_progressbar } from "../../css/core/playerbar_progressbar";
import { backgrounds } from "../../css/core/backgrounds";
import { song_image } from "../../css/extra/song_image";
import { misc_style_improvements } from "../../css/extra/misc_style_improvements";
import { zebra_stripes } from "../../css/extra/zebra_stripes";
import { nowplaying_overlay } from "../../css/extra/nowplaying_overlay";
import { frosted_glass } from "../../css/extra/frosted_glass";

function AppleMusicDark() {
  const playerUiState = useStore((state) => state.player.playerUiState);
  const lightVibrantHSL = useStore((state) => state.palette.palette.LightVibrant.hsl);

  useEffect(() => {
    if (playerUiState === "PLAYER_BAR_ONLY" || playerUiState === "MINIPLAYER" || playerUiState === "INACTIVE") {
      menubar.content = `#262626`;
    } else {
      menubar.content = `hsl(${lightVibrantHSL[0] * 360}, ${lightVibrantHSL[1] * 100 * 0.2}%, 35%)`;
    }
  }, [playerUiState, lightVibrantHSL]);

  return (
    <style id="AppleMusic">
      {dark_base_colors}
      {icons_buttons}
      {gradients_overlays}
      {rulers_borders}
      {backgrounds}
      {scrollbars}
      {playerbar_progressbar}
      {song_image}
      {misc_style_improvements}
      {zebra_stripes}
      {nowplaying_overlay}
      {texts}
      {frosted_glass}
      {
        /*css*/ `
        :root {
          --ts-theme-ditto-apple-1-color: hsl(var(--ts-palette-dominant-hue), calc(var(--ts-palette-dominant-saturation) * 0.2), 35%);
          --ts-theme-ditto-apple-2-color: hsl(var(--ts-palette-vibrant-hue), calc(var(--ts-palette-vibrant-saturation) * 0.2), 32%);
          --ts-theme-ditto-apple-3-color: hsl(var(--ts-palette-muted-hue), calc(var(--ts-palette-muted-saturation) * 0.2), 26%);
          --ts-theme-ditto-apple-4-color: hsl(var(--ts-palette-lightvibrant-hue), calc(var(--ts-palette-lightvibrant-saturation) * 0.2), 35%);
          --ts-theme-ditto-apple-5-color: hsl(var(--ts-palette-darkvibrant-hue), calc(var(--ts-palette-darkvibrant-saturation) * 0.2), 28%);
          --ts-navbar-color: var(--ts-theme-ditto-apple-4-color);
          --ts-playerpage-color: linear-gradient(180deg, var(--ts-theme-ditto-apple-4-color) 0%, var(--ts-theme-ditto-apple-2-color) 20%, var(--ts-theme-ditto-apple-5-color) 80%, var(--ts-theme-ditto-apple-3-color) 100%);
          --ts-playerbar-color: var(--ts-theme-ditto-apple-3-color);
          --ts-playerpageavtoggle-color: hsl(var(--ts-palette-lightvibrant-hue), calc(var(--ts-palette-dominant-saturation) * 0.4), 27%);
          --ts-body-color: #333333;

          --ts-theme-ditto-applemusic-color: #d60017;

          --ts-overlay-color: rgba(0,0,0,0.6);

          --ts-nowplaying-background-color: #db2a47;

          --ts-texts-selection-color: #ff3053;
        }

        /* i think ytm is putting a 'padding-top: 100%' on this. i have to set it to 0 for my gradient to be good */
        ytmusic-player[player-ui-state=FULLSCREEN] #song-image.ytmusic-player {
          padding-top: 0;
        }

        ytmusic-player[player-ui-state=MINIPLAYER] #song-image.ytmusic-player {
          padding-top: 0;
        }
     `
      }
      {!(playerUiState === "PLAYER_BAR_ONLY" || playerUiState === "MINIPLAYER" || playerUiState === "INACTIVE")
        ? /*css*/ `
        /* thick box-shadow for song img */
        #song-image {
          box-shadow: 0 10px 40px rgba(0,0,0,0.4);
          border-radius: 4px;
        }
        
        #song-video {
          box-shadow: 0 10px 50px rgba(0,0,0,0.4);
          border-radius: 4px;
        }

        ytmusic-player[player-ui-state=FULLSCREEN] #song-image #img {
          box-shadow: 0 10px 50px rgba(0,0,0,0.5);
        }
     
        `
        : /*css*/ `

        :root {
          --ts-navbar-color: #292929db !important;
          --ts-body-color: hsl(0,0%,12%);
          --ts-playerbar-color: hsla(var(--ts-palette-dominant-hue), calc(var(--ts-palette-dominant-saturation) * 0.2), 16%, 0.5);
          --ts-zebra-stripes-color: rgba(255,255,255,0.03);;
          --ts-secondary-icon-color: #fa586a;
          --ts-colored-button-color: #fa586a;
        }

        ytmusic-tabs.stuck {
          border-top: 1px solid #454545;
          border-bottom: 1px solid #454545;
        }

        /* border around album thumbnails */
        ytmusic-thumbnail-renderer:not([thumbnail-crop="MUSIC_THUMBNAIL_CROP_CIRCLE"]) {
          height: initial !important;
          width: initial !important;
          border: 1px solid #3d3d3d;
        }

        /* set thumbnail back to 44px for add-to-playlist menu */
        .thumbnail.ytmusic-playlist-add-to-option-renderer {
          height: 44px !important;
          width: 44px !important;
        }

        /* album page light border */
        #thumbnail {
          border: 1px solid #3d3d3d;
        }
        #song-image > #thumbnail {
          border: none;
        }

        #button-shape-like button {
          color: #fa586a;
        }

        body::-webkit-scrollbar-track {
          background-color: rgba(255,255,255,0.03);
        }
      `}
    </style>
  );
}

export default AppleMusicDark;
