import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import img1 from "./assets/9737358_Mesa de trabajo 1.png"
import img2 from '/icon.png'
import img3 from './assets/41952 [Converted]-01.png'
import { IoSunny } from "react-icons/io5";
import { IoIosMoon } from "react-icons/io";
import { IoTimerOutline } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaGithub } from "react-icons/fa6";
import conf from "./conf";
import Layout from "./Layout";
import Home from "./page/Home";
import Login from "./page/Login"
import Signup from './page/SignUp'
import Analytics from "./page/Analytics";



function App() {
  const [url, setUrl] = useState("");
  const [shortenedURL, setShortenedURL] = useState("");
  const [showUrl, setShorUrl] = useState("hidden");
  const [copiedText, setCopiedText] = useState("Click To Copy")
  const [theme, setTheme] = useState('light');
  const [darkMode, setDarkMode] = useState(false)
  const [allUrl, setAllUrl] = useState([]);
  const handleGenerateBtn = async (e) => {
    e.preventDefault();
    if (url) {
      const objUrl = { url: url }
      try {
        const response = await fetch(`${conf.api_url}/url`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(objUrl)
        })
        if (response.ok) {
          setShorUrl("block")
          const data = await response.json();
          setShortenedURL(`${conf.api_url}/${data.id}`);
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        throw error;
      }
    } else {
      alert("Enter the url");
    }
  }
  const handleClick = () => {
    navigator.clipboard.writeText(shortenedURL)
    setCopiedText("Copied!")
    setTimeout(() => setCopiedText("Click To Copy"), 2000)
  }
  const hadleMode = () => {
    setDarkMode(!darkMode)
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  const handleAllUrl = async () => {
    try {
      const response = await fetch(`${conf.api_url}/url/analy`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (response.ok) {
        const data = await response.json();
        if (data.error) {
          console.error('Server error:', data.error);
        } else {
          setAllUrl(data);
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
    if (theme === 'dark') {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    handleAllUrl();

  }, [theme, handleGenerateBtn])


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/analytics" element={<Analytics/>} />
            <Route path="/signUp" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>

      
      {/* <div className='w-screen h-screen bg-gray-100 dark:bg-gray-900'>
        <div className="w-full h-[10%] flex justify-between items-center py-1 px-9 shadow-sm">
          <div className="flex items-center gap-1">
            <img src={img2} alt="" className="w-10" />
            <div className="font-extrabold text-4xl text-gray-700 dark:text-gray-200">U<span className="text-2xl"> Shortner</span></div>
          </div>
          <div className="flex gap-8 text-gray-900 cursor-pointer items-center">
            <div>Sign Up</div>
          <div className="text-2xl cursor-pointer bg-gray-200 rounded-full p-1 text-gray-800 hover:bg-gray-300" onClick={hadleMode}>{darkMode ? <IoIosMoon /> : <IoSunny />}</div>
          </div>
          
        </div>
        <div className="w-full h-[90%] flex flex-col overflow-auto">
          <div className="flex w-full h-full">
            <div className="md:w-[50%] w-full h-full flex justify-center items-center">
              <div className="w-[80%] rounded-lg overflow-hidden p-6">
                <div className="w-full text-center text-4xl font-extrabold text-purple-500 mb-9 dark:text-purple-300 ">More Then Free Link Shortner</div>
                <input type="text" className="p-3 w-full rounded-md my-3 dark:bg-black dark:text-white" id="" placeholder="https://example.com" value={url} onChange={e => setUrl(e.target.value)} /><br />
                <div className={`relative group ${showUrl}`}>
                  <input type="text" className="p-3 w-full rounded-md my-3 cursor-pointer bg-blue-300" value={shortenedURL} placeholder="http://example.com/52ksf8" onClick={handleClick} />
                  <div className="w-full justify-center absolute bottom-20 text-sm hidden group-hover:flex group-hover:opacity-100">
                    <div className="bg-gray-900 dark:bg-gray-100 dark:text-gray-900 text-gray-200 p-1 rounded-sm shadow-lg shadow-black ">{copiedText}</div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="p-3 bg-purple-500 rounded-md mt-2 cursor-pointer text-white hover:bg-purple-400" onClick={handleGenerateBtn}>Generate</button>
                </div>
              </div>
            </div>
            <div className="w-[50%] hidden md:block h-full object-cover ">
              <img src={img1} alt="" className="w-full h-full " />
            </div>
          </div>
          <div className="px-9">
            <div className="text-gray-700 text-4xl font-extrabold dark:text-gray-200">Analytics</div>
            <div className="flex h-[83vh] w-full pb-6">
              <div className="w-full md:w-[60%] h-full overflow-auto flex flex-col gap-y-9 py-3">
                {allUrl.map(item =>
                  <div className="border dark:bg-gray-700 border-gray-800 w-full h-fit rounded-md shadow-md p-4 flex justify-between dark:shadow-lg flex-col md:flex-row dark:shadow-gray-800">
                    <div className="md:w-[77%] w-full">
                      <div className="overflow-hidden w-full dark:text-gray-200">{item.redirectUrl}</div>
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
              <div className="hidden md:w-[40%] h-full object-cover md:flex flex-col justify-between">
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
      </div> */}

    </>
  )
}

export default App
