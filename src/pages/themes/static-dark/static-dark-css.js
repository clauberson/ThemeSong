import { scrollbars } from '../universal/scrollbars';
import { playerbar_progressbar } from '../universal/playerbar-progressbar';
import { main_BGs } from '../universal/main-BGs';
import { logoStyles } from '../universal/logo';
import { songImgStyles } from '../universal/songImgStyles';

export const static_dark_css = /*css*/`
/* ThemeSong */
/* Static Dark Theme */

:root {
  --ts-default-app-color: #171717;

  --ts-topnav-color: var(--ts-default-app-color);
  --ts-mainbg-color: var(--ts-default-app-color);
  --ts-playpagebg-color: var(--ts-default-app-color);
  --ts-playbar-color: var(--ts-default-app-color);
  --ts-playpageavtoggle-color: var(--ts-default-app-color);

  --ts-playprogress-color: white;

  --ytmusic-brand-background-solid: var(--ts-mainbg-color) !important;
  --ytmusic-general-background-c: var(--ts-mainbg-color) !important;
  --ytmusic-search-background: var(--ts-playbar-color) !important;
}

${main_BGs}
${scrollbars}
${playerbar_progressbar}
${logoStyles}
${songImgStyles}
`;