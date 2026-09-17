import { NavLink } from "react-router";
import { FaFilm } from "react-icons/fa6";
import { HiMenuAlt3 } from "react-icons/hi";

const Nav = () => {
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/movies">Movies</NavLink>
      </li>
      <li>
        <NavLink to="/movies">Trending</NavLink>
      </li>
    </>
  );

  return (
    <>
        <div className="bg-[#0B1117] shadow-sm py-4 sticky top-0 z-98 border-b border-[#f4c95d4b]">
            <div className=''>
                <div className='navbar container'>
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="lg:hidden cursor-pointer mr-3.5" >
                                <HiMenuAlt3 className="h-8 w-8 text-[#f4c95d]" />
                            </div>
                            
                            <ul className="menu menu-sm dropdown-content bg-[#101820] rounded-box z-2 mt-3 w-52 p-2 shadow px-5 py-3 space-y-1.5 text-[18px] font-bold text-[#f97360] border border-[#f4c95d5b]">
                                {links}
                            </ul>
                        </div>

                        <NavLink to="/" className="flex items-center gap-1.5 text-[20px] sm:text-[22px] lg:text-[22px] font-bold text-[#f97360]" >
                            <FaFilm />
                            <span className="hidden sm:block">SW Movie</span>
                            <span className="block sm:hidden">SW</span>
                        </NavLink>
                    </div>

                    <div className='navbar-center hidden lg:flex'>
                        <ul className='flex items-center gap-6 text-[18px] font-bold text-[#f97360]'>
                            {links}
                        </ul>
                    </div>

                    <div className='navbar-end'>
                        <div>
                            <NavLink to='/movies' className='py-1.5 px-5 bg-[#f4c95d] rounded-lg text-[#101820] border text-[18px] font-semibold'>Watch Movies</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Nav;