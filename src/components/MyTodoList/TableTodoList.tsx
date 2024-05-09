import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useCallback, useEffect, useState } from "react";
import { FormControl, Select, MenuItem, IconButton, Grid } from "@mui/material";
import { ITodo } from "../MyTodoList/ITodo";
import { todoApi } from "../../api/TodoApi";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import moment from "moment";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

// interface ITodoItemProps {
//   todoItem: ITodo;
// }

const TableTodoList = ({
  props,
  onEdit,
  onDelete,
}: {
  props: ITodo;
  onEdit: (todo: ITodo) => void;
  onDelete: (id: string) => void;
}) => {
  const todoItem = { ...props };
  const [innerTodo, setInnerTodo] = useState<ITodo>(todoItem);
  const [dateFormat, setDateFormat] = useState<string>("");
  const [timeFormat, setTimeFormat] = useState<string>("");
  const [statusColor, setStatusColor] = useState<string>("#F1F1F1");

  useEffect(() => {
    formatDataDate();
    changeColor(todoItem.status);
  }, []);

  const onSubmit = () => {
    console.log("Change Status to");
  };

  const formatDataDate = () => {
    const TodoClone = { ...todoItem };
    const date_str = TodoClone.dueDate;
    const date_obj = moment(date_str);
    setDateFormat(date_obj.format("MMMM Do YYYY"));
    setTimeFormat(date_obj.format("h:mm:ss a"));
    setInnerTodo(todoItem);
  };

  const changeColor = (status: "In Progress" | "Complete" | "Not Started") => {
    if (status === "In Progress") setStatusColor("#FFB038");
    else if (status === "Complete") setStatusColor("#61FF00");
    else setStatusColor("#E9E9E9");
  };

  const handleChange = async (event: any) => {
    const selectedStatus: "In Progress" | "Complete" | "Not Started" =
      event.target.value;

    try {
      await todoApi.updateStatus(innerTodo.id!, {
        ...innerTodo,
        status: selectedStatus,
      });
      changeColor(selectedStatus);
      console.log("Succeed");
    } catch {
      console.log("fail");
    }
  };

  const handleEdit = () => {
    onEdit(todoItem);
  };

  const handleDelete = async () => {
    onDelete(innerTodo.id!);
    // try {
    //   if (await ) {
    //     await todoApi.deleteTodos(innerTodo.id!);
    //     console.log("Succeed");
    //   }
    // } catch {
    //   console.log("fail");
    // }
  };

  return (
    <>
      <TableRow
        key={innerTodo.title}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          borderBottom: 2,
          borderColor: "#303030",
        }}
      >
        <TableCell
          component="th"
          scope="row"
          align="center"
          sx={{ fontSize: 20, fontFamily: "Poppins" }}
        >
          {innerTodo.title}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: 20, fontFamily: "Poppins" }}>
          <Grid container justifyContent={"center"} spacing={2} direction={"column"}>
            <Grid item sx={{color: "#303030"}}>
              {dateFormat !== "Invalid date" ? dateFormat : "None"}
            </Grid>
            <Grid item container direction={"row"} justifyContent={"center"} sx={{color: "#303030"}}>
              <AccessTimeOutlinedIcon sx={{fontSize: "1.5rem"}}/>
              <Grid sx={{color: "#303030", fontSize: "1.2rem"}}>{timeFormat !== "Invalid date" ? timeFormat: "None"}</Grid>
            </Grid>
          </Grid>
        </TableCell>
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
                sx={{
                  borderRadius: "100px",
                  backgroundColor: statusColor,
                  fontSize: 20,
                  fontFamily: "Poppins",
                  color: "#303030",
                }}
              >
                <MenuItem
                  value={"In Progress"}
                  sx={{ fontSize: 20, fontFamily: "Poppins", color: "#303030" }}
                >
                  In Progress
                </MenuItem>
                <MenuItem
                  value={"Complete"}
                  sx={{ fontSize: 20, fontFamily: "Poppins", color: "#303030" }}
                >
                  Complete
                </MenuItem>
                <MenuItem
                  value={"Not Started"}
                  sx={{ fontSize: 20, fontFamily: "Poppins", color: "#303030" }}
                >
                  Not Started
                </MenuItem>
              </Select>
            </FormControl>
          </form>
        </TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="edit"
            size="medium"
            onClick={handleEdit}
            sx={{
              border: 1,
              borderColor: "#0047FF",
              borderRadius: "5px",
              ":hover": {
                border: 2,
                borderColor: "#0047FF",
                backgroundColor: "#0047FF",
              },
            }}
          >
            <EditOutlinedIcon
              sx={{ color: "#0047FF", ":hover": { color: "#FFFFFF" } }}
            />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="delete"
            size="medium"
            onClick={handleDelete}
            sx={{
              border: 1,
              borderColor: "#FF0000",
              borderRadius: "5px",
              ":hover": {
                border: 2,
                borderColor: "#FF0000",
                backgroundColor: "#FF0000",
              },
            }}
          >
            <DeleteOutlinedIcon
              sx={{ color: "#FF0000", ":hover": { color: "#FFFFFF" } }}
            />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableTodoList;
