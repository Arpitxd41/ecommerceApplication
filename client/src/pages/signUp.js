import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import image2 from '../images/andreaPiacquadio.jpg';

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const server = process.env.REACT_APP_SERVER;
    console.log(server);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

            // Confirm Password
            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                return;
            }

            try {
                const response = await axios.post(`${server}/register`, {
                  firstName,
                  lastName,
                  dob,
                  mail,
                  password,
                });

                const userToken = response.data.token;
            
                localStorage.setItem('token', userToken);
            
                // Redirect to login page with success message
                navigate('/login',{state : { successMessage: 'Welcome! You are successfully registered. Please log youself in to Continue...' }});

            } catch (error) {
                console.error(error);
                setError("Pardon, your registration has failed. Please try again after some time.");
            }
    };

  return (
    <div className="bg-black flex flex-row bg-cover bg-center bg-no-repeat px-8 justify-center"
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
                                type="text" name="firstname" id="firstname" required autoComplete="off" 
                                onChange={(e) => setFirstName(e.target.value)}
                                className="question"
                                maxLength={20}
                                minLength={4}
                            />
                            <label htmlFor='firstname' className=""><span>FIRSTNAME</span></label>
                        </div>                        
                        <div className="grid-box">
                            <input
                                onChange={(e) => setLastName(e.target.value)}
                                className="question"
                                maxLength={20}
                                minLength={4}
                                type="text"
                                name="lastName"
                                id="lastname" required autoComplete="off"
                            />
                            <label htmlFor='lastname' className=""><span>LASTNAME</span></label>
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
                                required autoComplete="off"
                            />
                            <label htmlFor='email' className=""><span>EMAIL</span></label>
                        </div>
                        <div className="grid-box">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="question"
                                name="password"
                                id="password"
                                required autoComplete="off"
                            />
                            <label htmlFor="password" className=""><span>PASSWORD</span></label>
                        </div>
                        <div className="grid-box">
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                className="question"
                                name="password"
                                id="confirmation"
                                required autoComplete="off"
                            />
                            <label htmlFor="confirmation" className=""><span>CONFIRM PASSWORD</span></label>
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
                        <i className="fa fa-user-circle text-4xl" aria-hidden="true"></i>
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
    </div>
  );
};

export default Signup;
