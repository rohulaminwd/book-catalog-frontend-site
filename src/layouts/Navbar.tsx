import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { FaBlogger } from "react-icons/fa";
import { BiMessageSquareDetail } from "react-icons/bi";
import logo from "../assets/images/logo1.png";
// import Loading from "./Loading";
// import LogOutModule from "../Modale/LogOutModule";
import { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { useEffect } from "react";
import {
    MdOutlineDashboardCustomize,
    MdOutlineManageAccounts,
} from "react-icons/md";

const Navbar = () => {
    const usertoken = localStorage.getItem("accessToken");
    const [logout, setLogout] = useState(null);
    const [stickyClass, setStickyClass] = useState("0");
    console.log(stickyClass, "dfjdjfkjf");

    function stickNavbar() {
        const windowHeight = window.scrollY;
        windowHeight > 500 ? setStickyClass("sticky-nav") : setStickyClass("");
    }

    useEffect(() => {
        window.addEventListener("scroll", stickNavbar);
    }, []);


    if (window.scrollY > 200) {
        console.log("scroll");
    }

    const menuItems = (
        <>
            <li className="mx-1">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-transparent border-b-2 border-primary text-primary px-1 rounded-none mx-1 sm:mx-3"
                            : "px-1 rounded-none mx-1 sm:mx-3"
                    }
                >
                    <span className="ml-1 mt-0 sm:block hidden hide-p sm:text-[18px] text-sm">
                        Home
                    </span>
                </NavLink>
            </li>
            <li className="mx-1">
                <NavLink
                    to="/all-books"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-transparent border-b-2 border-primary text-primary px-1 rounded-none mx-1 sm:mx-3"
                            : "px-1 rounded-none mx-1 sm:mx-3"
                    }
                >
                    <span className="ml-1 mt-0 sm:block hidden hide-p sm:text-[18px] text-sm">
                        All Books
                    </span>
                </NavLink>
            </li>
            <li className="mx-1">
                <NavLink
                    to="/book"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-transparent border-b-2 border-primary text-primary px-1 rounded-none mx-1 sm:mx-3"
                            : "px-1 rounded-none mx-1 sm:mx-3"
                    }
                >
                    <span className="ml-1 mt-0 sm:block hidden hide-p sm:text-[18px] text-sm">
                        Blog
                    </span>
                </NavLink>
            </li>
        </>
    );

    const ProfileItems = (
        <>
            <li className="pl-2 ml-0 list-none">
                {usertoken ? (
                    <div className="dropdown p-0 dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle online avatar"
                        >
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                                {/* {me?.image && <img src={me?.image} alt="profile" />}
                {!me?.image && (
                  <div className="w-full">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center ring ring-[#91f2dc] ring-offset-base-100 ring-offset-2">
                      <h2 className="text-xl uppercase font-bold text-white">
                        {me?.name?.firstName?.slice(0, 1)}
                        {me?.name?.lastName?.slice(0, 1)}
                      </h2>
                    </div>
                  </div>
                )} */}
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="p-2 py-3 shadow-md border text-cyan-800 bg-[#fafbfbbc] border-[#9dbcd5a1] top-[60px] menu menu-compact dropdown-content bg-base-100 rounded-box w-48"
                        >
                            <div className="text-center border-b-2 border-blue-200 mb-3">
                                <div className="avatar online">
                                    <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        {/* { me?.image? <img src={me?.image} alt='profile' /> : <img src={profile} alt='profile' />} */}
                                        {/* {me && (
                      <div className="w-full">
                        <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center ring ring-[#91f2dc] ring-offset-base-100 ring-offset-2">
                          <h2 className="text-3xl uppercase font-bold text-white">
                            {me?.name?.firstName?.slice(0, 1)}
                            {me?.name?.lastName?.slice(0, 1)}
                          </h2>
                        </div>
                      </div>
                    )} */}
                                    </div>
                                </div>
                                <h1 className="text-xl py-1 text-blue-900">
                                    {/* {me?.name?.firstName} {me?.name?.lastName} */}
                                </h1>
                            </div>
                            <li className="font-bold">
                                <div className="hover:bg-[#d6f8f5]" >
                                    <MdOutlineManageAccounts size={"20px"} />
                                    <h1
                                        className={`origin-left whitespace-nowrap duration-300 font-medium`}
                                    >
                                        Update Profile
                                    </h1>
                                </div>
                            </li>
                            <li className="font-bold">
                                <div className="hover:bg-[#d6f8f5]" >
                                    <MdOutlineManageAccounts size={"20px"} />
                                    <h1
                                        className={`origin-left whitespace-nowrap duration-300 font-medium`}
                                    >
                                        Update Profile
                                    </h1>
                                </div>
                            </li>
                            <li className="font-bold">
                                <div className="hover:bg-[#d6f8f5]" >
                                    <MdOutlineManageAccounts size={"20px"} />
                                    <h1
                                        className={`origin-left whitespace-nowrap duration-300 font-medium`}
                                    >
                                        Update Profile
                                    </h1>
                                </div>
                            </li>
                            <label
                                // onClick={() => setLogout("logout")}
                                htmlFor="Logout-modal"
                                className="px-5 hover:text-accent flex items-center gap-2 cursor-pointer"
                            >
                                <HiOutlineLogout size={"20px"} /> Sign Out
                            </label>
                        </ul>
                    </div>
                ) : (
                    <li className="mx-1">
                        <NavLink className="" to="/login">
                            <div className="sm:flex justify-center sm:items-center">
                                <span className="ml-1 mt-0 block sm:text-[18px] text-sm">
                                    Login
                                </span>
                            </div>
                        </NavLink>
                    </li>
                )}
            </li>
        </>
    );
    return (
        <div
            className={` ${stickyClass} duration-300 z-50 font-bold bg-[#fff] shadow-md rounded-b-lg border-b text-cyan-900 w-full`}
        >
            <div className="navbar px-xl max-w-7xl flex items-center justify-between mx-auto">
                <div className="">
                    <h1 className='text-xl uppercase font-bold'>Books</h1>
                    {/* <img src={logo} className="w-[80px]" alt="logo" /> */}
                </div>
                <div className="">
                    <div className="flex">
                        <ul className="menu menu-horizontal font-bold p-0">{menuItems}</ul>
                    </div>
                    <div>{ProfileItems}</div>
                </div>
            </div>
            {/* {logout && <LogOutModule logout={logout} setLogout={setLogout} />} */}
        </div>
    );
};

export default Navbar;
