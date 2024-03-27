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
    <div className="flex flex-row bg-cover bg-center bg-no-repeat px-8 justify-center"
    style={{ backgroundImage: `url(${image2})`}}>
        <div className="text-gray-50 bg-black bg-opacity-90 py-10 px-12 drop-shadow-xl shadow-black shadow-inner">
            <div className="flex flex-col h-8 space-x-2 items-center">
                <h2 className="animate-characters text-2xl font-bold">SIGN UP :</h2>
            </div>
            <form
                className=""
                onSubmit={handleSubmit}>
                
                <div className="form-container text-gray-50 shadow-lg px-6 justify-center py-8 flex flex-col space-y-8 rounded-sm items-center">
                    <div className="px-2 space-y-5">
                        <div className="grid-box">
                            <input
                                type="text" name="firstname" id="firstname" required autocomplete="off" 
                                onChange={(e) => setFirstName(e.target.value)}
                                className="question"
                                maxLength={20}
                                minLength={4}
                            />
                            <label for='firstname' className=""><span>FIRSTNAME</span></label>
                        </div>                        
                        <div className="grid-box">
                            <input
                                onChange={(e) => setLastName(e.target.value)}
                                className="question"
                                maxLength={20}
                                minLength={4}
                                type="text"
                                name="lastName"
                                id="lastname" required autocomplete="off"
                            />
                            <label for='lastname' className=""><span>LASTNAME</span></label>
                        </div>
                        <div className="hidden">
                            <label className="font-semibold text-md">D.O.B.</label>
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
                        <div className="grid-box col-span-2 block relative">
                            <input
                                onChange={(e) => setMail(e.target.value)}
                                type="email"
                                className="question"
                                name="email"
                                id="email"
                                required autocomplete="off"
                            />
                            <label for='email' className=""><span>EMAIL</span></label>
                        </div>
                        <div className="grid-box">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="question"
                                name="password"
                                id="password"
                                required autocomplete="off"
                            />
                            <label for="password" className=""><span>PASSWORD</span></label>
                        </div>
                        <div className="grid-box">
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                className="question"
                                name="password"
                                id="confirmation"
                                required autocomplete="off"
                            />
                            <label for="confirmation" className=""><span>CONFIRM PASSWORD</span></label>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="w-full text-md mt-2 rounded-sm bg-blue-600 border-2 border-blue-600 text-gray-50 px-3 font-semibold py-1 hover:bg-blue-700 hover:border-blue-700">
                                {" "}
                                REGISTER{" "}
                            </button>{" "}
                                {error && <div className="text-blue-600 text-sm">{error}</div>}

                         </div>
                    </div>
                    <div className="flex flex-row space-x-2 h-20 items-center text-gray-50">
                        <img
                            className="h-12 p-1 border-lime-600 border-2 rounded-full"
                            alt="Unregistered-profile"
                            src={unregProfile}
                        />
                        <h6 className="">Already have an account</h6>
                        <a href="/login">
                            <p
                                className="rounded-sm bg-lime-600 border-2 border-lime-600 text-gray-50 px-5 py-1 font-semibold">
                                LOGIN
                            </p>
                        </a>
                    </div>
                </div>                
            </form>            
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
