import { useCallback, useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Grid } from "@mui/material";
import { todoApi } from "../../api/TodoApi";
import { ITodo } from "../MyTodoList/ITodo";

const ListContainer = () => {
  //use for keep the vairable value
  const [todos, setTodos] = useState<ITodo[]>([]);
  const getTodos = useCallback(async () => {
    const result = await todoApi.getTodos();
    setTodos(result.data);
  }, []);
  

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <>
      {todos.map((t) => {
        return (
          <Grid key={"todo-" + t.title} item pl={2}>
            <TodoItem todoItem={t} />
          </Grid>
        );
      })}
    </>
  );
};

export default ListContainer;
