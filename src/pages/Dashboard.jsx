import React from 'react'
import { useSelector } from 'react-redux'
import { Loader } from '../components/common/Loader';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

const Dashboard = () => {
   const { loading: profileLoading } = useSelector((state) => state.profile)
   const { loading: authLoading } = useSelector((state) => state.auth)

   if (profileLoading || authLoading) {
      return (
        <Loader/>
      )
   }


   return (
      <div className='flex w-[100%]'>
         <Sidebar />

         {profileLoading ? <Loader /> :
            <div className='h-[calc(100vh-3.5rem)] overflow-auto w-full'>
               <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                  <Outlet />
               </div>
            </div>
         }
      </div>
   )
}

export default Dashboard