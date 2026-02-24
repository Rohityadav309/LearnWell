import React, { useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { TiShoppingCart } from "react-icons/ti";
// import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { categories } from "../../services/apis";
import { apiConnector } from "../../services/apiConnector";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRef } from "react";
import { HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router";

const NavBar = ({ setProgress }) => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const matchRoutes = (routes) => {
    return matchPath({ path: routes }, location.pathname);
  };

  const [sublinks, setsublinks] = useState([]);
  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      if (result?.data?.data?.length > 0) {
        setsublinks(result?.data?.data);
      }
      localStorage.setItem("sublinks", JSON.stringify(result.data.data));
    } catch (error) {
      // setsublinks(JSON.parse(localStorage.getItem("sublinks")));
      // console.log("could not fetch sublinks",localStorage.getItem("sublinks"));
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSublinks();
  }, []);

  const show = useRef();
  const overlay = useRef();

  const shownav = () => {
    show.current.classList.toggle("navshow");
    overlay.current.classList.toggle("hidden");
  };

  //handeling navbar scroll
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handelSearch = (e) => {
    e.preventDefault();
    if (searchValue?.length > 0) {
      navigate(`/search/${searchValue}`);
      setSearchValue("");
    }
  };

  return (
    <div
      className={` flex sm:relativeimgw-screen relative z-50 h-20 items-center justify-center border-b-[1px] border-b-richblack-700 translate-y-  transition-all duration-500 py-8`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link
          to="/"
          onClick={() => {
            dispatch(setProgress(100));
          }}
        >
          <div className="w-30">
            <img src={logo} className="h-12 md:h-16 w-auto" alt="Logo" />
          </div>
        </Link>
        {/* mobile Navbar */}
        {user && user?.accountType !== "Instructor" && (
          <div className=" md:hidden">
            <Link
              to="/dashboard/cart"
              className=" relative left-10"
              onClick={() => {
                dispatch(setProgress(100));
              }}
            >
              <div className="">
                <TiShoppingCart className=" fill-richblack-25 w-8 h-8" />
              </div>
              {totalItems > 0 && (
                <span className=" font-medium text-[12px] shadow-[3px ] shadow-black bg-yellow-100 text-richblack-900 rounded-full px-[4px] absolute -top-[2px] right-[1px]">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        )}

        <div
          className={`flex md:hidden  relative gap-4 flex-row ${
            token !== null && user?.accountType !== "Instructor"
              ? " -left-12"
              : ""
          }`}
        >
          <GiHamburgerMenu
            className={`w-16 h-8 fill-richblack-25 absolute left-10 -bottom-4 `}
            onClick={shownav}
          />
          <div
            ref={overlay}
            className=" fixed top-0 bottom-0 left-0 right-0 z-30 bg w-[100vw] hidden h-[100vh] overflow-y-hidden bg-[rgba(0,0,0,0.5)] "
            onClick={shownav}
          ></div>
          <div ref={show} className="mobNav z-50">
            <nav
              className=" items-center flex flex-col absolute w-[200px] -left-[80px] -top-7  glass2"
              ref={show}
            >
              {token == null && (
                <Link
                  to="/login"
                  className=""
                  onClick={() => {
                    dispatch(setProgress(100));
                  }}
                >
                  <button
                    onClick={shownav}
                    className=" mt-4 text-center text-[15px] px-6 py-2 rounded-md font-semibold bg-yellow-50 text-black hover:scale-95 transition-all duration-200"
                  >
                    Login
                  </button>
                </Link>
              )}
              {token == null && (
                <Link
                  to="/signup"
                  className="text-yellow-50"
                  onClick={() => {
                    dispatch(setProgress(100));
                  }}
                >
                  <button
                    onClick={shownav}
                    className="mt-4 text-center text-[15px] px-5 py-2 rounded-md font-semibold bg-yellow-50 text-black hover:scale-95 transition-all duration-200"
                  >
                    Signup
                  </button>
                </Link>
              )}

              {token != null && (
                <div className=" mt-2">
                  <p className=" text-richblack-50 text-center mb-2">Account</p>
                  {/* <Link to='/dashboard' onClick={()=>{dispatch(setProgress(100));shownav()}} className="p-2"> */}
                  <ProfileDropDown />
                  {/* </Link> */}
                </div>
              )}
              <div className=" mt-4 mb-4 bg-richblack-25 w-[200px] h-[2px]"></div>
              <p className=" text-xl text-yellow-50 font-semibold">Courses</p>
              <div className=" flex flex-col items-end pr-4">
                {sublinks?.length < 0 ? (
                  <div></div>
                ) : (
                  sublinks?.map((element, index) => (
                    <Link
                      to={`/catalog/${element?.name}`}
                      key={index}
                      onClick={() => {
                        dispatch(setProgress(30));
                        shownav();
                      }}
                      className="p-2 text-sm"
                    >
                      <p className=" text-richblack-5 ">{element?.name}</p>
                    </Link>
                  ))
                )}
              </div>
              <div className=" mt-4 mb-4 bg-richblack-25 w-[200px] h-[2px]"></div>
              <Link
                to="/about"
                onClick={() => {
                  dispatch(setProgress(100));
                  shownav();
                }}
                className="p-2"
              >
                <p className=" text-richblack-5 ">About</p>
              </Link>
              <Link
                to="/contact"
                onClick={() => {
                  dispatch(setProgress(100));
                  shownav();
                }}
                className="p-2"
              >
                <p className=" text-richblack-5 ">Contact</p>
              </Link>
            </nav>
          </div>
        </div>

        {/* Desktop Navbar */}

        <nav className="w-full md:flex items-center justify-between p-4 bg-richblack-900 text-richblack-25 relative">
          {/* Left Menu */}
          <ul className="flex-row gap-x-8 gap-5 hidden md:flex">
            {NavbarLinks?.map((element, index) => (
              <li key={index} className="relative group">
                {element.title === "Catalog" ? (
                  <>
                    <button
                      className="flex items-center gap-1 cursor-pointer"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {element.title}
                      <svg
                        width="25px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
                          fill="#ffffff"
                        />
                      </svg>
                    </button>
                    <div className="absolute left-1/2 top-full z-50 w-52 flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 invisible transition-all duration-150 group-hover:visible group-hover:opacity-100 translate-x-[-50%] translate-y-2 lg:w-72">
                      {sublinks?.length > 0 &&
                        sublinks.map((sub, subIndex) => (
                          <Link
                            to={`/catalog/${sub?.name}`}
                            key={subIndex}
                            className="block rounded-lg py-2 px-3 hover:bg-richblack-50"
                            onClick={() => dispatch(setProgress(30))}
                          >
                            {sub?.name}
                          </Link>
                        ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={element?.path}
                    className={` bg-red-500 ${
                      window.location.pathname === element?.path
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                    onClick={() => dispatch(setProgress(100))}
                  >
                    {element?.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Search */}
          <form
            onSubmit={handelSearch}
            className="flex items-center relative ml-4 hidden md:flex"
          >
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search"
              className=" w-40 border-0 focus:ring-1 ring-richblack-400 rounded-full px-2 py-1 text-[15px]  text-richblack-50 bg-richblack-700 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute left-30 top-1 text-richblack-100"
            >
              <HiSearch size={20} />
            </button>
          </form>

          {/* User Actions */}
          <div className="flex-row gap-5 hidden md:flex items-center ml-4">
            {user && user.accountType !== "Instructor" && (
              <Link
                to="/dashboard/cart"
                className="relative px-4"
                onClick={() => dispatch(setProgress(100))}
              >
                <TiShoppingCart className="fill-richblack-25 w-7 h-7" />
                {totalItems > 0 && (
                  <span className="absolute -top-[2px] right-[8px] text-[10px] font-bold bg-yellow-100 text-richblack-900 rounded-full px-1 shadow-sm shadow-black">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {!token ? (
              <>
                <Link
                  to="/login"
                  className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100"
                  onClick={() => dispatch(setProgress(100))}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100"
                  onClick={() => dispatch(setProgress(100))}
                >
                  Signup
                </Link>
              </>
            ) : (
              <div className="pt-2">
                {/* Profile Dropdown Placeholder */}
                Hello, {user?.name || "User"}
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
