import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import unregProfile from './images/profile_Reg.png';
import regProfile from './images/profile_Unreg.png';
import frame from './images/frame.png';

const Login = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;

    const handleSubmit = (e) => {
    e.preventDefault();
    axios
        .post("https://localhost:4000/login", { mail, password })
        .then((result) => {
            if (result.data.success) {
                navigate('/');
            } else {
                const errorMessage = result.data.message || "Login Failed !";
                navigate('/', { state: { errorMessage }});
            }
        }).catch((error) => {
            const errorMessage = "Login Failed. Please try again..";
            navigate('/', { state: { errorMessage }});
        });
    }

    return (
        <div>
            {state && state.successMessage && (
              <div className="success-message bg-green-600 px-8 text-white">{state.successMessage}</div>
            )}
            <div className="flex flex-col lg:flex-row p-8 bg-black">
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
                            <h2 className="text-2xl font-bold text-green-500">LOGIN :</h2>
                        </div>
                        <div className="justify-center bg-stone-950 text-yellow-400 shadow-lg px-4 md:px-12 py-12 flex flex-col space-y-8 rounded-sm text-center items-center md:text-left">
                            <div className="w-4/5">
                                <h4 className="text-md w-fit">EMAIL :</h4>
                                <input
                                  onChange={(e) => setMail(e.target.value)}
                                  type="email"
                                  className="bg-transparent rounded-sm pl-3 text-gray-50 w-11/12"
                                  name="email"
                                  placeholder="Enter your email here"
                                />
                            </div>
                            <div className="w-4/5">
                                <h4 className="text-md w-fit">PASSWORD :</h4>
                                <input
                                   onChange={(e) => setPassword(e.target.value)}
                                   type="password"
                                   className="bg-transparent rounded-sm pl-3 text-gray-50 w-11/12"
                                   id=""
                                   placeholder="Enter password"
                                />
                           </div>
                        </div>
                        <div>
                            <a
                              className="text-red-600"
                              href="chicken">
                              Forgot Password ?
                            </a>
                        </div>
                        <div className="flex flex-col space-y-6">
                            <button
                              type="submit"
                              className="rounded-md bg-red-600 border-2 border-red-600 text-gray-200 px-3 font-semibold py-1
                              hover:bg-red-700 hover:border-red-700">
                              Submit
                            </button>

                            <div
                              id="emailHelp"
                              className="text-xs pb-3">
                              *We do not share personal data of the users to any external
                              third party read : 
                              <a
                                className="text-blue-500"
                                href="chicken">
                                {" "}shoppers user privacy code
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
                        <h6> not a registered user ? : </h6>
                        <a href="/register">
                            <button
                              type="submit"
                              className="rounded-sm bg-green-700 border-2 border-green-700 text-gray-200 px-5 py-1">
                              Sign Up
                            </button>
                        </a>
                    </div>
                </div>

                <div className="lg:w-1/2 lg:float-right">
                    <img
                      src={frame}
                      alt="imu"
                    />
                </div>
            </div>
        </div>
    );    
};  

export default Login;
