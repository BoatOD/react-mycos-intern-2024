import { useState } from "react";
import { ITodo } from "../MyTodoList/ITodo";

interface ITodoItemProps {
  todoItem: ITodo;
}
const TodoItem = (props: ITodoItemProps) => {
  const { todoItem } = props;
  const [innerTodo] = useState<ITodo>(todoItem);
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
