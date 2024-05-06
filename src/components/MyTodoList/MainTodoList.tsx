import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Grid, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { todoApi } from "../../api/TodoApi";
import TableTodoList from "./TableTodoList";
import { ITodo } from "../MyTodoList/ITodo";
import '../../css/MainTodo.css';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const MainTodoList = () => {
  //use for keep the vairable value
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [innerTodo, setInnerTodo] = useState<ITodo[]>([]);
  const getTodos = useCallback(async () => {
    const result = await todoApi.getTodos();
    setTodos(result.data);
    setInnerTodo(result.data);
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = "#303030"
    getTodos();
  }, [getTodos]);

  const handleSortStatus = (event: any) => {
    const selectedStatus = event.target.value;
  
    let sortedTodos = [...todos];
  
    if (selectedStatus === "All") {
      sortedTodos = [...todos];
    } else {
      console.log(selectedStatus)
      sortedTodos = sortedTodos.filter((todo) => todo.status == selectedStatus);
    }
  
    setInnerTodo(sortedTodos);
  };

  return (
    <>
      <div>
        <Stack margin={5} mx={10} spacing={3}>
          <h1>Todo</h1>
          <Select
                labelId="status-select-label"
                id="status"
                defaultValue="All"
                onChange={handleSortStatus}
                aria-describedby="select-status-helper-text"
                sx={{borderRadius: '100px', backgroundColor: "#F1F1F1", fontSize: 20}}
              >
                <MenuItem value={"All"} sx={{fontSize: 20}}>All</MenuItem>
                <MenuItem value={"In Progress"} sx={{fontSize: 20}}>In Progress</MenuItem>
                <MenuItem value={"Complete"} sx={{fontSize: 20}}>Complete</MenuItem>
                <MenuItem value={"Not Started"} sx={{fontSize: 20}}>Not Started</MenuItem>
              </Select>
          <TableContainer component={Paper} sx={{borderRadius: 5}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{backgroundColor: "#F3D200"}}>
                <TableRow>
                  <TableCell align="center">
                    <span className="HeadTable">
                      <ArticleOutlinedIcon />
                      Task Name
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="HeadTable">
                      <DateRangeOutlinedIcon />
                      Due Date
                    </span>
                  </TableCell>
                  <TableCell align="center"><span className="HeadTable"><RuleOutlinedIcon/>Status</span></TableCell>
                  <TableCell align="center"><span className="HeadTable"><CreateOutlinedIcon/>Edit</span></TableCell>
                  <TableCell align="center"><span className="HeadTable"><DeleteOutlinedIcon/>Delete</span></TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{backgroundColor: "#D9D9D9"}}>
                {innerTodo.map((item) => {
                  return (
                    <TableTodoList todoItem={item}></TableTodoList>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </div>
    </>
  );
};

export default MainTodoList;