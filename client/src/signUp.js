import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import unregProfile from "./images/profile_Reg.png";
import regProfile from "./images/profile_Unreg.png";
import frame from "./images/frame.png";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

        // Confirm Password
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("https://localhost:4000/register", {
              firstName,
              lastName,
              dob,
              mail,
              password,
            });

            const userToken = response.data.token;
          
            localStorage.setItem('token', userToken);
          
            // Redirect to login page with success message
            navigate('/login',{state : { successMessage: 'New user successfully registered. Please login to Continue...!' }});

        } catch (error) {
            console.error(error);
            setError("Registration failed. Please try again."); // Set an error message
        }
    };

  return (
    <div className="flex flex-col lg:flex-row bg-black p-8">
        <div className="lg:w-3/5 lg:float-left text-gray-300 bg-gradient-to-r from-black to-fuchsia-700 py-18 px-8 md:px-16 shadow-xl">
            <form
                className="space-y-6"
                onSubmit={handleSubmit}>
                <div className="flex flex-row h-20 space-x-2 items-center">
                    <img
                        className="h-12 p-1 border-green-500 border-2 rounded-full"
                        alt="Unregistered-profile"
                        src={unregProfile}
                    />
                    <h2 className="text-2xl font-bold text-green-500">REGISTER :</h2>
                </div>
                <div className="bg-stone-950 text-yellow-400 shadow-lg px-4 md:px-12 py-8 flex flex-col space-y-4 rounded-sm text-center items-center md:text-left md:items-start">
                    <div className="">
                        <h4 className="text-md w-fit">NAME :</h4>
                        <div className="flex-col md:flex-row justify-between flex md:space-y-0 space-y-4 md:space-x-4">
                            <input
                                onChange={(e) => setFirstName(e.target.value)}
                                className="bg-transparent rounded-sm pl-3 text-gray-50 md:w-1/2"
                                maxLength={20}
                                minLength={4}
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                            />
                            <input
                                onChange={(e) => setLastName(e.target.value)}
                                className="bg-transparent rounded-sm pl-3 text-gray-50 md:w-1/2"
                                maxLength={20}
                                minLength={4}
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                            />
                        </div>
                    </div>
                    <div className="">
                        <h4 className="text-md">D.O.B. :</h4>
                        <input
                            onChange={(e) => setDob(e.target.value)}
                            type="number"
                            className="bg-transparent rounded-sm pl-3 text-gray-50"
                            name="email"
                            placeholder="DDMMYYYY"
                            maxLength={8}
                            minLength={8}
                        />
                    </div>
                    <div className="flex-col justify-between flex md:space-y-0 space-y-4 w-10/12">
                        <h4 className="text-md w-fit">EMAIL :</h4>
                        <input
                            onChange={(e) => setMail(e.target.value)}
                            type="email"
                            className="bg-transparent rounded-sm pl-3 text-gray-50"
                            name="email"
                            placeholder="Enter your email here"
                        />
                    </div>
                    <div className="flex-col md:flex-row justify-between flex md:space-y-0 space-y-4 md:space-x-4">
                        <div>
                            <h4 className="text-md w-fit">PASSWORD :</h4>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="bg-transparent rounded-sm pl-3 text-gray-50"
                                id=""
                                placeholder="Enter password"
                            />
                        </div>
                        <div>
                            <h4 className="text-md w-fit">CONFIRM PASSWORD :</h4>
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                className="bg-transparent rounded-sm pl-3 text-gray-50"
                                id=""
                                placeholder="Confirm password"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-6">
                    <button
                        type="submit"
                        onSubmit={handleSubmit}
                        className="rounded-md bg-red-600 border-2 border-red-600 text-gray-200 px-3 font-semibold py-1
                                  hover:bg-red-700 hover:border-red-700">
                        {" "}
                        SUBMIT{" "}
                    </button>{" "}
                        {error && <div className="text-red-600 text-sm">{error}</div>}
                    <div
                        id="emailHelp"
                        className="text-xs pb-3">
                        *We do not share personal data of the users to any external third party read :
                        <a
                        className="text-blue-600"
                        href="chicken">
                            {" "} shoppers user privacy code
                        </a>
                        
                    </div>
                </div>
            </form>
            <div className="flex flex-row space-x-2 h-20 items-center">
                <img
                    className="h-12 p-1 border-red-600 border-2 rounded-full"
                    src={regProfile}
                    alt="registered-profile"
                />
                <h6> already have an account : </h6>
                <a href="/login">
                    <button
                      type="submit"
                      className="rounded-sm bg-green-700 border-2 border-green-700 text-gray-200 px-5 py-1">
                      LOGIN
                    </button>
                </a>
            </div>
        </div>

        <div className="lg:w-2/5 lg:float-right">
            <img
                alt=""
                src={frame}
                className=""
            />
        </div>
    </div>
  );
};

export default Signup;
