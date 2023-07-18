import React from 'react'

const ContactButton = ({ children, }) => {
   return (
      <button type='submit'
       className={`w-full text-lg font-medium font-inter flex items-center justify-center py-3 px-6 rounded-lg
  bg-yellow-50 text-richblack-800 transition-all hover:scale-95 duration-200`}
         style={{ boxShadow: `-3px -3px 0px 0px rgba(255, 255, 255, 0.51) inset` }}
      >
         {children}
      </button>
   )
}

export default ContactButton