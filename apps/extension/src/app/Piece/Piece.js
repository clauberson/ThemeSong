import { useStore } from "/src/app/store";
import RemoveDislikeButton from "./pieces/RemoveDislikeButton";
import RemoveCastButton from "./pieces/RemoveCastButton";
// import RemoveUpgradeButton from "./pieces/RemoveUpgradeButton";
// import AddConfirmUnlike from "./pieces/AddConfirmUnlike";
import UserSnippet from "./pieces/UserSnippet";

function Piece() {
  const piecePrefs = useStore((state) => state.piece.prefs);

  return (
    <div id="ThemeSong-Piece">
      {piecePrefs["a2c1185b-1d9b-4c0f-aef3-8c7887374cc5"].enabled && <RemoveDislikeButton />}
      {piecePrefs["bf472cf5-689f-4be0-9eef-67c5cc8715e9"].enabled && <RemoveCastButton />}
      {/* {piecePrefs["2706684f-a566-4ad0-8341-50acb366ad7a"] && <AddConfirmUnlike />} */}
      {piecePrefs["2a606045-80f3-4aee-93de-cf3cd39d2920"].enabled && <UserSnippet />}
    </div>
  );
}

export default Piece;