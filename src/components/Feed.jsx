const Feed = () => {
  return (
    <div className="card bg-base-100 w-xl shadow-sm m-auto">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Abhishek sharma
          <div className="badge badge-secondary">Male</div>
        </h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts  A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
