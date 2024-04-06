import { useEffect, useState } from "react";
import img2 from '/icon.png'
import { IoSunny } from "react-icons/io5";
import { IoIosMoon } from "react-icons/io";
import { IoAnalyticsOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice";
import { LuLogOut } from "react-icons/lu";
import { toggleTheme } from "../Redux/themeSlice";


function Navbar() {
  const [darkMode, setDarkMode] = useState(false)
  const [hide, setHide] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logStatus = useSelector(state=> state.authStatus)

  const hadleMode = () => {
    dispatch(toggleTheme());
  }

  function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

  const handleLogout = ()=>{
    deleteCookie('uid'); 
    dispatch(logout())
    alert('logout sucessfully')
    navigate('/login')
  }

  const handleLoginStatus = ()=>{
    setHide(logStatus.isLoggedIn)

  }
  

  useEffect(() => {
    handleLoginStatus()
    
    
  }, [logStatus, hide])


  return (
    <div className="w-full h-full flex justify-between items-center md:py-1 md:px-9 px-3 shadow-sm">
      <div className="flex items-center gap-1">
        <img src={img2} alt="" className="md:w-10 w-8" />
        <div className="font-extrabold text-2xl md:text-4xl text-gray-700 dark:text-gray-200 md:block hidden">U<span className="text-xl md:text-2xl"> Shortner</span></div>
      </div>
      <div className="flex gap-10 items-center text-gray-900 dark:text-gray-200">
        <Link to="/">
          <div className="flex gap-2 items-center cursor-pointer ">
            <IoHomeOutline className="text-xl font-bold" />
            <div className="hidden md:block">Home</div>
          </div>
        </Link>
        
        <Link to="/analytics" className={hide? 'block' : 'hidden'}>
          <div className="flex gap-2 items-center cursor-pointer">
            <IoAnalyticsOutline className="text-xl font-bold" />
            <div className="hidden md:block">Analytics</div>
          </div>
        </Link>

      </div>
      <div className="flex md:gap-8 gap-3 text-gray-900 cursor-pointer items-center dark:text-gray-200">
        <div className={`${hide? 'hidden' : 'block'} bg-purple-500 px-4 text-white md:py-[8px] py-[4px] rounded-3xl hover:bg-purple-400`}><Link to={"/login"}>Sing In</Link></div>
        <div className={`${hide? 'block' : 'hidden'} flex items-center gap-1 bg-purple-500 px-4 text-white hover:bg-purple-400 py-[8px] rounded-3xl` } onClick={handleLogout}> <div className="hidden md:block">Logout</div> <LuLogOut/></div>
        <div className="text-2xl cursor-pointer bg-gray-200 rounded-full p-1 text-gray-800 hover:bg-gray-300" onClick={hadleMode}>{darkMode ? <IoIosMoon /> : <IoSunny />}</div>
      </div>
    </div>
  )
}

export default Navbar
