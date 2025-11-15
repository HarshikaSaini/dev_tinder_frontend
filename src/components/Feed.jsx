import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed, removeFeed } from "../redux/feedSlice";
import axios from "axios";
import { capitalizeFirst } from "../utils/utls";

const Feed = () => {
  const dispatch = useDispatch();
  const { data: feed, loading, error } = useSelector((store) => store.feed);

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  const handleRequest = async (status, id) => {
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/request/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      if (resp.status == 200) {
        dispatch(removeFeed(id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        You got an error - {error.status}, {error.message}
      </p>
    );
  return (
    <div className="grid grid-cols-1 gap-4 m-auto max-w-[500px] py-3  px-3 md:py-5 lg:py-7">
      {feed.length > 0 ? feed.map((item) => {
        return (
          <div
            key={item._id}
            className="card bg-base-100 w-full shadow-sm m-auto"
          >
            <figure className="h-full md:h-[360px] ">
              <img
                src={item.photoUrl}
                alt="User-img"
                className="w-full h-full"
              />
            </figure>
            <div className="card-body bg-gray-700 px-3 py-2">
              <h2 className="card-title text-sm md:text-lg">
                {capitalizeFirst(item.firstName)} {capitalizeFirst(item.lastName)}
                <div className="rounded text-[10px] md:text-[15px]  px-2 bg-gray-500 ">
                  {capitalizeFirst(item.gender)}
                </div>
              </h2>
              <p className="line-clamp-3">{capitalizeFirst(item.desc)}</p>

              {item.skills && (
                <div className="flex sm:flex-col md:flex-row items-center justify-start gap-2 my-2 md:my-4 w-full h-20 flex-wrap">
                  {item.skills.map((skill) => (
                    <div className="badge badge-primary text-[10px] sm:text-[12px] md:text-[13px] py-[2px] sm:px-1 sm:py-3  md:px-3 md:py-4">
                      {capitalizeFirst(skill)}
                    </div>
                  ))}
                </div>
              )}
              <div className="card-actions justify-end mt-2">
                <div
                  onClick={() => handleRequest("ignore", item._id)}
                  className="cursor-pointer rounded px-2 py-[3px] sm:px-3 sm:py-2 md:px-4 md:py-[10px] bg-red-500"
                >
                  Ignore
                </div>
                <div
                  onClick={() => handleRequest("intrested", item._id)}
                  className="cursor-pointer border rounded  px-2 py-[1px] sm:px-3 sm:py-1 md:px-4 md:py-2"
                >
                  Intrested
                </div>
              </div>
            </div>
          </div>
        );
      }):<>Seems you looked all the users on the platform !!</>}
    </div>
  );
};

export default Feed;
