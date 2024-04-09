import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import unregProfile from '../images/profile_Reg.png';
import image3 from '../images/andreaPiacquadio.jpg';

const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const server = process.env.REACT_APP_SERVER;

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();    
      try {
          const result = await axios.post(`${server}/login`, { mail, password });
          if (result.data.success) {
              const { token, user } = result.data;
              
              localStorage.setItem('authToken', token);
              localStorage.setItem('userDetails', JSON.stringify(user));

              if (user.role === 'ADMIN') {
                navigate(`/dashboard/${user._id}`);
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
        <div className='bg-black'>
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
                                  required autoComplete="off"
                                />
                                <label htmlFor='emailid' className=""><span>EMAIL ID</span></label>
                            </div>
                            <div className="grid-box">
                                <input
                                   onChange={(e) => setPassword(e.target.value)}
                                   type="password"
                                   className="question"
                                   name='userPassword'
                                   id="userPassword"
                                   required autoComplete="off"
                                />
                                <label htmlFor='userPassword' className=""><span>PASSWORD</span></label>
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
                </div>
           </div>
      </div>
    );    
};  

export default Login;
