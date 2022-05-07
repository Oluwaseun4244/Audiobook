const lastPlayedDetails = {
  audioTitle: "",
  audioDuration: "",
  audioCurrentTime: "",
};

const lastPlayedReducer = (state = lastPlayedDetails, action) => {
  switch (action.type) {
    case "updateTitle":
      return { ...state, audioTitle: action.data };
    case "updateDuration":
      return { ...state, audioDuration: action.data };

    case "updateCurrentTime":
      return { ...state, audioCurrentTime: action.data };

    default:
      return state;
  }
};

export default lastPlayedReducer;
