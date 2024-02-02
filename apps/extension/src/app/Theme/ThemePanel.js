import { css } from "@emotion/react";

import { IoColorPalette } from "react-icons/io5";
import InvertColorsOffIcon from "@mui/icons-material/InvertColorsOff";
import { GiAtom } from "react-icons/gi";
import ColorizeIcon from "@mui/icons-material/Colorize";
import AppleIcon from "@mui/icons-material/Apple";
import { SiYoutubemusic } from "react-icons/si";

import PanelButton from "../QuickAccessPanel/components/PanelButton";
import { useStore } from "/src/app/store";
import useLocalization from "../Extension/Localization/useLocalization";

function ThemePanel() {
  const activeTheme = useStore((state) => state.theme.prefs.activeTheme);
  const setActiveTheme = useStore((state) => state.theme.setActiveTheme);
  const getMessage = useLocalization();

  const handleClick = (value) => {
    if (activeTheme !== value) {
      setActiveTheme(value);
    } else {
      console.log("Already active");
    }
  };

  return (
    <div
      css={css`
        margin-bottom: 2px;
      `}
    >
      <h3
        css={css`
          padding: 2px 5px;
          display: flex;
          align-items: center;
        `}
      >
        <IoColorPalette style={{ fontSize: "16px", marginRight: "5px" }} />
        <span>{getMessage("themes")}</span>
      </h3>
      <div
        css={css`
          display: flex;
          justify-content: start;
          align-items: center;
        `}
      >
        <PanelButton
          title="Off / YTM Default"
          bgColor={activeTheme === "416034f2-bfb8-46e8-9929-5805dd59a688" && "var(--ts-base-100-color)"}
          color={activeTheme === "416034f2-bfb8-46e8-9929-5805dd59a688" && "var(--ts-base-00-color)"}
          hoverColor="var(--ts-base-00-color)"
          css={css`
            height: 42px;
            min-width: 45px;
            width: 70px;
            margin: 0 3px;
            border: 0;
            border-radius: 6px;
          `}
          onClick={(e) => handleClick("416034f2-bfb8-46e8-9929-5805dd59a688")}
        >
          <InvertColorsOffIcon
            css={css`
              font-size: 20px;
            `}
          />
        </PanelButton>
        <PanelButton
          title="Dynamic"
          bgColor={activeTheme === "db8854e3-6753-4639-b244-c8091f3b9fcb" && "var(--ts-base-100-color)"}
          color={activeTheme === "db8854e3-6753-4639-b244-c8091f3b9fcb" && "#008DFF"}
          hoverColor="#008DFF"
          css={css`
            height: 42px;
            min-width: 45px;
            width: 70px;
            margin: 0 3px;
            border: 0;
            border-radius: 6px;
          `}
          onClick={(e) => handleClick("db8854e3-6753-4639-b244-c8091f3b9fcb")}
        >
          <GiAtom
            size={28}
            css={css`
              font-weight: 700;
            `}
          />
        </PanelButton>
        <PanelButton
          title="Static"
          bgColor={activeTheme === "b458eaae-0cbd-4a44-8847-c7a6a6ea1be8" && "var(--ts-base-100-color)"}
          color={activeTheme === "b458eaae-0cbd-4a44-8847-c7a6a6ea1be8" && "#ff3700"}
          hoverColor="#ff3700"
          css={css`
            height: 42px;
            min-width: 45px;
            width: 70px;
            margin: 0 3px;
            border: 0;
            border-radius: 6px;
          `}
          onClick={(e) => handleClick("b458eaae-0cbd-4a44-8847-c7a6a6ea1be8")}
        >
          <ColorizeIcon
            css={css`
              font-size: 24px;
            `}
          />
        </PanelButton>
        <PanelButton
          title="Apple Music"
          bgColor={activeTheme === "76dd54c5-78a2-4ca3-9c16-3d0d1aab367f" && "var(--ts-base-100-color)"}
          color={activeTheme === "76dd54c5-78a2-4ca3-9c16-3d0d1aab367f" && "#ff0055"}
          hoverColor="#ff0055"
          css={css`
            height: 42px;
            min-width: 45px;
            width: 70px;
            margin: 0 3px;
            border: 0;
            border-radius: 6px;
            padding: 0;
          `}
          onClick={(e) => handleClick("76dd54c5-78a2-4ca3-9c16-3d0d1aab367f")}
        >
          <AppleIcon
            css={css`
              font-size: 28px;
            `}
          />
        </PanelButton>
        {activeTheme === "55f83bbd-d794-49a8-8912-2b53af3f1d3f" && (
          <PanelButton
            title="YouTube Music Mobile"
            hoverColor="red"
            bgColor={activeTheme === "55f83bbd-d794-49a8-8912-2b53af3f1d3f" && "var(--ts-base-100-color)"}
            color={activeTheme === "55f83bbd-d794-49a8-8912-2b53af3f1d3f" && "red"}
            css={css`
              height: 42px;
              min-width: 45px;
              width: 70px;
              margin: 0 3px;
              border: 0;
              border-radius: 6px;
              padding: 3px;
            `}
            onClick={(e) => handleClick("55f83bbd-d794-49a8-8912-2b53af3f1d3f")}
          >
            <SiYoutubemusic
              css={css`
                font-size: 26px;
              `}
            />
          </PanelButton>
        )}
      </div>
    </div>
  );
}

export default ThemePanel;
