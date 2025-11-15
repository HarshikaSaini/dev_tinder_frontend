import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConnections } from "../redux/connectionSlice";
import { capitalizeFirst } from "../utils/utls";
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
    <>
      {connections.length > 0 ? (
        <div className="grid gap-4 p-2.5">
          {connections.map((item, index) => (
            <div
              key={index}
              className="card h-125 min-w-3 md:h-60 card-side bg-base-200 shadow-sm flex flex-col md:flex-row"
            >
              <figure className="h-full md:w-1/3">
                <img className="h-full w-full object-fill rounded" src={item.photoUrl} alt="photoUrl"/>
              </figure>

              <div className="card-body w-full md:w-1/2">
                <h2 className="card-title text-sm md:text-md">
                  {capitalizeFirst(item.firstName) + " " + capitalizeFirst(item.lastName)}
                </h2>

                <p className="h-10 md:h-16 overflow-hidden text-ellipsis text-sm md:text-md">
                  {capitalizeFirst(item.desc)}
                </p>

                <div className="card-actions justify-center md:justify-end mt-3">
                  <Link to={`/chat/${item._id}`} className="btn btn-primary text-[12px] md:text-md">
                    CHAT
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex text-md text-center md:text-md lg:text-xl p-5 h-full items-center justify-center ">
          No Connections to show...<br></br> Please go to feeds to make new Friends.
        </div>
      )}
    </>
  );
};

export default Connections;
