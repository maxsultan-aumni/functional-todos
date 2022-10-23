import React, { useState } from "react";

const Todo = ({
  id,
  name: initialName,
  description: initialDescription,
  completed: initialCompleted,
  handleDeleteTodoById,
}) => {
  const [name, setName] = useState(initialName ? initialName : "");
  const [description, setDescription] = useState(
    initialDescription ? initialDescription : ""
  );
  const [completed, setCompleted] = useState(
    initialCompleted ? initialCompleted : false
  );

  const handleUpdate = () => {};

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => setCompleted(!completed)}
      />
      <h3>{name}</h3>
      <p>{description}</p>
      <button type="button" onClick={() => handleDeleteTodoById(id)}>
        delete
      </button>
      <button onClick={() => handleUpdate(id)}>Update</button>
    </li>
  );
};

export default Todo;
