import regProfile from './images/profile_Reg.png';
import unregProfile from './images/profile_Unreg.png';
import deli from './images/deli.svg';
import cart from './images/cart.svg';
import sale from './images/sale.png';
import shop from './images/shop.png';
import santa from './images/santa.png';
import fri from './images/fri.png';
import pay from './images/pay.png';

const Login = () => {
    return (
        <div className='flex flex-col lg:flex-row'>
            <div className="lg:w-2/5 lg:float-right grid gap-2 grid-cols-12 bg-yellow-400">
                <img src={deli} className="bg-yellow-400 col-span-12" />
                <img src={pay} className="bg-gray-100 col-span-4 border-4 border-gray-50 h-42" />
                <img src={shop} className="bg-pink-400 col-span-4 border-8 border-gray-50" />
                <img src={sale} className="bg-gray-100 col-span-4 border-4 border-gray-50 h-42" />
                <img src={santa} className="bg-gray-100 col-span-4 border-4 border-gray-50 h-42" />
                <img src={cart} className="bg-cyan-400 col-span-4 border-4 border-gray-50" />
                <img src={fri} className="bg-gray-100 col-span-4 border-4 border-gray-50 h-42" />
            </div>
            <div className="lg:w-3/5 lg:float-right text-gray-300 bg-slate-900 py-8 px-16 space-y-4">
                <form className='space-y-6'>
                    <div className='flex flex-row h-20 space-x-2 items-center'>
                        <img className="h-12" alt='Unregistered-profile' src={unregProfile} />
                        <h2 className="text-4xl font-bold">LOGIN :</h2>
                    </div>
                    <div className="bg-slate-950 px-12 py-6 flex flex-col space-y-6 rounded-md">
                        <label for="" className="text-xl">EMAIL :</label>
                        <input type="email" className="border-white border-2 h-10 rounded-md pl-3 text-gray-900" name="email" placeholder="Enter your email here" />
                        <label for="" className="text-xl">PASSWORD :</label>
                        <input type="password" className="border-white border-2 h-10 rounded-md pl-3 text-gray-900" id="" placeholder="Enter password" />
                    </div>
                    <div className="mb-3 form-check space-x-4 pl-6">
                        <input type="checkbox" class="rounded-full border-2 border-gray-300 text-blue-500 focus:ring-blue-500" />
                        <label className="form-check-label" for="exampleCheck1">REMEMBER ME</label>
                    </div>
                    <div className="flex flex-col space-y-6">
                        <button type="submit" className="rounded-md bg-red-500 border-2 border-red-500 text-gray-200 px-3 font-semibold py-1">
                            Submit
                        </button>

                    <div id="emailHelp" className="text-xs pb-3">(*We do not share personal data of the users to any external third party read :
                        <a className="text-red-500" href="#">shoppers user privacy code</a>)
                    </div>
                  </div>
                </form>
                <div className="flex flex-row space-x-2 h-20 items-center">
                    <img className="h-12" src={regProfile} alt='registered-profile' />
                    <h6> not a registered user ?  : </h6>
                    <a href='/register'>
                        <button type="submit" className="rounded-md bg-green-700 border-2 border-green-700 text-gray-200 px-6 font-semibold py-1">Sign Up</button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Login;