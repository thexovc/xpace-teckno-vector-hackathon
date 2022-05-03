import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import Link from 'next/link'
import { UserContext } from "../context/user";

const Navbar = () => {
    // const [toggle, setToggle] = useState(false)
    const router = useRouter();
    const { userDetails, toggle, getUser, setToggle } = useContext(UserContext)

    getUser()



    const LogOut = async () => {
        try {

            router.push({
                pathname: `/`,
            });



        } catch (err) {
            // { code: 4001, message: 'User rejected the request.' }
            console.log(err)
        }
    }

    const onToggle = () => {
        setToggle(!toggle)
    }


    return (


        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded " >
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link href="/profile" className="flex items-center">
                    <>
                        <img src="/assets/svg.svg" className="mr-3 h-6 sm:h-9" alt="Xpace Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap ">Xpace</span>
                    </>
                </Link>
                <div className="flex items-center md:order-2">
                    <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 " id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src={userDetails.profileImage}
                        />
                    </button>




                    <button onClick={onToggle} data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="mobile-menu-2" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" >
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <Link href="/posts" aria-current="page">
                            <li className="block hover:cursor-pointer rounded-lg hover:text-white font-semibold py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                                Forum
                            </li>
                        </Link>
                        <Link href="/course" >
                            <li className="block hover:cursor-pointer rounded-lg hover:text-white font-semibold py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                                Courses
                            </li>
                        </Link>
                        <Link href="/hire" >
                            <li className="block hover:cursor-pointer rounded-lg hover:text-white font-semibold py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                                Hire
                            </li>
                        </Link>
                        <Link href="/make_post" >
                            <li className="block hover:cursor-pointer rounded-lg hover:text-white font-semibold py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                                Make a Post
                            </li>
                        </Link>
                        <Link href="/create_course" >
                            <li className="block hover:cursor-pointer rounded-lg hover:text-white font-semibold py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                                Make a Course
                            </li>
                        </Link>
                        <Link href="/profile" >
                            <li className="block hover:cursor-pointer rounded-lg hover:text-white font-semibold py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                                Profile
                            </li>
                        </Link>
                        <Link href="/orderTrx" >
                            <li className="block hover:cursor-pointer rounded-lg hover:text-white font-semibold py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                                Transactions
                            </li>
                        </Link>
                        <a className="block py-2 pr-4 
                            pl-3 hover: cursor-pointer text-gray-700 rounded-lg border-red-200 border-2 hover:bg-red-400 hover:text-white font-semibold">
                            <li onClick={LogOut} className="hover: cursor-pointer">
                                SignOut
                            </li>
                        </a>

                    </ul>
                </div>
                {toggle && <div className=" justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <Link href="/posts" aria-current="page">
                            <li className="block hover:cursor-pointer rounded-lg hover:text-white font-semibold py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                                Forum
                            </li>
                        </Link>
                        <Link href="/course" >
                            <li className="block hover:cursor-pointer rounded-lg hover:text-white font-semibold py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                                Courses
                            </li>
                        </Link>
                        <Link href="/hire" >
                            <li className="block hover:cursor-pointer rounded-lg hover:text-white font-semibold py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                                Hire
                            </li>
                        </Link>
                        <Link href="/make_post" >
                            <li className="block hover:cursor-pointer rounded-lg hover:text-white font-semibold py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                                Make a Post
                            </li>
                        </Link>
                        <Link href="/create_course" >
                            <li className="block hover:cursor-pointer rounded-lg hover:text-white font-semibold py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                                Make a Course
                            </li>
                        </Link>
                        <Link href="/profile" >
                            <li className="block hover:cursor-pointer rounded-lg hover:text-white font-semibold py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                                Profile
                            </li>
                        </Link>
                        <Link href="/orderTrx" >
                            <li className="block hover:cursor-pointer rounded-lg hover:text-white font-semibold py-2 pr-4 
                            pl-3 text-gray-700 border-blue-200 border-2 hover:bg-blue-400">
                                Transactions
                            </li>
                        </Link>

                        <a className="block py-2 pr-4  hover: cursor-pointer
                            pl-3 text-gray-700 rounded-lg border-red-200 border-2 hover:bg-red-400 hover:text-white font-semibold">
                            <li onClick={LogOut} className="hover: cursor-pointer">
                                SignOut
                            </li>
                        </a>

                    </ul>
                </div>}
            </div>





        </nav >

    );
}

export default Navbar;