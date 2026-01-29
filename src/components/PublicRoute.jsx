import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const PublicRoute = () => {
  const { data, loading } = useSelector((store) => store.user);
  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }
  return data && data.data ? <Navigate to="/feed" replace /> : <Outlet />;
};
export default PublicRoute;
