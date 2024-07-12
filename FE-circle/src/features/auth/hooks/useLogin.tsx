import { ChangeEvent, useState } from "react";
import { ILogin } from "../../../interface/user.interface";
import { API, setAuthToken } from "../../../libs/api";
import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { AUTH_CHECK, AUTH_ERROR } from "../../../store/RootReducer";
import { useDispatch } from "react-redux";

export function useLogin() {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<ILogin>({
    emailOrUsername: "",
    password: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const dispatch = useDispatch();
  async function authCheck() {
    try {
      setAuthToken(localStorage.token);
      const response = await API.get("/auth/check");
      dispatch(AUTH_CHECK(response.data));
    } catch (error) {
      console.log(error);
      dispatch(AUTH_ERROR());
      return <Navigate to={"/login"} />;
    }
  }

  async function handleLogin() {
    setLoading(true);
    try {
      const response = await API.post("/login", form);
      localStorage.setItem("token", response.data.token);
      setAuthToken(response.data.token);
      toast({
        title: response?.data.message,
        status: "success",
        position: "top",
        duration: 1000,
      });
      authCheck();
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        toast({
          title: error?.response?.data.message,
          status: "error",
          position: "top",
          duration: 1000,
        });
      }
    }
  }

  return {
    handleChange,
    handleLogin,
    form,
    loading,
  };
}
