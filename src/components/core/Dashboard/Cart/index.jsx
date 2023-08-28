import React from 'react'
import { useSelector } from 'react-redux'
import RenderCourses from './RenderCourses';

const Cart = () => {
   const { totalItems } = useSelector((state) => state.cart);
   return (
      <div>
      
         <h1 className="mb-5 text-3xl font-medium text-richblack-5">My Wishlist</h1>
         <p className='text-sm py-2 font-medium text-richblack-400 border-b border-richblack-400 '>{`${totalItems} Course(s) in Wishlist`}</p>

         {
            totalItems > 0 ?
               <div className=''>
                  <RenderCourses/>
                  <div>
                  
                  </div>
               </div>
               : <p className='text-xl mt-10 text-center py-2 font-medium text-richblack-300'>
                  Wishlist Your Dream Courses
               </p>
         }
      </div>
   )
}

export default Cart