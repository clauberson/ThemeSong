import { css } from "@emotion/react";
import { useStore } from "/src/app/store";
import SongPanel from "../Song/SongPanel/SongPanel";
import tsicon from "../../assets/icon-128.png";
import { PiSkipBackFill, PiPlayPauseFill, PiSkipForwardFill } from "react-icons/pi";
import YtmIcon from "../YtmLogo/YtmIcon";

function SidePlayer() {
  const metadata = useStore((state) => state.media.metadata);

  function handlePrevious() {
    chrome.tabs.query({}, (tabs) => {
      let ytmTabs = tabs.filter((tab) => "url" in tab);
      console.log(ytmTabs);
      chrome.tabs.sendMessage(ytmTabs[0].id, { message: "previous-button" });
    });
  }

  function handlePlayPause(e) {
    console.log(e);
    chrome.tabs.query({}, (tabs) => {
      let ytmTabs = tabs.filter((tab) => "url" in tab);
      console.log(ytmTabs);

      chrome.tabs.sendMessage(ytmTabs[0].id, { message: "playpause" });
    });
  }

  function handleNext() {
    chrome.tabs.query({}, (tabs) => {
      let ytmTabs = tabs.filter((tab) => "url" in tab);
      console.log(ytmTabs);
      chrome.tabs.sendMessage(ytmTabs[0].id, { message: "next-button" });
    });
  }

  function handleYTMclick() {
    chrome.tabs.query({}, (tabs) => {
      let ytmTabs = tabs.filter((tab) => "url" in tab);
      console.log(ytmTabs);
      if (ytmTabs.length === 0) {
        window.open("https://music.youtube.com");
      } else if (ytmTabs.length === 1) {
        chrome.windows.update(ytmTabs[0].windowId, { focused: true });
        chrome.tabs.update(ytmTabs[0].id, { active: true });
      } else {
        let audibleTabId;
        for (let tab of ytmTabs) {
          switch (tab.audible) {
            case true:
              audibleTabId = tab.id;
              break;
            default:
              break;
          }
        }
        if (audibleTabId) {
          chrome.windows.update(ytmTabs[0].windowId, { focused: true });
          chrome.tabs.update(ytmTabs[0].id, { active: true });
        } else {
          chrome.tabs.update(ytmTabs.at(-1).id, { active: true });
        }
      }
    });
  }

  return (
    <div
      id="SidePlayer"
      css={css`
        height: 100vh;
        width: 100vw;
      `}
    >
      <div
        id="sideplayer-bg"
        css={css`
          padding: 20px;
          height: calc(100vh - 40px);
          color: white;
          border-radius: 10px;
          text-align: center;
          background: linear-gradient(
            to bottom,
            oklch(from var(--ts-color) 30% 0.04 h) 40%,
            oklch(from var(--ts-color2) 20% 0.03 h)
          );
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          align-content: center;
        `}
      >
        <div>
          <div
            css={css`
              width: 100%;
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            `}
          >
            <button
              onClick={handleYTMclick}
              css={css`
                border-radius: 5px;
                border: 0;
                background: 0;
              `}
            >
              <YtmIcon full />
            </button>
            <div></div>
            {/* <ThemeSongFontIcon /> */}
          </div>
          <button
            onClick={handlePlayPause}
            css={css`
              border-radius: 5px;
              margin-bottom: 20px;
              border: 0;
              background: 0;
            `}
          >
            <img
              id="sideplayerimage"
              src={metadata.artwork[metadata.artwork.length - 1].src || tsicon}
              alt="album cover"
              // crossOrigin="anonymous"
              css={css`
                width: 250px;
                height: 250px;
                border-radius: 10px;
                background-color: #222;
              `}
            />
          </button>
          <h1
            css={css`
              margin-bottom: 10px;
              font-size: 20px;
            `}
          >
            {metadata.title}
          </h1>
          <h2
            css={css`
              margin-top: "8px";
              font-size: 16px;
              color: #dddddd;
            `}
          >
            {metadata.artist}
          </h2>
        </div>
        <div
          css={{
            textAlign: "center",
            display: "flex",
            justifyContent: "space-around",
            minWidth: 300,
            maxWidth: 500,
            button: {
              border: 0,
              padding: "10px 16px",
              color: "#aaa",
              background: 0,
              ":hover": {
                color: "#fff",
              },
            },
          }}
        >
          <button onClick={handlePrevious}>
            <PiSkipBackFill style={{ fontSize: "25px" }} />
          </button>
          <button onClick={handlePlayPause}>
            <PiPlayPauseFill style={{ fontSize: "50px" }} />
          </button>
          <button onClick={handleNext}>
            <PiSkipForwardFill style={{ fontSize: "25px" }} />
          </button>
        </div>
        <div
          css={css`
            margin-top: 20px;
            text-align: center;
          `}
        >
          <SongPanel />
        </div>
      </div>
    </div>
  );
}

export default SidePlayer;
