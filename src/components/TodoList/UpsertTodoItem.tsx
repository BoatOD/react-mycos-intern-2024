import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpsertTodoItem = () => {
  const navigate = useNavigate();
  const [todoName, setTodoName] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  // const onSave = async () => {
  //   if (!todo?.id && !todo) {
  //     await todoApi.addTodo({
  //       name: todoName,
  //       isDone: false,
  //       detail: todoDetail,
  //     });
  //   } else {
  //     await todoApi.updateTodo(todo.id!, {
  //       ...todo,
  //       detail: todoDetail,
  //       name: todoName,
  //     });
  //   }
  //   navigate("/todos");
  // };
  // const loadTodo = useCallback(async (id: string) => {
  //   const res = await todoApi.getTodo(id);
  //   setTodo(res.data);
  //   setTodoName(res.data.name ?? "");
  //   setTodoDetail("");
  // }, []);

  // useEffect(() => {
  //   if (id) {
  //     loadTodo(id);
  //   }
  // }, [id, loadTodo]);

  return (
    <div>
      <Grid container spacing={1} direction={"column"}>
        <Grid item>
          <TextField
            label="Name"
            variant="outlined"
            value={todoName}
            onChange={(e) => {
              setTodoName(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Detail"
            variant="outlined"
            value={todoDetail}
            onChange={(e) => {
              setTodoDetail(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent={"end"} pt={3}>
        <Grid item>
          {/* <Button onClick={onSave}>Save</Button> */}
        </Grid>
        <Grid item>
          <Button onClick={() => navigate("/todos")} color="secondary">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpsertTodoItem;
