import React, { useCallback, useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Box, Button, Grid, Typography } from "@mui/material";
import { todoApi } from "../../api/TodoApi";
export interface ITodo {
  id: string;
  title: string;
  description: string;
  createDate: string;
  updateDate: string;
  dueDate: string;
}

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
