import { GoDotFill } from "react-icons/go";
import { NavLink } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";
import { BsSuitcaseLg } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false)

    const handleMenuOpen = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <>
            <nav className="navbar flex justify-between items-center text-gray-500 px-6 h-20 sticky top-0 left-0 right-0 w-[100%] bg-white z-50 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <BsSuitcaseLg className="text-blue-600 mr-2" />
                    JobPilot <GoDotFill className="text-sm text-blue-500" />
                </h2>
                <FaBarsStaggered onClick={handleMenuOpen} className="md:hidden flex text-2xl text-black" />
                <div className={`links gap-5 md:flex hidden items-center ${menuOpen ? 'hidden' : ''}`}>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'text-gray-700 font-bold' : 'text-gray-500'}>Jobs</NavLink>
                    <NavLink to="/application" className={({ isActive }) => isActive ? 'text-gray-700 font-bold' : 'text-gray-500'}>Applications</NavLink>
                    <button className="bg-gray-700 px-5 py-1.5 text-white cursor-pointer active:scale-95 transition-all duration-150 ease-in-out rounded-full hover:bg-gray-600"><NavLink to="/add-cv" className='flex items-center'>Add CV <IoIosAdd className="text-xl" /></NavLink></button>
                </div>

                {/* Mobile Menu */}
                <div className={`links gap-8 flex text-2xl md:hidden flex-col justify-center items-center bg-white w-full h-screen top-0 right-0 fixed transition-all duration-300 ease-in-out z-40 ${menuOpen ? 'right-0' : 'right-full'}`}>
                    <RxCross1 onClick={() => setMenuOpen(false)} className="absolute top-0 right-0 m-5 cursor-pointer" />
                    <NavLink onClick={() => setMenuOpen(false)} to="/" className={({ isActive }) => isActive ? 'text-gray-700 font-bold' : 'text-gray-500'}>Jobs</NavLink>
                    <NavLink onClick={() => setMenuOpen(false)} to="/application" className={({ isActive }) => isActive ? 'text-gray-700 font-bold' : 'text-gray-500'}>Applications</NavLink>
                    <button onClick={() => setMenuOpen(false)} className="bg-gray-700 px-5 py-1.5 text-white cursor-pointer active:scale-95 transition-all duration-150 ease-in-out rounded-full hover:bg-gray-600"><NavLink to="/add-cv" className='flex items-center'>Add CV <IoIosAdd className="text-xl" /></NavLink></button>
                </div>
            </nav>

        </>
    )
}

export default Navbar