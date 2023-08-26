export const createPiecesSlice = (set) => ({
  pieces: [
    {
      id: "bf472cf5-689f-4be0-9eef-67c5cc8715e9",
      name: "Hide Cast Button",
    },
    {
      id: "a2c1185b-1d9b-4c0f-aef3-8c7887374cc5",
      name: "Hide Dislike Button",
    },
    // {
    //   id: "2a606045-80f3-4aee-93de-cf3cd39d2920",
    //   name: "User Snippet",
    // },
  ],
  piecesPrefs: {
    "bf472cf5-689f-4be0-9eef-67c5cc8715e9": false,
    "a2c1185b-1d9b-4c0f-aef3-8c7887374cc5": false,
    // "2a606045-80f3-4aee-93de-cf3cd39d2920": {
    //   enabled: false,
    //   css: "/* put css styles here */",
    // },
  },
  togglePiece: (payload) => {
    console.log("pieces: togglePiece");
    set((state) => {
      state.pieces.piecesPrefs[payload] = !state.pieces.piecesPrefs[payload];
    });
  },
  changePiecesPrefs: (payload) => {
    console.log("pieces: changePiecesPrefs");
    console.log(payload);
    set((state) => {
      state.pieces.piecesPrefs = payload;
    });
  },
});
