import { ThemeProvider } from "@mui/material";
import { themeConfig } from "./config/themeConfig";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import PageLayout from "./pages/PageLayout";
import TodoUpsertPage from "./pages/TodoUpsertPage";
import MainTodoList from "./components/MyTodoList/MainTodoList";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface IROUTE {
  path: string;
  component: JSX.Element;
}

const ROUTES: IROUTE[] = [
  {
    path: "/todos",
    component: <DashboardPage />,
  },
  {
    path: "/todos/new",
    component: <TodoUpsertPage />,
  },
  {
    path: "/todos/:id",
    component: <TodoUpsertPage />,
  },
  {
    path: "/profile",
    component: <Profile />,
  },
  {
    path: "/todos/my",
    component: <MainTodoList />,
  },
];

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={themeConfig}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageLayout />}>
              <Route path="*" element={<Navigate to="/todos/my" replace />} />
              <Route path="/" element={<Navigate to="/todos/my" replace />} />
              {ROUTES.map((r) => (
                <Route path={r.path} element={r.component} key={r.path} />
              ))}
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
