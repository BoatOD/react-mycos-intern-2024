import React, { useCallback, useState } from "react";
import { ITodo } from "./ListContainer";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { todoApi } from "../../api/TodoApi";
import { Link, useNavigate } from "react-router-dom";

interface ITodoItemProps {
  todoItem: ITodo;
}
const TodoItem = (props: ITodoItemProps) => {
  const { todoItem } = props;
  const [innerTodo, setInnerTodo] = useState<ITodo>(todoItem);
  return (
    <>
      <h1>{ innerTodo.title }</h1>
      <h1>{ innerTodo.description }</h1>
      <h1>{ innerTodo.dueDate }</h1>
      {/* <Link to={"/todos/" + todoItem.id}>Open</Link> */}
    </>
  );
};

export default TodoItem;
