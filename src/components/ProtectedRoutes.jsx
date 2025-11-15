import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = () => {
  const {data,loading} = useSelector((store) => store.user);
  if(loading) {
    return <div className="text-center p-6">Loding...</div>
  } 
  return data && data.data ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;