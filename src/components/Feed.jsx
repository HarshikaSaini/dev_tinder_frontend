const Feed = () => {
  return (
    <div className="card bg-base-100 md:w-xl shadow-sm m-auto">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body bg-gray-700 gap-3">
        <h2 className="card-title text-sm md:text-lg">
          Abhishek sharma
          <div className="rounded text-[10px] md:text-[15px]  px-2 bg-pink-500 ">
            Male
          </div>
        </h2>
        <p className="line-clamp-3">
          A card component has a figure, a body part, and inside body there are
          title and actions parts A card component has a figure, a body part,
          and inside body there are title and actions parts, A card component
          has a figure.
        </p>

        <div className="flex sm:flex-col md:flex-row items-center justify-start gap-2 my-2 md:my-4 w-full h-20 flex-wrap">
          <div className="badge badge-primary text-[10px] sm:text-[12px] md:text-[13px] py-[2px] sm:px-1 sm:py-3  md:px-3 md:py-4">
            Front End
          </div>
          <div className="badge badge-primary text-[10px] sm:text-[12px] md:text-[13px] py-[2px] sm:px-1 sm:py-3  md:px-3 md:py-4">
            Back End
          </div>
          <div className="badge badge-primary text-[10px] sm:text-[12px] md:text-[13px] py-[2px]  sm:px-1 sm:py-3  md:px-3 md:py-4">
            LLM's
          </div>
          <div className="badge badge-primary text-[10px] sm:text-[12px] md:text-[13px] py-[2px]  sm:px-1 sm:py-3  md:px-3 md:py-4">
            Web Development
          </div>
          <div className="badge badge-primary text-[10px] sm:text-[12px] md:text-[13px] py-[2px] sm:px-1 sm:py-3  md:px-3 md:py-4">
            Devops
          </div>
          <div className="badge badge-primary text-[10px] sm:text-[12px] md:text-[13px] py-[2px] sm:px-1 sm:py-3  md:px-3 md:py-4">
            Web Development addasdsa
          </div>
        </div>

        <div className="card-actions justify-end">
          <div className="rounded px-2 py-[1px] sm:px-3 sm:py-1 md:px-4 md:py-2 bg-red-500">
            Ignore
          </div>
          <div className="border rounded  px-2 py-[1px] sm:px-3 sm:py-1 md:px-4 md:py-2">
            Intrested
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
