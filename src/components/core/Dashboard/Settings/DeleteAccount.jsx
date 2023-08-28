import React from 'react'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProfile } from '../../../../services/operations/settingsAPI';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
   const {token} = useSelector((state)=>state.auth);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const deleteAccount = ()=>{
      dispatch(deleteProfile(token,navigate));
   }
   
   return (
      <div className='flex p-6 gap-5 bg-pink-900 rounded-lg border border-pink-700'>
         <div className='flex justify-center items-center rounded-full bg-pink-700 p-3 w-fit h-fit'>
            <RiDeleteBin6Fill fill={'#EF476F'} className='w-6 h-6' />
         </div>
         <div className='flex flex-col gap-2'>
            <h2 className='text-pink-5 text-lg font-bold '>Delete Account</h2>
            <div className='text-sm font-medium text-pink-25 '>
               <p>Would you like to delete account?</p>
               <p>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
            </div>
            <p className='text-pink-300 text-base font-medium italic cursor-pointer' onClick={deleteAccount}>I want to delete my account.</p>
         </div>
      </div>
   )
}

export default DeleteAccount