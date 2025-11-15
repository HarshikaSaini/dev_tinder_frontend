import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { addUser,setLoading,removeUser } from "../redux/userSlice";
import axios from "axios";
import { useEffect } from "react";

function AuthInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading())
    const token = Cookies.get("token");
    if (token) {
      axios.get(
        import.meta.env.VITE_BASE_URL + "/profile/view",
        { withCredentials: true }
      )
      .then(res => {
        dispatch(addUser(res.data));
      })
      .catch(err => {
        dispatch(removeUser())
        console.log("Token invalid or expired",err);
      });
    }else{
        dispatch(removeUser())
        return
    }
  }, []);

  return null;
}

export default AuthInit;