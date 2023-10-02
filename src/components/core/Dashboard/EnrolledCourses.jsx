import React, { useState } from "react"
import { useSelector } from "react-redux"
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import { useEffect } from "react"
import { Loader } from "../../common/Loader"

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth)
  const [enrolledCourses, setEnrolledCourses] = useState(null)

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token)
      setEnrolledCourses(response)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getEnrolledCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h2 className="mb-14 text-3xl font-medium text-richblack-5">
        Profile Information
      </h2>
      {enrolledCourses ? (
        enrolledCourses.length === 0 ? (
          <p className="w-full p-6 text-center text-richblack-5">
            You have not enrolled in any course yet.
          </p>
        ) : (
          <div>
            <div>
              <p>Course Name</p>
              <p>Duration</p>
              <p>Progress</p>
            </div>
            {/* 👻👻👻👻 Course Display Remaining */}
            {enrolledCourses.map((course, index) => {
              return <div></div>
            })}
          </div>
        )
      ) : (
        <Loader />
      )}
    </>
  )
}

export default EnrolledCourses
