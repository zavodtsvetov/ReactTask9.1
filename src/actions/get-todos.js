export const getToDos = () => async (dispatch) => {
  dispatch({ type: "FETCH_DATA_LOADING" });
  try {
    const response = await fetch(`http://localhost:3005/todos`);
    if (!response.ok) {
      throw new Error("error");
    }
    const toDos = await response.json();
    dispatch({ type: "FETCH_DATA_SUCCESS", payload: toDos });
  } catch (error) {
    dispatch({ type: "FETCH_DATA_ERROR", payload: error.message });
  }
};
