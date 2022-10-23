import React, { useState } from "react";
import { compose, curry, lensProp, set, append, flip } from "ramda";
import { generateUniqueId } from "../../utils";

const setObjectValue = compose((key, value) => set(lensProp(key), value));

const addUniqueIdToObject = setObjectValue("id", generateUniqueId());

const TodoForm = ({ todos, setTodos }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // how do I add a default without putting it at the end? where I should have my data?
  // example: giving the option to call this function with a initial obj instead of an empty one

  // is this the best way to do this?
  const createTodoObject = curry((description, name) =>
    compose(
      // this is impure
      addUniqueIdToObject,
      setObjectValue("completed", false),
      setObjectValue("name", name),
      setObjectValue("description", description)
    )({})
  );

  // this is fine because these are constant... but could be less procedural?
  const resetTodosForm = () => {
    setName("");
    setDescription("");
  };
  const flippedAppend = flip(append);

  const addTodo = flippedAppend(todos);

  const handleSubmit = (e, todo) => {
    // How do we re-write this to be less procedural?
    e.preventDefault();
    compose(setTodos, addTodo)(todo);
    resetTodosForm();

    // I don't need a single piece of data transformed through out this function
    // I need 3 separate, distinct things to happen:
    // 1) Prevent the default page submit action
    // 2) add the newly created todo to the todos state
    // 3) reset the form
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, createTodoObject(description, name))}
    >
      <h2>Create Todo:</h2>
      <label>
        Name:
        <br></br>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Description:
        <br></br>
        <input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default TodoForm;
