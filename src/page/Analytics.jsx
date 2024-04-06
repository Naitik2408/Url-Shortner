import { useEffect, useState } from "react";
import img3 from '../assets/41952 [Converted]-01.png'
import { IoTimerOutline } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaGithub } from "react-icons/fa6";
import conf from "../conf";
import { useNavigate } from "react-router-dom";
import {logout} from '../Redux/authSlice.js';
import {useDispatch} from 'react-redux';
import { getCookie } from "../getCookie.js";

function Analytics() {

    const [allUrl, setAllUrl] = useState([]);
    const navigate  = useNavigate();
    const dispatch = useDispatch();




    const handleAllUrl = async (e) => {
        // e.preventDefault();
        const cookie = getCookie('uid');
        if(!cookie){
            dispatch(logout());
            navigate('/login')
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
                if(!data.resStatus){
                    dispatch(logout());
                    navigate('/login');
                    return
                }
                if (data.error) {
                    console.error('Server error:', data.error);
                } else {
                    setAllUrl(data.data.reverse());
                }
            } else {
                console.error('Error:', response.status, response.statusText);
            }
        } catch (error) {
            throw error;
        }
    }


    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    
    useEffect(() => {

        handleAllUrl();

    }, [])




    return (
        <div>
            <div className="px-9">
                <div className="text-gray-700 text-4xl font-extrabold dark:text-gray-200">Analytics</div>
                <div className="flex h-[83vh] w-full pb-6">
                    <div className="w-full lg:w-[60%] h-full overflow-auto flex flex-col gap-y-9 py-3">
                        {allUrl.map(item =>
                            <div key={item._id} className="border dark:bg-gray-700 border-gray-800 w-full h-fit rounded-md shadow-md p-4 flex justify-between dark:shadow-lg flex-col md:flex-row dark:shadow-gray-800">
                                <div className="md:w-[77%] w-full">
                                    <div className="font-semibold bg-orange-300 px-2 py-[3px] rounded-md w-fit max-h-full overflow-hidden mb-2 text-purple-900">{item.urlTitle}</div>
                                    <div className="overflow-hidden w-full dark:text-gray-200 ">{item.redirectUrl}</div>
                                    <div className="w-full flex gap-2 mt-3 items-center">
                                        <div className="font-bold p-2 rounded-md hidden md:block bg-green-300">Short Url</div>
                                        <div className="bg-blue-200 p-2 rounded-md w-full md:w-auto overflow-auto">{`${conf.api_url}/${item.shortId}`}</div>
                                    </div>
                                    <div className="flex gap-4 mt-4 dark:text-gray-200">
                                        <div className="flex gap-2 items-center">
                                            <div><IoTimerOutline /></div>
                                            <div>{formatDate(item.createdAt)}</div>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <div className="text-sm"><GrUpdate /></div>
                                            <div>{formatDate(item.updatedAt)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-[20%] mt-3 md:mt-0 h-full">
                                    <div className="flex flex-col justify-between h-full bg-red-400 rounded-lg pb-2 dark:text-gray-900">
                                        <div className="w-full h-[80%] flex justify-center items-center text-6xl font-semibold">{item.visitHistory.length}</div>
                                        <div className="w-full h-[20%] flex justify-center">No of Visit</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="hidden lg:w-[40%] h-full object-cover lg:flex flex-col justify-between">
                        <div className="flex justify-center items-center w-full h-[60%]">
                            <img src={img3} alt="" className="w-full" />
                        </div>
                        <div className="w-full h-[20%] flex justify-center items-end gap-8">
                            <div className="dark:text-gray-500">Created By - Naitik Kumar</div>
                            <div className="flex gap-4 text-gray-800 dark:text-gray-500 text-xl">
                                <div className="cursor-pointer"><AiOutlineLinkedin /></div>
                                <div className="cursor-pointer"><FaXTwitter /></div>
                                <div className="cursor-pointer"><FaGithub /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics
