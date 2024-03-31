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

              if (user.role === 'ADMIN') {
                navigate('/dashboard');
              } else {
                navigate('/');
              }
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
            <div className="flex flex-row bg-cover bg-center bg-no-repeat px-8 justify-center"
            style={{ backgroundImage: `url(${image3})`}}>
                <div className="text-gray-50 bg-black bg-opacity-90 py-12 px-12 drop-shadow-xl shadow-black shadow-inner">

                    <div className="flex h-8 space-x-2 items-center justify-center">
                      <h2 className="animate-characters text-2xl font-bold">LOGIN :</h2>
                    </div>
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit}>
                        <div className="form-container text-gray-50 shadow-lg px-6 justify-center py-4 flex flex-col space-y-8 rounded-sm items-center">
                          <div className="px-2 space-y-5">
                            <div className="grid-box col-span-2 block relative">
                                <input
                                  onChange={(e) => setMail(e.target.value)}
                                  type="email"
                                  className="question"
                                  name="email"
                                  id='emailid'
                                  required autocomplete="off"
                                />
                                <label for='emailid' className=""><span>EMAIL ID</span></label>
                            </div>
                            <div className="grid-box">
                                <input
                                   onChange={(e) => setPassword(e.target.value)}
                                   type="password"
                                   className="question"
                                   name='userPassword'
                                   id="userPassword"
                                   required autocomplete="off"
                                />
                                <label for='userPassword' className=""><span>PASSWORD</span></label>
                            </div>
                            <div className="flex flex-col space-y-6">
                              <button
                                type="submit"
                                className="rounded-sm shadow-xl bg-blue-600 border-2 border-blue-600 text-gray-50 px-3 font-semibold py-1
                                hover:bg-blue-700 hover:border-blue-700">
                                SUBMIT
                              </button>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-2 h-20 items-center opacity-100">
                          <img
                            className="h-12 p-1 border-lime-600 border-2 rounded-full"
                            alt="Unregistered-profile"
                            src={unregProfile}
                          />
                          <h6> not a registered user ? : </h6>
                          <a href="/register">
                            <p
                                className="rounded-sm bg-lime-600 border-2 border-lime-600 text-gray-50 px-5 py-1 font-semibold">
                                REGISTER
                            </p>
                          </a>
                        </div>
                        </div>
                    </form>
                    
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
