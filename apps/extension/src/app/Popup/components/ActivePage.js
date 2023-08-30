import { useStore } from "/src/app/store";

import VisualizersPage from "../../Visualizer/VisualizersPage";
import ThemesPage from "../../Theme/ThemesPage";
import PiecesPage from "../../Pieces/PiecesPage";

function ActivePage() {
  const activePopupTab = useStore((state) => state.popup.prefs.activePopupTab);

  const activePageCalc = () => {
    switch (activePopupTab) {
      case 1:
        return <ThemesPage />;
      case 2:
        return <VisualizersPage />;
      case 3:
        return <PiecesPage />;
      default:
        return (
          <div>
            <p>Active Page Component: something has gone wrong...</p>
            <p>Try resetting to extension defaults by clicking on ⚙ gear icon on lower right corner.</p>
          </div>
        );
    }
  };

  return <>{activePageCalc()}</>;
}

export default ActivePage;
