const initialState = {
  toDos: [],
  loading: false,
  error: null,
};
export const toDoReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case "FETCH_DATA_LOADING": {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case "FETCH_DATA_SUCCESS": {
      return {
        ...state,
        toDos: payload,
        loading: false,
      };
    }
    case "FETCH_DATA_ERROR": {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    }
    case "ADD_TASK": {
      return {
        ...state,
        toDos: [...state.toDos, payload],
      };
    }
    case "DELETE_TASK": {
      return {
        ...state,
        toDos: state.toDos.filter((task) => task.id !== payload),
      };
    }
    case "UPDATE_TASK": {
      return {
        ...state,
        toDos: state.toDos.map((task) =>
          task.id === payload.id ? { ...task, ...payload.data } : task
        ),
      };
    }
    case "SORT": {
      const sortedArray = [...payload].sort((a, b) =>
        a.title > b.title ? 1 : -1
      );
      return {
        ...state,
        toDos: sortedArray,
      };
    }
    default:
      return state;
  }
};
