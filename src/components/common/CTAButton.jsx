import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({ children, active, linkto,classN}) => {
   return (
      <Link to={linkto}>
         <div className={`${classN} text-lg font-medium font-inter text-center flex items-center py-3 px-6 rounded-lg w-fit
            ${active ? "bg-yellow-50 text-richblack-800":"bg-richblack-800 text-white"}
            transition-all hover:scale-95 duration-200`}
            style={{boxShadow : `-3px -3px 0px 0px rgba(255, 255, 255, ${active?0.51:0.18}) inset`}}
            >
         {children}
      </div>
      </Link>
   )
}

export default CTAButton

