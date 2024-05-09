import UpsertTodoItem from "../components/TodoList/UpsertTodoItem";
import { Box } from "@mui/material";

const TodoUpsertPage = () => {
  return (
    <div>
      <Box p={3}>
        <UpsertTodoItem />
      </Box>
    </div>
  );
};

export default TodoUpsertPage;
