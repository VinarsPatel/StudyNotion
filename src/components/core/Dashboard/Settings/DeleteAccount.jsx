import React from "react"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { deleteProfile } from "../../../../services/operations/settingsAPI"
import { useNavigate } from "react-router-dom"

const DeleteAccount = () => {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const deleteAccount = () => {
    dispatch(deleteProfile(token, navigate))
  }

  return (
    <div className="flex gap-5 rounded-lg border border-pink-700 bg-pink-900 p-6">
      <div className="flex h-fit w-fit items-center justify-center rounded-full bg-pink-700 p-3">
        <RiDeleteBin6Fill fill={"#EF476F"} className="h-6 w-6" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-pink-5 ">Delete Account</h2>
        <div className="text-sm font-medium text-pink-25 ">
          <p>Would you like to delete account?</p>
          <p>
            This account contains Paid Courses. Deleting your account will
            remove all the contain associated with it.
          </p>
        </div>
        <p
          className="cursor-pointer text-base font-medium italic text-pink-300"
          onClick={deleteAccount}
        >
          I want to delete my account.
        </p>
      </div>
    </div>
  )
}

export default DeleteAccount