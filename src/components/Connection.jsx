import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConnections } from "../redux/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const {
    data: connections,
    loading,
    error,
  } = useSelector((store) => store.connection);

  useEffect(() => {
    if (connections.length <= 0) {
      dispatch(fetchConnections());
    }
  }, [dispatch]);
  
  if (loading) return <p>Loading ..</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="grid gap-4 ">
      {connections ? (
        connections.map((item, index) => (
          <div
            key={index}
            className="card h-52 card-side bg-base-200 shadow-sm"
          >
            <figure className="w-1/3">
              <img src={item.photoUrl} alt="photoUrl" />
            </figure>
            <div className="card-body w-1/2">
              <h2 className="card-title">
                {item.firstName + " " + item.lastName}
              </h2>
              <p className="h-16 overflow-hidden text-ellipsis">{item.desc}</p>
              <div className="card-actions justify-end">
                <Link to="/chat" className="btn btn-primary">CHAT</Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className=" flex text-2xl items-center justify-center ">
          No Connections to show !
        </div>
      )}
    </div>
  );
};

export default Connections;
