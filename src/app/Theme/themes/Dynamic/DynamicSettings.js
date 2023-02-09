import { css } from "@emotion/react";
import DynamicDarkSettings from "./Dark/DynamicDarkSettings";
import DynamicLightSettings from "./Light/DynamicLightSettings";
import { useStore } from "/src/app/store";

function DynamicSettings() {
  const themePrefs = useStore((state) => state.theme.themePrefs);
  const changeThemePrefs = useStore((state) => state.theme.changeThemePrefs);
  const dynamicUserPrefs = useStore((state) =>
    state.theme.themePrefs.find((theme) => theme.id === "db8854e3-6753-4639-b244-c8091f3b9fcb")
  );

  function handleDarkLightChange(e) {
    let newDynamicUserPrefs = {
      ...dynamicUserPrefs,
      [e.target.name]: e.target.value,
    };
    let newThemePrefsArr = themePrefs.map((themePrefs) =>
      themePrefs.id === "db8854e3-6753-4639-b244-c8091f3b9fcb" ? newDynamicUserPrefs : themePrefs
    );
    changeThemePrefs(newThemePrefsArr);
    chrome.storage.local.set({ themePrefs: newThemePrefsArr }, () =>
      console.log("chrome.storage.local.set({themePrefs}")
    );
  }

  function returnSettingSliders() {
    switch (dynamicUserPrefs.appearance) {
      case "light":
        return <DynamicLightSettings />;
      case "dark":
        return <DynamicDarkSettings />;
      case "system":
        return (
          <div
            css={css`
              width: 100%;
              display: flex;
              justify-content: space-evenly;
            `}
          >
            <DynamicLightSettings />
            <DynamicDarkSettings />
          </div>
        );
      default:
        return (
          <div
            css={css`
              width: 100%;
              display: flex;
              justify-content: space-evenly;
            `}
          >
            <DynamicLightSettings />
            <DynamicDarkSettings />
          </div>
        );
    }
  }

  return (
    <div>
      <h2
        css={css`
          color: #ff3232;
          font-size: 16px;
        `}
      >
        Active Theme: Dynamic
      </h2>
      <p
        css={css`
          margin: 5px 0 0;
        `}
      >
        Colors change dynamically based on album art.
      </p>
      <p
        css={css`
          margin-bottom: 10px;
        `}
      >
        Adjust brightness and saturation below.
      </p>
      <form
        onSubmit={(e) => e.preventDefault()}
        css={css`
          margin-bottom: 8px;
          text-align: right;
        `}
      >
        <label
          htmlFor="appearance"
          css={css`
            margin-right: 8px;
          `}
        >
          Appearance:
        </label>
        <select
          id="appearance"
          name="appearance"
          value={dynamicUserPrefs.appearance}
          onChange={handleDarkLightChange}
          css={css`
            background-color: #333;
            color: white;
            border: 1px solid #888;
            border-radius: 4px;
            outline: 0;
          `}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">Use Device Setting</option>
        </select>
      </form>
      <div
        css={css`
          display: flex;
          justify-content: center;
          width: 100%;
        `}
      >
        {returnSettingSliders()}
      </div>
    </div>
  );
}

export default DynamicSettings;
