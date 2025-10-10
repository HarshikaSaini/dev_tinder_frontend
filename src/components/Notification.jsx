import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeRequest } from "../redux/requestSlice";
import { addConnection } from "../redux/connectionSlice";

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
        console.log(res.data.data)
        if(status == "accepted"){
          dispatch(addConnection(res.data.data))
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
    <div className="absolute top-full right-1 mt-2 z-10  min-h-20 bg-base-300 rounded-md shadow shadow-gray-700  w-100 ">
      {request && request.length > 0 ? (
        <ul className="list  rounded shadow-md">
          {request.map((item, index) => (
            <li className="list-row" key={index}>
              <div>
                <img className="size-12 rounded-box" src={item.fromUserId.photoUrl} />
              </div>
              <div>
                <div>{item.fromUserId.firstName + " " + item.fromUserId.lastName}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {item.fromUserId.age},   {item.fromUserId.gender}
                </div>
              </div>
              <p className="list-col-wrap text-xs">{item.fromUserId.desc}</p>
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
        <div className="text-md text-gray-50 text-center mt-5 ">
          No New Request !
        </div>
      )}
    </div>
  );
};

export default Notification;
