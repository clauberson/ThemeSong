import { useStore } from "/src/app/store";
import { css } from "@emotion/react";
import VariantButton from "../../components/VariantButton";
import useLocalization from "../../../Extension/Localization/useLocalization";

import { styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import { RxBorderWidth, RxWidth } from "react-icons/rx";

const StyledSlider = styled(Slider)`
  width: 180px;
  color: royalblue;

  .MuiSlider-thumb {
    color: #fff;
    border: 1px solid #fff;
    width: 14px;
    height: 14px;
  }

  .MuiSlider-thumb::after {
    width: 1px;
    height: 1px;
  }
`;

function BarsSettings() {
  const barsVisualizer = useStore((state) =>
    state.visualizer.visualizers.find((visualizer) => visualizer.id === "51dc50c8-eb06-4086-ad9c-a89758f63db6")
  );
  const barsPrefs = useStore((state) => state.visualizer.prefs["51dc50c8-eb06-4086-ad9c-a89758f63db6"]);
  const setSingleVisualizerPrefs = useStore((state) => state.visualizer.setSingleVisualizerPrefs);
  const getMessage = useLocalization();

  const handleVisualizersChange = (visualizerObject) => {
    setSingleVisualizerPrefs("51dc50c8-eb06-4086-ad9c-a89758f63db6", visualizerObject);
  };

  const handleVariantClick = (e, id) => {
    let copy = { ...barsPrefs };
    copy.activeVariant = id;
    handleVisualizersChange(copy);
  };

  const handleBarSettingsChange = (e, id) => {
    let copy = { ...barsPrefs };
    copy[e.target.name] = Number(e.target.value);
    console.log(copy);
    handleVisualizersChange(copy);
  };

  if (!barsVisualizer) {
    return <h1>hi</h1>;
  } else {
    return (
      <div
        css={css`
          .MuiSlider-root {
            padding: 0;
          }
        `}
      >
        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "21px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignContent: "center",
                  alignItems: "center",
                  width: 280,
                }}
              >
                <label htmlFor="barWidth">
                  <RxBorderWidth size={15} />
                </label>
                <StyledSlider
                  name="barWidth"
                  value={barsPrefs.barWidth}
                  onChange={handleBarSettingsChange}
                  step={5}
                  min={5}
                  max={80}
                />
                <input
                  type="number"
                  min="5"
                  max="80"
                  name="barWidth"
                  value={barsPrefs.barWidth}
                  onChange={handleBarSettingsChange}
                  style={{
                    maxWidth: "40px",
                    backgroundColor: "inherit",
                    border: 0,
                    borderBottom: "1px solid black",
                    color: "white",
                    marginLeft: "8px",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "21px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignContent: "center",
                  alignItems: "center",
                  width: 280,
                }}
              >
                <label htmlFor="gap">
                  <RxWidth size={20} />
                </label>
                <StyledSlider
                  name="gap"
                  value={barsPrefs.gap}
                  onChange={handleBarSettingsChange}
                  step={2}
                  min={0}
                  max={20}
                />
                <input
                  type="number"
                  min="0"
                  max="20"
                  name="gap"
                  value={barsPrefs.gap}
                  onChange={handleBarSettingsChange}
                  style={{
                    maxWidth: "40px",
                    backgroundColor: "inherit",
                    border: 0,
                    borderBottom: "1px solid black",
                    color: "white",
                    marginLeft: "8px",
                  }}
                />
              </div>
            </div>
          </form>
          <p style={{ marginBottom: "6px" }}>{getMessage("variants")}</p>
          <div
            className="VariantsContainer"
            css={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gridAutoRows: "1fr",
              gap: "10px",
            }}
          >
            {barsVisualizer.variants.map((variant) => (
              <VariantButton
                key={variant.id}
                id={variant.id}
                onClick={(e) => handleVariantClick(e, variant.id)}
                isActive={variant.id === barsPrefs.activeVariant}
                name={variant.name}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default BarsSettings;
