import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useCallback, useEffect, useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { ITodo } from "../MyTodoList/ITodo";
import { todoApi } from "../../api/TodoApi";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import moment from "moment";

interface ITodoItemProps {
  todoItem: ITodo;
}

const TableTodoList = (props: ITodoItemProps) => {
  const { todoItem } = props;
  const [innerTodo] = useState<ITodo>(todoItem);
  const [dateFormat, setDateFormat] = useState<string>('');

  useEffect(() => {
    const date_str = innerTodo.dueDate;
    const date_obj = moment(date_str);
    setDateFormat(date_obj.format("DD-MM-YYYY"));
  }, []);

  const onSubmit = () => {
    console.log("Change Status to");
  };

  const handleChange = useCallback(async (event: any) => {
    console.log("Change Status to", event.target.value);
    try {
      await todoApi.updateStatus(innerTodo.id, {
        ...innerTodo,
        status: event.target.value,
      });
      console.log("Succeed");
    } catch {
      console.log("fail");
    }
  }, []);

  // const handleDelete = async () => {
  //   try {
  //       await todoApi.deleteTodos(innerTodo.id)
  //       console.log("Succeed");
  //     } catch {
  //       console.log("fail");
  //     }
  // }

  return (
    <>
      <TableRow
        key={innerTodo.title}
        sx={{ "&:last-child td, &:last-child th": { border: 0 }, borderBottom: 2, borderColor: "#303030" }}
      >
        <TableCell component="th" scope="row" align="center" sx={{fontSize: 20}}>
          {innerTodo.title}
        </TableCell>
        <TableCell align="center" sx={{fontSize: 20}}>{dateFormat}</TableCell>
        <TableCell align="center">
          <form onSubmit={onSubmit}>
            <FormControl fullWidth>
              <Select
                labelId="status-select-label"
                id="status"
                defaultValue={innerTodo.status}
                onChange={(event) => {
                  handleChange(event);
                }}
                aria-describedby="select-status-helper-text"
                sx={{borderRadius: '100px', backgroundColor: "#F1F1F1", fontSize: 20}}
              >
                <MenuItem value={"In Progress"} sx={{fontSize: 20}}>In progress</MenuItem>
                <MenuItem value={"Complete"} sx={{fontSize: 20}}>Complete</MenuItem>
                <MenuItem value={"Not Started"} sx={{fontSize: 20}}>Not Started</MenuItem>
              </Select>
            </FormControl>
          </form>
        </TableCell>
        <TableCell align="center">
          <IconButton aria-label="edit" size="medium" sx={{ border: 1, borderColor: '#0047FF', borderRadius: '5px', ":hover": {border: 2, borderColor: '#0047FF', backgroundColor: "#0047FF"}}}>
            <EditOutlinedIcon sx={{color: "#0047FF", ":hover": {color: "#FFFFFF"}}}/>
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton aria-label="delete" size="medium" sx={{ border: 1, borderColor: '#FF0000', borderRadius: '5px', ":hover": {border: 2, borderColor: '#FF0000', backgroundColor: "#FF0000"}}}>
            <DeleteOutlinedIcon sx={{color: "#FF0000", ":hover": {color: "#FFFFFF"}}}/>
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableTodoList;
