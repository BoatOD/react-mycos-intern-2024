import { ThemeProvider } from "@mui/material";
import { themeConfig } from "./config/themeConfig";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import PageLayout from "./pages/PageLayout";
import TodoUpsertPage from "./pages/TodoUpsertPage";
import MainTodoList from "./components/MyTodoList/MainTodoList";
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
    <ThemeProvider theme={themeConfig}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route path="*" element={<Navigate to="/todos" replace />} />
            <Route path="/" element={<Navigate to="/todos" replace />} />
            {ROUTES.map((r) => (
              <Route path={r.path} element={r.component} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
