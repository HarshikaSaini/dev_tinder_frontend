import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeRequest } from "../redux/requestSlice";
import { fetchConnections } from "../redux/connectionSlice";
import { capitalizeFirst } from "../utils/utls";
const Notification = () => {
  const request = useSelector((store) => store.request)
  const dispatch = useDispatch()

  const handleRequest = async (status, id) => {
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/request/received/${status}/${id}`,{},{ withCredentials: true }
      );
      if(res.status == 200){
        if(status == "accepted"){
          dispatch(fetchConnections())
          dispatch(removeRequest(id))
        }else{
          dispatch(removeRequest(id))
        }
      }
    } catch (error) {
        console.log(error)
    }
  };
 
  return (
    <div className="absolute top-full right-[-20px] md:right-1 mt-2 z-10  min-h-20 bg-base-100 rounded-md w-60 sm:w-70 md:w-90 ">
      {request && request.length > 0 ? (
        <ul className="list rounded shadow-md p-2">
          {request.map((item, index) => (
            <li className="list-row gap-2 items-center hover:bg-base-300 py-2" key={index}>
              <div>
                <img className="size-10 md:size-12 rounded-box" src={item.fromUserId.photoUrl} />
              </div>
              <div className="text-[10px] md:text-xs">
                <div >{capitalizeFirst(item.fromUserId.firstName) + " " + capitalizeFirst(item.fromUserId.lastName)}</div>
                <div className="uppercase font-semibold opacity-60">
                  {item?.fromUserId.age !== undefined && item?.fromUserId.age + "yr ,"}  {item.fromUserId.gender !== undefined && capitalizeFirst(item.fromUserId.gender)}
                </div>
              </div>
              <button
                className="btn btn-square btn-ghost"
                onClick={()=>handleRequest("accepted", item._id)}
              >
                <img src="/correct.svg" height={5} width={20} />
              </button>
              <button
                className="btn btn-square btn-ghost"
                onClick={()=>handleRequest("rejected", item._id)}
              >
                <img src="/delete-red.svg" height={5} width={20} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-sm md:text-md text-gray-50 text-center mt-7 md:mt-5 ">
          No New Request !
        </div>
      )}
    </div>
  );
};

export default Notification;
