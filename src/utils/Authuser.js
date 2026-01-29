import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";
import axios from "axios";
import { useEffect } from "react";

function AuthInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BASE_URL + "/profile/view", {
        withCredentials: true,
      })
      .then((res) => dispatch(addUser(res.data)))
      .catch(() => dispatch(removeUser()));
  }, []);
  return null;
}

export default AuthInit;
