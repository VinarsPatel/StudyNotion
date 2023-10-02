import React, { useEffect, useState } from "react"
import { Link, matchPath, useLocation } from "react-router-dom"
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { useSelector } from "react-redux"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropDown from "../core/Auth/ProfileDropDown"
import { PiShoppingCart } from "react-icons/pi"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { IoIosArrowDropdownCircle } from "react-icons/io"

export const Navbar = () => {
  const location = useLocation()
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { totalItems } = useSelector((state) => state.cart)
  const [subLinks, setSubLinks] = useState([])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const fetchData = async () => {
    try {
      const data = await apiConnector("GET", categories.CATEGORIES_API)
      console.log(data)
      console.log(data.data)
      setSubLinks(data.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="flex items-center justify-center border-b-[1px] border-richblack-700 p-4 md:max-h-14">
      <div className="flex w-11/12 flex-col items-center justify-between  gap-4 md:flex-row">
        <Link to={"/"}>
          <img src={logo} alt="logo-full-light" width={160} height={42} />
        </Link>

        <nav>
          <ul className="flex flex-row gap-x-6 text-richblack-25 ">
            {NavbarLinks.map((ele, index) => {
              return (
                <li key={index}>
                  {ele.title === "Catalog" ? (
                    <div className="group relative flex items-center gap-2">
                      <p>{ele.title}</p>
                      <IoIosArrowDropdownCircle />

                      <div className="invisible absolute left-[50%] top-[0%] flex w-fit translate-x-[-50%] translate-y-[80%] flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                        <div
                          className="absolute left-[50%] top-0
                                h-3
                                w-3 translate-x-[0%] translate-y-[-45%] rotate-45 rounded bg-richblack-5"
                        ></div>

                        {subLinks.length ? (
                          subLinks.map((subLink, index) => (
                            <Link
                              to={`${subLink.name}`}
                              key={index}
                              className="w-fit "
                            >
                              <p>{subLink.name}</p>
                            </Link>
                          ))
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={ele?.path}>
                      <p
                        className={`${
                          matchRoute(ele.path) ? "text-yellow-25" : "text-white"
                        }`}
                      >
                        {ele.title}
                      </p>
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-x-4">
          {user !== null && user?.accontType === ACCOUNT_TYPE.STUDENT && (
            <PiShoppingCart>
              {totalItems !== 0 && <span>{totalItems}</span>}
            </PiShoppingCart>
          )}

          {token === null && (
            <Link
              to={"/login"}
              className="rounded-md border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
            >
              Log In
            </Link>
          )}

          {token === null && (
            <Link
              to={"/signup"}
              className="rounded-md border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
            >
              Sign Up
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  )
}
