import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconButton';
import { FiUpload } from 'react-icons/fi'
import { updateDisplayPicture } from '../../../../services/operations/settingsAPI';
import { toast } from 'react-hot-toast';

const ChangeProfilePicture = () => {
   const { user } = useSelector((state) => state.profile);
   const { token } = useSelector((state) => state.auth);
   const dispatch = useDispatch();

   const [loading, setLoading] = useState(false);
   const [imageFile, setImageFile] = useState(null);
   const [previewImage, setPreviewImage] = useState(null);
   const fileInputRef = useRef();

   const setPreviewSource = (file) => {
      const reader = new FileReader();
      console.log(file);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
         setPreviewImage(reader.result);
      }
   }

   const onChangeHandler = (e) => {
      console.log(e.target.files);
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewSource(file);
   } 

   const onSubmitHandler = (e) => {
      e.preventDefault();
      if (!imageFile) {
         toast.error("Please Select Profile Picture.");
         return;
      }
      setLoading(true);
      dispatch(updateDisplayPicture(token, { "displayPicture": imageFile }));
      setLoading(false);
   }
   const onClickHandler = () => {
      fileInputRef.current.click();
   }

   return (
      <div className='flex gap-5 p-6 bg-richblack-800 border-richblack-700 border  rounded-lg '>
         <img className='aspect-square w-[78px] rounded-full object-cover'
            src={previewImage || user?.image} alt={`${user.firstName}_${user.lastName}_Picture`}
         />
         <div className='flex flex-col gap-3'>
            <p className='font-medium text-base text-richblack-25 '>Change Profile Picture</p>
            <div className='flex flex-row gap-3'>

               <button
                  onClick={onClickHandler}
                  disabled={loading}
                  className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'>
                  Select
               </button>
               <form className='' onSubmit={onSubmitHandler}>

                  <input
                     type='file'
                     ref={fileInputRef}
                     onChange={onChangeHandler}
                     className='hidden'
                     accept="image/png, image/gif, image/jpeg"
                  />
                  <IconBtn text={loading ? "Uploading..." : "Upload"} type={'submit'} customClasses={'flex items-centre'}>
                     {!loading && <FiUpload className='text-lg text-richblack-900' />}
                  </IconBtn>
               </form>

            </div>
         </div>
      </div>
   )
}

export default ChangeProfilePicture