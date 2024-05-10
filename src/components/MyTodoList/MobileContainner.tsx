// import { Grid, Typography } from "@mui/material";
// import { ITodo } from "./ITodo";
// import { useEffect, useState } from "react";
// import moment from "moment";
// import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
// import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

// const MobileContainner = ({
//   props,
//   onEdit,
//   onDelete,
// }: {
//   props: ITodo;
//   onEdit: (todo: ITodo) => void;
//   onDelete: (id: string) => void;
// }) => {
//   const todoItem = { ...props };
//   const [innerTodo, setInnerTodo] = useState<ITodo>(todoItem);
//   const [dateFormat, setDateFormat] = useState<string>("");
//   const [timeFormat, setTimeFormat] = useState<string>("");
//   const [statusColor, setStatusColor] = useState<string>("#F1F1F1");

//   const formatDataDate = () => {
//     const TodoClone = { ...todoItem };
//     const date_str = TodoClone.dueDate;
//     const date_obj = moment(date_str);
//     setDateFormat(date_obj.format("MMMM Do YYYY"));
//     setTimeFormat(date_obj.format("h:mm:ss a"));
//     setInnerTodo(todoItem);
//   };

//   useEffect(() => {
//     formatDataDate();
//     // changeColor(todoItem.status);
//   }, []);

//   return (
//     <>
//       <Grid
//         container
//         sx={{ backgroundColor: "#F3D200", borderRadius: "20px" }}
//         direction={"row"}
//         spacing={3}
//         pb={3}
//       >
//         <Grid
//           item
//           container
//           xs={0.5}
//           justifyContent={"center"}
//           alignItems={"center"}
//         >
//           <AdjustOutlinedIcon sx={{ color: "#000" }} />
//         </Grid>
//         <Grid item xs={7} container sx={{ borderRadius: "20px" }}>
//           <Grid item sx={{ borderBottom: 2, borderColor: "#303030", mb: 1 }}>
//             <Typography color={"#000"} fontSize={16}>
//               {innerTodo.title}
//             </Typography>
//           </Grid>
//           <Grid item container spacing={2}>
//             <Grid item xs={12} container direction={"row"} columnSpacing={2}>
//               <Grid item xs={10} container direction={"row"}>
//                 <Grid item>
//                   <CalendarTodayOutlinedIcon
//                     fontSize="small"
//                     sx={{ color: "#000" }}
//                   />
//                 </Grid>
//                 <Grid item>
//                   <Typography color={"#000"} fontSize={13}>
//                     {dateFormat}
//                   </Typography>
//                 </Grid>
//               </Grid>
//               <Grid item xs={10} container direction={"row"}>
//                 <Grid item>
//                   <AccessTimeOutlinedIcon
//                     fontSize="small"
//                     sx={{ color: "#000" }}
//                   />
//                 </Grid>
//                 <Grid item>
//                   <Typography color={"#000"} fontSize={13}>
//                     {timeFormat}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid
//           item
//           xs={4}
//           container
//           justifyContent={"start"}
//           alignItems={"center"}
//         >
//           <Grid item sx={{backgroundColor: "green", borderRadius: "100px"}}>
//             <Typography color={"#000"} fontSize={10} margin={1}>
//               {innerTodo.status}
//             </Typography>
//           </Grid>
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default MobileContainner;
