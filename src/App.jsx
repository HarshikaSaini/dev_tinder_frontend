import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Request from "./components/Connection";
import Chats from "./components/chat";
import Register from "./components/Register";
import Home from "./components/Home";
import Body from "./Body";
import AuthInit from "./utils/Authuser";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
      <AuthInit />
        <Routes>
          <Route element={<Body />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat/:targeted_user_id" element={<Chats />} />
              <Route path="/connections" element={<Request />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
