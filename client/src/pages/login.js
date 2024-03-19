import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import unregProfile from '../images/profile_Reg.png';
import regProfile from '../images/profile_Unreg.png';
// import video1 from '../images/ShoppingOptionsByNanoAgency.mp4';
import image3 from '../images/andreaPiacquadio.jpg';

const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();    
      try {
        const result = await axios.post("https://localhost:5000/login", { mail, password })
        console.log('Credentials = ', result.data.success);
          if (result.data.success) {
              const { token, user } = result.data;

              console.log("User:", user);
              
              localStorage.setItem('authToken', token);
              localStorage.setItem('userDetails', JSON.stringify(user));

              navigate('/');
          } else {
            setErrorMessage(result.data.message || "Login Failed!");
          }
        } catch (error) {
          console.error("Error:", error);
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else {
            setErrorMessage("Login failed. Please try after sometime.");
          }
      };
    };

    return (
        <div>
            <h2 className='absolute z-50'>
              {errorMessage && (
              <div className="error-message bg-red-600 px-8 text-white">{errorMessage}</div>
              )}
            </h2>
            <div className="flex flex-col lg:flex-row p-16 bg-cover bg-center bg-no-repeat justify-center"
            style={{ backgroundImage: `url(${image3})`}}>
                <div className="text-gray-50 bg-black bg-opacity-60 drop-shadow-xl shadow-black py-4 px-4 md:px-16 rounded-l-sm w-3/5">
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit}>
                        <div className="flex flex-row h-20 space-x-2 items-center">
                            <img
                              className="h-12 p-1 border-green-600 border-2 rounded-full shadow-xl"
                              alt="Unregistered-profile"
                              src={unregProfile}
                            />
                            <h2 className="text-2xl font-bold text-green-400">LOGIN :</h2>
                        </div>
                        <div className="justify-center bg-white text-slate-900 font-semibold shadow-xl px-4 md:px-12 py-12 flex flex-col space-y-8 rounded-sm text-center items-center md:text-left">
                            <div className="w-full flex flex-row justify-between items-center">
                                <h4 className="text-md w-1/5">EMAIL ID:</h4>
                                <input
                                  onChange={(e) => setMail(e.target.value)}
                                  type="email"
                                  className="bg-transparent rounded-sm pl-3 w-4/5 border-x-0 border-t-0"
                                  name="email"
                                  placeholder="Enter your email here"
                                />
                            </div>
                            <div className="w-full flex flex-row justify-between items-center">
                                <h4 className="text-md w-1/5">PASSWORD:</h4>
                                <input
                                   onChange={(e) => setPassword(e.target.value)}
                                   type="password"
                                   className="bg-transparent rounded-sm pl-3 w-4/5 border-x-0 border-t-0"
                                   id=""
                                   placeholder="Enter password"
                                />
                           </div>
                        </div>
                        <div>
                        </div>
                        <div className="flex flex-col space-y-6">
                            <button
                              type="submit"
                              className="rounded-sm shadow-xl bg-blue-600 border-2 border-blue-600 text-gray-50 px-3 font-semibold py-1
                              hover:bg-blue-700 hover:border-blue-700">
                              SUBMIT
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-row space-x-2 h-20 items-center opacity-100">
                        <img
                          className="h-12 p-1 border-red-500 border-2 rounded-full shadow-xl opacity-100"
                          src={regProfile}
                          alt="registered-profile"
                        />
                        <h6> not a registered user ? : </h6>
                        <a href="/register">
                            <button
                              type="submit"
                              className="rounded-sm bg-green-700 border-2 border-green-700 text-gray-50 px-5 py-1 font-semibold">
                              Sign Up
                            </button>
                        </a>
                    </div>
                    {/* <div>
                      <img src={image3} alt='bgim' className='' />
                    </div> */}
                  </div>
                {/*
                <div className="lg:w-1/2 lg:float-right px-10 bg-transparent">
                  <div className='float-left rounded-sm drop-shadow-xl shadow-inner shadow-black p-8 bg-gray-300 object-none'>
                    <video src={video1} width="1000" height="500" controls="" autoplay="true"  className=''/>
                    <div className='h-32 overflow-y-scroll bg-white px-5 pb-5'>
                      <h4 className='animate-characters font-bold'>"Welcome to my ecommerce project - a testament to my expertise in web development. Designed and developed entirely by me, this platform combines the latest technologies to deliver a seamless user experience. From sleek CSS and Tailwind CSS designs to responsive React components, every detail is meticulously crafted to ensure user satisfaction.<br />A robust backend built on Express.js and Node.js, with authentication secured using bcrypt and JWT Tokens. Leveraging MongoDB with Mongoose, product data and user information are managed efficiently. Integrating Razorpay for payment processing, ensured smooth transactions using ngrok for local testing. With icons, illustrations and animations the frontend is adorned with interactive elements, for an engaging user interface. This project not only showcases my frontend design skills but also highlights my proficiency in backend development and integration of third-party services, making it a standout addition to my web development portfolio."</h4>
                    </div>
                  </div>
                </div>
                */}
           </div>
      </div>
    );    
};  

export default Login;
