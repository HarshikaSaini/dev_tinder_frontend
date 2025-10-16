const Feed = () => {
  return (
    <div className="card bg-base-100 w-xl shadow-sm m-auto">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body bg-gray-700">
        <h2 className="card-title">
          Abhishek sharma
          <div className="badge badge-secondary">Male</div>
        </h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts A card component has a figure, a body part,
          and inside body there are title and actions parts
        </p>
        <div className="flex flex-row items-center justify-start gap-2 my-4">
         <div className="badge badge-primary ">Front End</div>
         <div className="badge badge-primary ">Back End</div>
         <div className="badge badge-primary ">LLM's</div>
         <div className="badge badge-primary ">Web Development</div>
         <div className="badge badge-primary ">Devops</div>
         </div>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
