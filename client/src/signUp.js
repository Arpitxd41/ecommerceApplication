import { useState } from 'react';
import axios from 'axios';

import regProfile from './images/profile_Reg.png';
import unregProfile from './images/profile_Unreg.png';
import mobi from './images/mobi.svg';
import deli from './images/deli.svg';
import cart from './images/cart.svg';
import eco from './images/green.svg';
import sale from './images/sale.png';
import shop from './images/shop.png';
import santa from './images/santa.png';
import fri from './images/fri.png';
import pay from './images/pay.png';

const Signup = () => {

    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/register', {name, dob, mail, password})
        .then(result => console.log(result)
        .catch(error => console.log(error)
          )
        )
    }

    return (
        <div className='flex flex-col lg:flex-row'>
            <div className="lg:w-3/5 lg:float-left text-gray-300 bg-slate-900 py-8 px-16">
                <form className='space-y-6'onSubmit={handleSubmit}>
                    <div className='flex flex-row h-20 space-x-2 items-center'>
                        <img className="h-12" alt='Unregistered-profile' src={unregProfile} />
                        <h2 className="text-4xl font-bold">REGISTER :</h2>
                    </div>
                    <div className="bg-slate-950 px-12 py-6 flex flex-col space-y-4 rounded-md">
                        <label for="" className="text-lg">FULL NAME :</label>
                        <input type="text" maxLength={20} minLength={4} className="border-white border-2 h-10 rounded-md pl-3 text-gray-900" name="email" placeholder="Enter your Full Name" onChange={(e) => setName(e.target.value)} />
                        <label for="" className="text-lg">D.O.B. :</label>
                        <input type="number" maxLength={8} minLength={8} className="border-white border-2 h-10 rounded-md pl-3 text-gray-900" name="email" placeholder="DDMMYYYY" onChange={(e) => setDob(e.target.value)} />
                        <label for="" className="text-lg">EMAIL :</label>
                        <input type="email" className="border-white border-2 h-10 rounded-md pl-3 text-gray-900" name="email" placeholder="Enter your email here" onChange={(e) => setMail(e.target.value)} />
                        <label for="" className="text-lg">PASSWORD :</label>
                        <input type="password" className="border-white border-2 h-10 rounded-md pl-3 text-gray-900" id="" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3 form-check space-x-4 pl-6">
                        <input type="checkbox" class="rounded-full border-2 border-gray-300 text-blue-500 focus:ring-blue-500" />
                        <label className="form-check-label" for="exampleCheck1">REMEMBER ME</label>
                    </div>
                    <div className="flex flex-col space-y-6">
                        <button type="submit" className="rounded-md bg-red-500 border-2 border-red-500 text-gray-200 px-3 font-semibold py-1"> Submit </button>
                    <div id="emailHelp" className="text-xs pb-3">(*We do not share personal data of the users to any external third party read :
                        <a className="text-red-500" href="#">shoppers user privacy code</a>)
                    </div>
                  </div>
                </form>
                <div className="flex flex-row space-x-2 h-20 items-center">
                    <img className="h-12" src={regProfile} alt='registered-profile' />
                    <h6> already have an account : </h6>
                    <a href='/login'>
                        <button type="submit" className="rounded-md bg-green-700 border-2 border-green-700 text-gray-200 px-6 font-semibold py-1">Login</button>
                    </a>
                </div>
            </div>
            <div className="lg:w-2/5 lg:float-right grid gap-2 grid-cols-12 bg-yellow-400">
                <img src={deli} className="bg-yellow-400 col-span-12" />
                <img src={pay} className="bg-gray-100 col-span-4 border-4 border-gray-50 h-42" />
                <img src={shop} className="bg-pink-400 col-span-4 border-8 border-gray-50" />
                <img src={sale} className="bg-gray-100 col-span-4 border-4 border-gray-50 h-42" />
                <img src={mobi} className="bg-violet-500 col-span-5 border-4 border-gray-50 h-56" />
                <img src={eco} className="bg-green-300 col-span-7 border-8 border-gray-50" />
                <img src={santa} className="bg-gray-100 col-span-4 border-4 border-gray-50 h-42" />
                <img src={cart} className="bg-cyan-400 col-span-4 border-4 border-gray-50" />
                <img src={fri} className="bg-gray-100 col-span-4 border-4 border-gray-50 h-42" />
            </div>
        </div>
    )
}

export default Signup;