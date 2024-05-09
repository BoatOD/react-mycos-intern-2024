import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ITodo } from "./ITodo";
import { MobileDatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useForm } from "react-hook-form";
import { todoApi } from "../../api/TodoApi";

const FormTodo = ({
  open,
  onClose,
  getData,
  dataToEdit,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  getData: () => void;
  dataToEdit?: ITodo;
}) => {
  const [todoTaskName, setTodoTaskName] = useState<string>("");
  const [todoDescription, setTodoDescription] = useState<string>("");
  const [todoDate, setTodoDueDate] = useState<Dayjs | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ITodo>({
    defaultValues: {
      id: dataToEdit ? dataToEdit.id : undefined,
      title: dataToEdit ? dataToEdit.title : "",
      description: dataToEdit ? dataToEdit.description : "",
      status: dataToEdit ? dataToEdit.status : "Not Started",
    },
  });

  const inputProps = {
    style: {
      fontSize: 20,
      borderRadius: "20px",
      color: "#303030",
    },
  };

  const onFormValid = async (data: ITodo) => {
    data.dueDate = todoDate?.toISOString();
    data.status = dataToEdit?.status!;
    if (dataToEdit) {
      await todoApi.updateTodo(dataToEdit.id!, data)
    } else {
      await todoApi.addTodo(data);
    }
    onClose();
    getData();
    console.log("send to api success: ", data);
  };

  const onFormInValid = (err: any) => {
    console.log("form err: ", err);
  };

  const onSubmit = handleSubmit(onFormValid, onFormInValid);

  useEffect(() => {
    if (open) {
      if (dataToEdit) {
        setTodoTaskName(dataToEdit.title);
        setTodoDescription(dataToEdit.description);
        setTodoDueDate(dayjs(dataToEdit.dueDate));
      } else {
        setTodoTaskName("");
        setTodoDescription("");
        setTodoDueDate(null);
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          width: "100%",
          maxWidth: "80rem!important",
        },
      }}
    >
      <form onSubmit={onSubmit}>
        <DialogTitle fontWeight={700}>{dataToEdit ? "Edit Task" : "Add Task"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction={"column"}>
            <Grid item mt={1}>
              <TextField
                fullWidth
                error={!!errors?.title}
                label="Task Name"
                variant="outlined"
                value={todoTaskName}
                autoComplete="off"
                {...register("title", { required: true })}
                helperText={errors?.title ? "Task name is required" : ""}
                onChange={(e) => {
                  setTodoTaskName(e.target.value);
                }}
                InputProps={inputProps}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                {...register("description")}
                value={todoDescription}
                onChange={(event) => {
                  setTodoDescription(event.target.value);
                }}
                InputProps={inputProps}
              />
            </Grid>
            <Grid item container columnSpacing={2}>
              <Grid item>
                <MobileDatePicker
                  label="Due Date"
                  format="DD/MM/YYYY"
                  value={todoDate}
                  onChange={(value) => {
                    setTodoDueDate(value);
                  }}
                />
              </Grid>
              <Grid item>
                <MobileTimePicker
                  label="Time"
                  value={todoDate}
                  onChange={(value) => {
                    setTodoDueDate(value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2} justifyContent={"end"} mx={3} mb={3}>
            <Grid item xs={1.5}>
            <Button
                fullWidth
                onClick={onClose}
                color="secondary"
                sx={{ borderRadius: "100px", fontSize: "1.4rem" }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={1.5}>
              <Button
                fullWidth
                type="submit"
                disabled={isSubmitting}
                sx={{ borderRadius: "100px", fontSize: "1.4rem" }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default FormTodo;
