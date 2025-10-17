import s from "./App.module.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskAction,
  deleteTaskAction,
  getToDos,
  currentTaskAction,
  updateTaskAction,
} from "./actions/index";
import {
  toDoSelector,
  currentTaskSelector,
  isLoadingSelector,
} from "./selectors/index";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [newTaskInputValue, setNewTaskInputValue] = useState("");
  const dispatch = useDispatch();
  const toDoList = useSelector(toDoSelector);
  const currentTask = useSelector(currentTaskSelector);
  const refButton = useRef(null);

  useEffect(() => {
    dispatch(getToDos());
  }, [dispatch]);

  const addTask = (event, payload) => {
    event.preventDefault();
    if (newTaskInputValue) {
      dispatch(addTaskAction(payload));
    }
  };

  const updateTask = (id, data) => {
    dispatch(updateTaskAction({ id, data }));
  };

  const deleteTaskById = (id) => {
    dispatch(deleteTaskAction(id));
  };

  const onInputChange = ({ target }) => {
    setInputValue(target.value);
    toDoList.forEach((task) => {
      if (target.value.trim() === task.title) {
        dispatch(currentTaskAction(task.id));
        refButton.current.focus();
      }
    });
  };
  const onNewTaskInputChange = ({ target }) => {
    setNewTaskInputValue(target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (currentTask) {
      alert(`Номер вашего таска: ${currentTask}`);
    } else {
      alert("Перепроверьте ввод");
    }
  };

  const onHandleSort = (payload) => {
    dispatch({
      type: "SORT",
      payload,
    });
  };

  return (
    <>
      <div className={s.header}>2 DO L1ST </div>
      <br />
      <div className={s.mainContainer}>
        <br />
        <form onSubmit={onSubmit} className={s.taskSearch}>
          <input
            className={s.inputTask}
            onChange={onInputChange}
            type="text"
            name="search"
            placeholder="Поиск задачи..."
          />
          <button
            disabled={inputValue ? false : true}
            ref={refButton}
            style={{ border: "none" }}
            type="submit"
          >
            🔍
          </button>
        </form>
        <br />
        <form>
          <div className={s.newTask}>
            <input
              onInput={onNewTaskInputChange}
              type="text"
              placeholder="Новое дело..."
            />
            <button
              onClick={() =>
                addTask(event, { id: Date.now(), title: newTaskInputValue })
              }
              className={s.newTaskButton}
            >
              {" "}
              +{" "}
            </button>
          </div>
        </form>

        <div className={s.taskContainer}>
          {toDoList.map((task) => (
            <div key={task.id} className={s.task}>
              {task.title}
              <button
                onClick={() =>
                  updateTask(task.id, {
                    title: "Задача изменена",
                  })
                }
                className={s.updateButton}
              >
                🖊️
              </button>
              <button
                onClick={() => deleteTaskById(task.id)}
                className={s.deleteButton}
              >
                ❌
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => onHandleSort(toDoList)}
          className={s.buttonShowAll}
        >
          SORT
        </button>
      </div>
    </>
  );
}

export default App;
