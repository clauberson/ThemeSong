export const playerbar_progressbar = /*css*/ `
:root {
  --ts-playprogress-color: var(--ts-base-100-color, #ffffff);
  --ts-playprogress-secondary-color: var(--ts-base-100-alpha-02-color, rgba(255,255,255,0.2));
  --ts-playprogress-container-color: var(--ts-base-100-alpha-01-color, rgba(255,255,255,0.1));

  --ts-playprogress-knob-color: var(--ts-playprogress-color);
}

#progress-bar.ytmusic-player-bar {
  --paper-slider-active-color: var(--ts-playprogress-color) !important;
  --paper-slider-secondary-color: var(--ts-playprogress-secondary-color) !important;
  --paper-slider-container-color: var(--ts-playprogress-container-color) !important;
}

#progress-bar.ytmusic-player-bar[focused], ytmusic-player-bar:hover #progress-bar.ytmusic-player-bar {
  --paper-slider-knob-color: var(--ts-playprogress-knob-color) !important;
  --paper-slider-knob-start-color: var(--ts-playprogress-knob-color) !important;
  --paper-slider-knob-start-border-color: var(--ts-playprogress-knob-color) !important;
}
`;
