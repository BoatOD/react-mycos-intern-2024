import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { todoApi } from "../../api/TodoApi";
import TableTodoList from "./TableTodoList";
import { ITodo } from "../MyTodoList/ITodo";
import "../../css/MainTodo.css";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import RuleOutlinedIcon from "@mui/icons-material/RuleOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FormTodo from "./FormTodo";
import AlartPopup from "./AlartPopup";
// import MobileContainner from "./MobileContainner";

const MainTodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [innerTodo, setInnerTodo] = useState<ITodo[]>([]);
  const [sortData, setSortData] = useState<string>("All");
  const [todoToEdit, setTodoToEdit] = useState<ITodo | undefined>();
  const [isAddActive, setIsAddActive] = useState<boolean>(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<string>("");

  const getTodos = useCallback(async () => {
    const result = await todoApi.getTodos();
    setTodos(result.data);
    addSortType(result.data);
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = "#303030";
    getTodos();
  }, []);

  const addSortType = (data: ITodo[]) => {
    let sortedTodos: ITodo[] = data.map<ITodo>((e) => {
      if (e.status === "In Progress") return { ...e, sortType: 1 };
      else if (e.status === "Not Started") return { ...e, sortType: 2 };
      else {
        return { ...e, sortType: 3 };
      }
    });

    setInnerTodo(
      sortedTodos.sort((a, b) => {
        if (a.sortType !== undefined && b.sortType !== undefined) {
          return a.sortType > b.sortType ? 1 : -1;
        } else {
          return 0;
        }
      })
    );
  };

  const handleSortStatus = (value: string) => {
    const selectedStatus = value;

    let sortedTodos = [...todos];

    if (selectedStatus === "All") {
      sortedTodos = [...todos];
    } else {
      sortedTodos = sortedTodos.filter(
        (todo) => todo.status === selectedStatus
      );
    }
    setInnerTodo(sortedTodos);
    handleSortData(sortData, sortedTodos);
  };

  const handleSortData = (value: string, Data?: ITodo[]) => {
    const selectedSort = value;
    setSortData(selectedSort);
    let sortedTodos: ITodo[];

    if (Data) {
      sortedTodos = Data;
    } else {
      sortedTodos = [...innerTodo];
    }

    if (selectedSort === "All") {
      sortedTodos.sort((a, b) => {
        if (a.sortType !== undefined && b.sortType !== undefined) {
          return a.sortType - b.sortType;
        } else {
          return 0;
        }
      });
    } else if (selectedSort === "Latest First") {
      sortedTodos.sort((a, b) => (a.createDate > b.createDate ? 1 : -1));
    } else if (selectedSort === "Oldest First") {
      sortedTodos.sort((a, b) => (a.createDate > b.createDate ? -1 : 1));
    } else {
      sortedTodos.sort((a, b) => {
        if (a.dueDate !== undefined && b.dueDate !== undefined) {
          return a.dueDate > b.dueDate ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
    setInnerTodo(sortedTodos);
  };

  const handleSearch = (event: any) => {
    const searchTerm = event.target.value.toLowerCase();

    let filteredTodos = [...todos];

    if (searchTerm) {
      filteredTodos = filteredTodos.filter((todo) => {
        const lowerCaseTask = todo.title.toLowerCase();
        return lowerCaseTask.includes(searchTerm);
      });
    }

    setInnerTodo(filteredTodos);
  };

  const handleDelete = (id: string) => {
    setIdToDelete(id);
    setShowDeleteAlert(true);
    return true;
  };

  return (
    <>
      <div>
        <Stack my={10} mx={10} spacing={3}>
          <h1>Todo</h1>
          <Grid container>
            <Grid item container direction={"row"} columnSpacing={3} xs={10.5}>
              <Grid item xs={2}>
                <InputLabel
                  id="status-sort-label"
                  sx={{ fontSize: 26, color: "#E9E9E9", fontFamily: "Poppins" }}
                >
                  Status
                </InputLabel>
                <Select
                  labelId="status-sort-label"
                  id="status"
                  defaultValue="All"
                  label="Status"
                  onChange={(event) => {
                    handleSortStatus(event.target.value);
                  }}
                  aria-describedby="select-sort-by-status"
                  sx={{
                    fontFamily: "Poppins",
                    borderRadius: "100px",
                    backgroundColor: "#F5DD61",
                    fontSize: 20,
                    color: "#303030",
                    width: "100%",
                  }}
                >
                  <MenuItem
                    value={"All"}
                    sx={{
                      fontSize: 20,
                      fontFamily: "Poppins",
                      color: "#303030",
                    }}
                  >
                    All
                  </MenuItem>
                  <MenuItem
                    value={"In Progress"}
                    sx={{
                      fontSize: 20,
                      fontFamily: "Poppins",
                      color: "#303030",
                    }}
                  >
                    In Progress
                  </MenuItem>
                  <MenuItem
                    value={"Complete"}
                    sx={{
                      fontSize: 20,
                      fontFamily: "Poppins",
                      color: "#303030",
                    }}
                  >
                    Complete
                  </MenuItem>
                  <MenuItem
                    value={"Not Started"}
                    sx={{
                      fontSize: 20,
                      fontFamily: "Poppins",
                      color: "#303030",
                    }}
                  >
                    Not Started
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={2}>
                <InputLabel
                  id="data-sort-label"
                  sx={{ fontSize: 26, color: "#E9E9E9", fontFamily: "Poppins" }}
                >
                  Sort By
                </InputLabel>
                <Select
                  labelId="data-sort-label"
                  id="status"
                  defaultValue="All"
                  onChange={(event) => {
                    handleSortData(event.target.value);
                  }}
                  aria-describedby="select-sort-by-data"
                  sx={{
                    fontFamily: "Poppins",
                    borderRadius: "100px",
                    backgroundColor: "#F5DD61",
                    fontSize: 20,
                    color: "#303030",
                    width: "100%",
                  }}
                >
                  <MenuItem
                    value={"All"}
                    sx={{
                      fontSize: 20,
                      fontFamily: "Poppins",
                      color: "#303030",
                    }}
                  >
                    All
                  </MenuItem>
                  <MenuItem
                    value={"Latest First"}
                    sx={{
                      fontSize: 20,
                      fontFamily: "Poppins",
                      color: "#303030",
                    }}
                  >
                    Latest First
                  </MenuItem>
                  <MenuItem
                    value={"Oldest First"}
                    sx={{
                      fontSize: 20,
                      fontFamily: "Poppins",
                      color: "#303030",
                    }}
                  >
                    Oldest First
                  </MenuItem>
                  <MenuItem
                    value={"Recent Date"}
                    sx={{
                      fontSize: 20,
                      fontFamily: "Poppins",
                      color: "#303030",
                    }}
                  >
                    Recent Date
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <InputLabel
                  id="search-label"
                  sx={{ fontSize: 26, color: "#E9E9E9", fontFamily: "Poppins" }}
                >
                  Search
                </InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Looking for something..."
                  onChange={handleSearch}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlinedIcon sx={{ color: "#303030" }} />
                      </InputAdornment>
                    ),
                    style: {
                      fontSize: 20,
                      borderRadius: "100px",
                      backgroundColor: "#FFF",
                      fontFamily: "Poppins",
                      color: "#303030",
                    },
                  }}
                  sx={{
                    width: "100%",
                  }}
                />
              </Grid>
            </Grid>
            <Grid item container alignItems="end" xs={1.5}>
              <Button
                sx={{
                  width: "100%",
                  minHeight: "62%",
                  borderRadius: "100px",
                  fontSize: "24px",
                  color: "#303030",
                  backgroundColor: "#5CF100",
                  ":hover": { backgroundColor: "#95FF54" },
                }}
                onClick={() => {
                  setIsAddActive(true);
                  setTodoToEdit(undefined);
                }}
              >
                <AddOutlinedIcon sx={{ fontSize: "35px" }} />
                Add Task
              </Button>
            </Grid>
          </Grid>
          <TableContainer component={Paper} sx={{ borderRadius: 5 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#F3D200" }}>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontFamily: "Poppins", color: "#303030" }}
                  >
                    <span className="HeadTable">
                      <ArticleOutlinedIcon />
                      Task Name
                    </span>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontFamily: "Poppins", color: "#303030" }}
                  >
                    <span className="HeadTable">
                      <DateRangeOutlinedIcon />
                      Due Date
                    </span>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontFamily: "Poppins", color: "#303030" }}
                  >
                    <span className="HeadTable">
                      <RuleOutlinedIcon />
                      Status
                    </span>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontFamily: "Poppins", color: "#303030" }}
                  >
                    <span className="HeadTable">
                      <CreateOutlinedIcon />
                      Edit
                    </span>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontFamily: "Poppins", color: "#303030" }}
                  >
                    <span className="HeadTable">
                      <DeleteOutlinedIcon />
                      Remove
                    </span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: "#D9D9D9" }}>
                {innerTodo.map((item) => {
                  return (
                    <TableTodoList
                      props={item}
                      onDelete={(id) => handleDelete(id)}
                      onEdit={(e) => {
                        setTodoToEdit(e);
                        setIsAddActive(true);
                      }}
                      key={item.id}
                    ></TableTodoList>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <Grid
            container
            direction={"column"}
            justifyContent={"center"}
            rowSpacing={6}
          >
            {innerTodo.map((item) => {
              return (
                <Grid item xs={1}>
                  <MobileContainner
                    props={item}
                    onDelete={(id) => handleDelete(id)}
                    onEdit={(e) => {
                      setTodoToEdit(e);
                      setIsAddActive(true);
                    }}
                    key={item.id}
                  ></MobileContainner>
                </Grid>
              );
            })}
          </Grid> */}
        </Stack>
        <FormTodo
          open={isAddActive}
          onClose={() => {
            setIsAddActive(false);
          }}
          getData={() => {
            getTodos();
          }}
          onSuccess={getTodos}
          dataToEdit={todoToEdit}
        />
        <AlartPopup
          open={showDeleteAlert}
          onClose={() => {
            setShowDeleteAlert(false);
            getTodos();
          }}
          id={idToDelete}
        />
      </div>
    </>
  );
};

export default MainTodoList;
