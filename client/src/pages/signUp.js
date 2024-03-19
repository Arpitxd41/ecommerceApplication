import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import unregProfile from "../images/profile_Reg.png";
import regProfile from "../images/profile_Unreg.png";
// import video2 from '../images/globaldeliveryByNanoAgency.mp4';
import image2 from '../images/andreaPiacquadio.jpg';

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
            const response = await axios.post("https://localhost:5000/register", {
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
    <div className="flex flex-col lg:flex-row bg-cover bg-center bg-no-repeat p-8 justify-center"
    style={{ backgroundImage: `url(${image2})`}}>
        <div className="lg:w-3/5 lg:float-left text-gray-50 bg-black bg-opacity-60 py-18 px-8 md:px-16 drop-shadow-xl shadow-black shadow-inner">
            <form
                className="space-y-6 py-5"
                onSubmit={handleSubmit}>
                <div className="flex flex-row h-20 space-x-2 items-center">
                    <img
                        className="h-12 p-1 border-green-500 border-2 rounded-full"
                        alt="Unregistered-profile"
                        src={unregProfile}
                    />
                    <h2 className="text-2xl font-bold text-green-500">REGISTER :</h2>
                </div>
                <div className="bg-white text-gray-950 shadow-lg px-4 md:px-12 py-8 flex flex-col space-y-4 rounded-sm text-center items-center md:text-left md:items-start">
                    <div className="">
                        <h4 className="font-semibold text-md w-fit">NAME :</h4>
                        <div className="flex-col md:flex-row justify-between flex md:space-y-0 space-y-4 md:space-x-4">
                            <input
                                onChange={(e) => setFirstName(e.target.value)}
                                className="bg-transparent rounded-sm pl-3 text-gray-950 md:w-1/2
                                border-x-0 border-t-0"
                                maxLength={20}
                                minLength={4}
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                            />
                            <input
                                onChange={(e) => setLastName(e.target.value)}
                                className="bg-transparent rounded-sm pl-3 text-gray-950 md:w-1/2
                                                                border-x-0 border-t-0"
                                maxLength={20}
                                minLength={4}
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                            />
                        </div>
                    </div>
                    <div className="">
                        <h4 className="font-semibold text-md">D.O.B. :</h4>
                        <input
                            onChange={(e) => setDob(e.target.value)}
                            type="number"
                            className="bg-transparent rounded-sm pl-3 text-gray-950
                            border-x-0 border-t-0"
                            name="email"
                            placeholder="DDMMYYYY"
                            maxLength={8}
                            minLength={8}
                        />
                    </div>
                    <div className="flex-col justify-between flex md:space-y-0 space-y-4 w-10/12">
                        <h4 className="font-semibold text-md w-fit">EMAIL :</h4>
                        <input
                            onChange={(e) => setMail(e.target.value)}
                            type="email"
                            className="bg-transparent rounded-sm pl-3 text-gray-950
                            border-x-0 border-t-0"
                            name="email"
                            placeholder="Enter your email here"
                        />
                    </div>
                    <div className="flex-col md:flex-row justify-between flex md:space-y-0 space-y-4 md:space-x-4">
                        <div>
                            <h4 className="font-semibold text-md w-fit">PASSWORD :</h4>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="bg-transparent rounded-sm pl-3 text-gray-950
                                border-x-0 border-t-0"
                                id=""
                                placeholder="Enter password"
                            />
                        </div>
                        <div>
                            <h4 className="font-semibold text-md w-fit">CONFIRM PASSWORD :</h4>
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                className="bg-transparent rounded-sm pl-3 text-gray-950
                                border-x-0 border-t-0"
                                id=""
                                placeholder="Confirm password"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-6">
                    <button
                        type="submit"
                        className="rounded-md bg-blue-600 border-2 border-blue-600 text-gray-50 px-3 font-semibold py-1
                                  hover:bg-blue-700 hover:border-blue-700">
                        {" "}
                        SUBMIT{" "}
                    </button>{" "}
                        {error && <div className="text-blue-600 text-sm">{error}</div>}
                    
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
                      className="rounded-sm bg-green-600 border-2 border-green-600 text-gray-50 px-5 py-1 font-semibold">
                      LOGIN
                    </button>
                </a>
            </div>
        </div>

        {/* <div className="lg:w-1/2 lg:float-right px-10 bg-transparent">
                <div className='float-left rounded-sm drop-shadow-xl shadow-inner shadow-black p-8 bg-gray-300 object-none'>
                    <video src={video2} width="1000" height="500" controls="" autoplay="true"  className=''/>
                    <div className='h-56 overflow-y-scroll bg-white px-5 pb-5'>
                        <h4 className='animate-characters font-bold'>
                        "Welcome to my ecommerce project - a testament to my expertise in web development. Designed and developed entirely by me, this platform combines the latest technologies to deliver a seamless user experience. From sleek CSS and Tailwind CSS designs to responsive React components, every detail is meticulously crafted to ensure user satisfaction.<br />
                       A robust backend built on Express.js and Node.js, with authentication secured using bcrypt and JWT Tokens. Leveraging MongoDB with Mongoose, product data and user information are managed efficiently. Integrating Razorpay for payment processing, ensured smooth transactions using ngrok for local testing. With icons, illustrations and animations the frontend is adorned with interactive elements, for an engaging user interface. This project not only showcases my frontend design skills but also highlights my proficiency in backend development and integration of third-party services, making it a standout addition to my web development portfolio."
                       </h4>
                    </div>
                </div>
        </div>   */}
    </div>
  );
};

export default Signup;
