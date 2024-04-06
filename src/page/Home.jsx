import React, { useState, useEffect } from 'react'
import img1 from "../assets/9737358_Mesa de trabajo 1.png"
import conf from '../conf';
import {getCookie} from '../getCookie.js' 
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import {login, logout} from '../Redux/authSlice.js'

function Home() {


    const [url, setUrl] = useState("");
    const [shortenedURL, setShortenedURL] = useState("");
    const [urlTitle, setUrlTitle] = useState("");
    const [showUrl, setShorUrl] = useState("hidden");
    const [copiedText, setCopiedText] = useState("Click To Copy")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.theme);
    const currentUser = useSelector((state)=>state.authStatus.user);
    const isLogedIn = useSelector((state)=>state.authStatus.isLoggedIn);
    const themeClass = theme === 'dark' ? 'dark-theme' : 'light-theme';

    const fetchData = async ()=>{
        const cookie = getCookie('uid');
        if(!cookie) {
            dispatch(logout());
            return 
        } 


        try {
            const objUrl = { cookie: cookie }
            const response = await fetch(`${conf.api_url}/url/analy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objUrl)
            })
            if (response.ok) {
                const data = await response.json();
                if(data.resStatus){
                    dispatch(login({ user:data.user }))
                    return
                }
            } else {
                console.error('Error:', response.status, response.statusText);
            }
        } catch (error) {
            throw error;
        }
    }

    useEffect(()=>{
        fetchData()

    },[])



    const handleGenerateBtn = async (e) => {
        e.preventDefault();
        const cookie = getCookie('uid');
        if(!cookie){
            dispatch(logout());
            navigate('/login')
            return 
        }
        if (url && urlTitle) {
            const objUrl = { url: url, urlTitle: urlTitle, cookie: cookie }
            try {
                const response = await fetch(`${conf.api_url}/url`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(objUrl)
                })
                if (response.ok) {
                    const data = await response.json();
                    if(!data.resStatus){
                        
                        navigate('/login')
                        return 
                    }
                    setShorUrl("block")
                    setShortenedURL(`${conf.api_url}/${data.id}`);
                } else {
                    console.error('Error:', response.statusText);
                }

            } catch (error) {
                throw error;
            }
        } else {
            alert("Url or Title is missing");
        }
    }

    const handleClick = () => {
        navigator.clipboard.writeText(shortenedURL)
        setCopiedText("Copied!")
        setTimeout(() => setCopiedText("Click To Copy"), 2000)
    }



    return (
        <div className={`flex w-full h-full ${themeClass}`}>
            <div className="md:w-[50%] w-full h-full flex justify-center items-center">
                <div className="w-[80%] rounded-lg overflow-hidden p-6">
                    <div  className={`text-3xl font-bold text-gray-700 mb-12 dark:text-purple-300 hidden md:block ${isLogedIn? 'block': 'hidden'}`}>Welcome, <span className='text-orange-500 text-4xl font-extrabold'>{currentUser.name? currentUser.name: ""}</span> to dashboard</div>
                    <div className="w-full text-center text-4xl font-extrabold text-purple-500 mb-9 dark:text-purple-300 ">More Then Free Link Shortner</div>
                    <input type="text" className="p-3 w-full rounded-md my-3 dark:bg-black dark:text-white bg-orange-300" id="" placeholder="Node js video link..**" value={urlTitle} onChange={e => setUrlTitle(e.target.value)} /><br />
                    <input type="text" className="p-3 w-full rounded-md my-3 dark:bg-black dark:text-white" id="" placeholder="https://example.com" value={url} onChange={e => setUrl(e.target.value)} /><br />
                    
                    <div className={`relative group ${showUrl}`}>
                        <input type="text" className="p-3 w-full rounded-md my-3 cursor-pointer bg-blue-300" value={shortenedURL} placeholder="http://example.com/52ksf8" onClick={handleClick} />
                        <div className="w-full justify-center absolute bottom-20 text-sm hidden group-hover:flex group-hover:opacity-100">
                            <div className="bg-gray-900 dark:bg-gray-100 dark:text-gray-900 text-gray-200 p-1 rounded-sm shadow-lg shadow-black ">{copiedText}</div>
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-end">
                        <button className="p-3 bg-purple-500 rounded-md mt-2 cursor-pointer text-white hover:bg-purple-400" onClick={handleGenerateBtn}>Generate</button>
                    </div>
                </div>
            </div>
            <div className="w-[50%] hidden md:block h-full object-cover ">
                <img src={img1} alt="" className="w-full h-full " />
            </div>
        </div>
    )
}

export default Home
