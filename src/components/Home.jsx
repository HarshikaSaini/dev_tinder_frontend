const Home = () => {
  return (
    <div className="flex flex-col md:flex-row lg:flex-row h-full w-full px-2 md:p-10">
      <div className="flex flex-col justify-center items-center h-full w-full md:w-1/2  md:p-5">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold my-2">Let's Stay Connected</h1>
        <p className="text-center font-normal md:font-bold lg:font-bold">
         
          Find people who code like you, think like you, and inspire you..<br></br>
          Swipe, match, chat — and build something amazing.{" "}
        </p>
      </div>
      <div className="flex w-full  md:w-1/2  h-full items-center justify-center object-contain">
        <img src="/tech.webp" />
      </div>
    </div>
  );
};

export default Home;
