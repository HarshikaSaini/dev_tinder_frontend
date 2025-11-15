import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    let {name,value} = e.target
    setUserData(prev => ({...prev, [name]:value}))
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "/signup",
        {
          firstName:userData.firstName,
          lastName:userData.lastName,
          email:userData.email,
          password:userData.password
        },
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      setError(error?.response?.data?.mess || "Something went wrong !");
    }
  };
  return (
    <div className="flex justify-center items-center h-full p-4">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
        <legend className="fieldset-legend text-2xl">Sign Up Form</legend>
        <label htmlFor="first-name" className="label text-md">
          First Name
        </label>
        <input
          type="text"
          id="first-name"
          name="firstName"
          value={userData.firstName}
          onChange={(e) => handleInputChange(e)}
          className="input outline-none focus:outline-none mb-4"
          placeholder="Enter your first name"
        />

        <label htmlFor="last-name" className="label text-md">
          Last Name
        </label>
        <input
          type="text"
          id="last-name"
          name="lastName"
          value={userData.lastName}
          onChange={(e) => handleInputChange(e)}
          className="input outline-none focus:outline-none mb-2"
          placeholder="Enter your last name"
        />

        <label htmlFor="email" className="label text-md">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={(e) => handleInputChange(e)}
          className="input outline-none focus:outline-none mb-4"
          placeholder="Enter your email"
        />

        <label htmlFor="password" className="label text-md">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={(e) => handleInputChange(e)}
          className="input outline-none focus:outline-none mb-4"
          placeholder="Enter your password"
        />

        <p className={`min-h-4 pl-1 ${error ? "text-red-500" : "invisible"}`}>
          {error}
        </p>
        <button onClick={handleSignup} className="btn btn-neutral mt-3">
          Submit
        </button>
      </fieldset>
    </div>
  );
};

export default Register;
