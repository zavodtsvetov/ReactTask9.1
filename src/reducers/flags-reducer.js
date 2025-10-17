const initialFlagsState = {
  currentTask: null,
};

export const flagsReducer = (state = initialFlagsState, { type, payload }) => {
  switch (type) {
    case "CURRENT_TASK": {
      return {
        ...state,
        currentTask: payload,
      };
    }
    default:
      return state;
  }
};
