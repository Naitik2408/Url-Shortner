import React, { useState } from 'react'
import img1 from "../assets/studio_pc_2328_37 [Converted]-01.png"
import { Link, useNavigate } from "react-router-dom"
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import conf from '../conf';
import { useSelector, useDispatch } from 'react-redux'
import {login, logout} from '../Redux/authSlice'


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [loder, setLoder] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  function setCookie(name, value, daysToExpire) {
    let cookie = name + "=" + encodeURIComponent(value);

    if (daysToExpire) {
      let expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + daysToExpire);
      cookie += "; expires=" + expirationDate.toUTCString();
    }

    document.cookie = cookie;
  }


  const loginHandler = async (e) => {
    e.preventDefault();
    setLoder(true)



    try {


      const objUser = {
        email: email,
        password: password
      }



      const response = await fetch(`${conf.api_url}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objUser)
      })
      if (response.ok) {
        const data = await response.json();
        if(!data.resStatus){
          alert(data.myError)
          return
        }
        setCookie('uid', data.myToken)
        dispatch(login({ user:data.user }))
        navigate('/')
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoder(false);
    }
  }



  const displayPassword = () => {
    if (showPassword) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }





  return (
    <div className='md:p-5 p-10 w-screen h-screen flex justify-center items-center bg-gray-100'>
      <div className='flex justify-between w-full h-full'>
        <div className='w-[50%] h-full p-16 hidden md:flex justify-center items-center'>
          <img src={img1} alt="" className='w-full' />
        </div>
        <div className='md:w-[50%] w-full h-full flex justify-center items-center flex-col'>
          <form action="" onSubmit={loginHandler} className='w-72'>
            <h1 className='text-4xl font-bold text-black mb-8'>Login</h1>
            <label htmlFor='email' className='mb-4 block text-sm font-medium text-gray-900'>Email Address</label>
            <input type='email' placeholder='Email Address' className='w-full border rounded py-2 px-4 mb-4' required value={email} onChange={e => { setEmail(e.target.value) }} />
            <label htmlFor='email' className='mb-4 block text-sm font-medium text-gray-900'>Password</label>
            <div className='relative'>
              <input type={showPassword ? 'text' : 'password'} placeholder='Password' className='w-full border rounded py-2 px-4 mb-4' required value={password} onChange={e => { setPassword(e.target.value) }} />
              <div className='absolute right-2 top-3 cursor-pointer text-gray-700 bg-white px-2' onClick={displayPassword}>{!showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}</div>
            </div>
            <button className='w-20 h-10 bg-blue-400 px-3 py-2 rounded-md text-white hover:bg-blue-300 flex justify-center items-center'>{loder ? "loding.." : "Log in"}</button>
          </form>
          <div className='mt-5'>Don't have account ? <Link to={"/signUp"} className='text-blue-400 underline'> Create Account</Link></div>
        </div>
      </div>
    </div>
  )
}

export default Login