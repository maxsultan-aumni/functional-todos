import "./App.css";
import { useState } from "react";
import { compose, curry, equals, filter, flip, not, prop } from "ramda";
import TodoForm from "./components/TodoForm";
import Todo from "./components/Todo";
import { generateUniqueId } from "./utils";

// persist changes to local storage
// filter todos by completed

const initialTodos = [
  {
    id: generateUniqueId(),
    name: "Laundry",
    description: "Whites need to be washed and folded",
    completed: false,
  },
  {
    id: generateUniqueId(),
    name: "Make Lunch",
    description: "You will be hungry later. Get something started now",
    completed: false,
  },
];

const notEquals = curry((val1, val2) => compose(not, equals)(val1, val2));

const removeItemFromArrayById = curry((arr, id) =>
  flip(filter)(arr, compose(notEquals(id), prop("id")))
);

const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  const handleDeleteTodoById = compose(
    setTodos,
    removeItemFromArrayById(todos)
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODOS:</h1>
      </header>
      <TodoForm setTodos={setTodos} todos={todos} />
      <ul>
        {todos.map(({ id, name, description, completed }) => (
          <Todo
            key={id}
            id={id}
            name={name}
            description={description}
            completed={completed}
            handleDeleteTodoById={handleDeleteTodoById}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
