import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from '../../utils/constants'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { PiShoppingCart } from 'react-icons/pi'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import { IoIosArrowDropdownCircle } from 'react-icons/io'


export const Navbar = () => {
   const location = useLocation();
   const { user } = useSelector((state) => state.profile);
   const { token } = useSelector((state) => state.auth);
   const { totalItems } = useSelector((state) => state.cart);
   const [subLinks, setSubLinks] = useState([]);

   const matchRoute = (route) => {
      return matchPath({ path: route }, location.pathname);
   }

   const fetchData = async () => {
      try {
         const data = await apiConnector('GET', categories.CATEGORIES_API);
         console.log(data);
         console.log(data.data);
         setSubLinks(data.data.data);

      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      fetchData();
   }
      , [])
   return (
      <div className='flex items-center justify-center p-4 md:max-h-14 border-b-[1px] border-richblack-700'>
         <div className='flex w-11/12 flex-col gap-4 md:flex-row  items-center justify-between'>
            <Link to={"/"}>
               <img src={logo} alt='logo-full-light' width={160} height={42} />
            </Link>

            <nav>
               <ul className='flex flex-row gap-x-6 text-richblack-25 '>
                  {
                     NavbarLinks.map((ele, index) => {
                        return (
                           <li key={index}>
                              {
                                 ele.title === "Catalog" ?
                                    <div className='relative flex items-center gap-2 group'>
                                       <p>{ele.title}</p>
                                       <IoIosArrowDropdownCircle />

                                       <div className='invisible absolute left-[50%] translate-x-[-50%] translate-y-[80%] top-[0%] flex flex-col rounded-md bg-richblack-5 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-fit p-4'>

                                          <div className='absolute left-[50%] top-0
                                translate-x-[0%]
                                translate-y-[-45%] h-3 w-3 rotate-45 rounded bg-richblack-5'>
                                          </div>

                                          {
                                             subLinks.length ? (
                                                subLinks.map((subLink, index) => (
                                                   <Link to={`${subLink.name}`} key={index} className='w-fit '>
                                                      <p>{subLink.name}</p>
                                                   </Link>
                                                ))
                                             ) : (<div></div>)
                                          }

                                       </div>

                                    </div>
                                    :
                                    <Link to={ele?.path} >
                                       <p className={`${matchRoute(ele.path) ? "text-yellow-25" : "text-white"}`}>
                                          {ele.title}
                                       </p>
                                    </Link>
                              }
                           </li>
                        )
                     })
                  }
               </ul>
            </nav>

            <div className='flex gap-x-4 items-center'>

               {
                  user !== null && user?.accontType === ACCOUNT_TYPE.STUDENT &&
                  <PiShoppingCart>
                     {
                        totalItems !== 0 &&
                        <span>{totalItems}</span>
                     }
                  </PiShoppingCart>

               }

               {

                  token === null &&
                  <Link to={"/login"} className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md text-richblack-100'>
                     Log In
                  </Link>
               }

               {
                  token === null &&
                  <Link to={"/signup"} className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md text-richblack-100'>
                     Sign Up
                  </Link>
               }

               {
                  token !== null &&
                  <ProfileDropDown />
               }
            </div>
         </div>
      </div>
   )
}
