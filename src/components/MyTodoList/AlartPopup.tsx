import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { todoApi } from "../../api/TodoApi";

const AlartPopup = ({
  open,
  onClose,
  id,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
}) => {
  const handleDelete = async () => {
    try {
      await todoApi.deleteTodos(id);
      console.log("Succeed");
    } catch {
      console.log("fail");
    } finally {
        onClose();
    }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          width: "100%",
          maxWidth: "40rem!important",
          backgroundColor: "#F3D200",
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <WarningAmberOutlinedIcon
              sx={{ color: "#303030", fontSize: "10rem" }}
            />
          </Grid>
          <Grid item>
            <DialogContentText sx={{ color: "#303030", fontSize: "3rem" }}>
              Warning!!!
            </DialogContentText>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container justifyContent="center" alignItems="center">
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "#303030", fontSize: "1.8rem" }}
          >
            Do you want to remove this Task?
          </DialogContentText>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          mx={3}
          mb={3}
        >
          <Grid item container xs={6}>
            <Button
              onClick={onClose}
              sx={{
                borderRadius: "100px",
                fontSize: "1.4rem",
                backgroundColor: "#DBDBDB",
                ":hover": { backgroundColor: "#EAEAEA" },
              }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item container justifyContent="end" xs={6}>
            <Button
              onClick={handleDelete}
              autoFocus
              sx={{
                borderRadius: "100px",
                fontSize: "1.4rem",
                backgroundColor: "#FF4A4A",
                ":hover": { backgroundColor: "#FF1616" },
              }}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default AlartPopup;
