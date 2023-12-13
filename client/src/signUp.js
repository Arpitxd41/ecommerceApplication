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

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
            e.preventDefault()
            axios.post('https://localhost:4000/register', {firstName, lastName, dob, mail, password})
            .then(result => console.log(result))
            .catch(error => console.log(error))
        };
 

    return (
        <div className='flex flex-col lg:flex-row'>
            <div className="lg:w-3/5 lg:float-left text-gray-300 bg-slate-900 py-18 px-16">
                <form className='space-y-6'onSubmit={handleSubmit}>
                    <div className='flex flex-row h-20 space-x-2 items-center'>
                        <img className="h-12" alt='Unregistered-profile' src={unregProfile} />
                        <h2 className="text-2xl font-bold">REGISTER :</h2>
                    </div>
                    <div className="bg-slate-950 px-12 py-6 flex flex-col space-y-4 rounded-md">
                        <label className="text-md">NAME :</label>
                        <div className='flex-col lg:space-x-2 space-y-4 lg:flex-row justify-between flex'>
                            <input onChange={(e) => setFirstName(e.target.value)} className="border-white border-2 h-10 rounded-md pl-3 text-gray-900" maxLength={20} minLength={4}  type='text' name="firstName" placeholder="First Name"  />
                            <input  onChange={(e) => setLastName(e.target.value)} className="border-white border-2 h-10 rounded-md pl-3 text-gray-900" maxLength={20} minLength={4}  type='text' name="lastName" placeholder="Last Name" />
                        </div>
                        <label className="text-md">D.O.B. :</label>
                        <input onChange={(e) => setDob(e.target.value)} type="number" className="border-white border-2 h-10 rounded-md pl-3 text-gray-900 w-1/3" name="email" placeholder="DDMMYYYY" maxLength={8} minLength={8} />
                        <label className="text-md">EMAIL :</label>
                        <input onChange={(e) => setMail(e.target.value)} type="email" className="border-white border-2 h-10 rounded-md pl-3 text-gray-900" name="email" placeholder="Enter your email here" />
                        <label className="text-md">PASSWORD :</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className="border-white border-2 h-10 rounded-md pl-3 text-gray-900" id="" placeholder="Enter password" />
                    </div>                    
                    <div className="flex flex-col space-y-6">
                        <button type="submit" className="rounded-md bg-red-500 border-2 border-red-500 text-gray-200 px-3 font-semibold py-1"> Submit </button>
                        <div id="emailHelp" className="text-xs pb-3"> (*We do not share personal data of the users to any external third party read :
                            <a className="text-red-500" href="chicken">shoppers user privacy code</a>)
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
            <div className="lg:w-2/5 lg:float-right grid grid-cols-12 bg-orange-400">
                <img alt="" src={deli} className="bg-orange-400 col-span-12 h-42" />
                <img alt="" src={cart} className="bg-orange-400 col-span-4 h-42"/>
                <img alt="" src={fri} className="bg-orange-400 col-span-4 h-42" />
                <img alt="" src={pay} className="bg-orange-400 col-span-4 h-42" />
                <img alt="" src={shop} className="bg-orange-400 col-span-4 h-36" />
                <img alt="" src={mobi} className="bg-orange-400 col-span-4 h-36" />
                <img alt="" src={eco} className="bg-orange-400 col-span-4 h-42" />
                <img alt="" src={sale} className="bg-orange-400 col-span-4 h-42" />
                <img alt="" src={santa} className="bg-orange-400 col-span-4 h-42" />
            </div>
        </div>
    )
}

export default Signup;