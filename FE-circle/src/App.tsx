import Home from "./pages/home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Reply from "./pages/reply";
import { useEffect, ReactNode } from "react";
import { API, setAuthToken } from "./libs/api";
import { useDispatch } from "react-redux";
import { AUTH_CHECK, AUTH_ERROR } from "./store/RootReducer";
import FollowsPage from "./pages/follows";
import SearchPage from "./pages/searchUser";
import ProfilePage from "./pages/profile";

function App() {
  const dispatch = useDispatch();
  async function authCheck() {
    try {
      setAuthToken(localStorage.token);
      const response = await API.get("/auth/check");
      dispatch(AUTH_CHECK(response.data));
    } catch (errorMessager) {
      dispatch(AUTH_ERROR());
      return <Navigate to={"/login"} />;
    }
  }
  useEffect(() => {
    if (localStorage.token) {
      authCheck();
    }
  }, []);

  function IsLogged({ children }: { children: ReactNode }) {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      return children;
    }
    return <Navigate to={"/login"} />;
  }

  function IsNotLogged({ children }: { children: ReactNode }) {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) {
      return children;
    }
    return <Navigate to={"/"} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={
            <IsNotLogged>
              <Register />
            </IsNotLogged>
          }
        />
        <Route
          path="/login"
          element={
            <IsNotLogged>
              <Login />
            </IsNotLogged>
          }
        />

        <Route
          path={`reply/:id`}
          element={
            <IsLogged>
              <Reply />
            </IsLogged>
          }
        />

        <Route
          path="/follows"
          element={
            <IsLogged>
              <FollowsPage />
            </IsLogged>
          }
        />
        <Route
          path="/"
          element={
            <IsLogged>
              <Home />
            </IsLogged>
          }
        />
        <Route
          path="/search"
          element={
            <IsLogged>
              <SearchPage />
            </IsLogged>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <IsLogged>
              <ProfilePage />
            </IsLogged>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
