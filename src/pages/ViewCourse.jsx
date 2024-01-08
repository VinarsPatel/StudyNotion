import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import LectureBar from "../components/core/VIewCourse/LectureBar"
import { Loader } from "../components/common/Loader"
import {
  BigPlayButton,
  ControlBar,
  ForwardControl,
  LoadingSpinner,
  PlaybackRateMenuButton,
  Player,
  ReplayControl,
  VolumeMenuButton,
} from "video-react"
import { useSelector } from "react-redux"

const ViewCourse = () => {
  const [video, setVideo] = useState(null)
  const [course, setCourse] = useState(null)
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  useEffect(() => {
    async function fetchCourseDetails() {
      const courseRes = await getDetailsOfCourse(courseId, token)

      if (courseRes) {
        setCourse(courseRes)
        if (courseRes?.content[0]?.subSections.length > 0)
          setVideo(courseRes?.content[0]?.subSections[0])
      }
    }
    fetchCourseDetails()
  }, [courseId, token])
  return !course ? (
    <Loader />
  ) : (
    <div className="flex min-w-[800px] flex-col 2md:flex-row">
      <div className="min-w-[250px]">
        <LectureBar course={course} setVideo={setVideo} id={video._id} />
      </div>
      <div className="flex w-full min-h-[1000px] flex-col gap-5 px-6">
        <Player aspectRatio="16:9" fluid={true} height={500}>
          <LoadingSpinner />
          <BigPlayButton position="center" />
          <source src={video?.videoUrl} />
          <ControlBar
            autoHide={true}
            className="rounded-sm font-inter text-sm "
          >
            <VolumeMenuButton vertical />
            <PlaybackRateMenuButton order={7} rates={[5, 2, 1, 0.5, 0.1]} />
            <ForwardControl seconds={10} order={3} />
            <ReplayControl seconds={10} order={1} />
          </ControlBar>
        </Player>
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-semibold text-richblack-5">
            {video.title}
          </p>
          <p className="max-w-[80%] text-sm font-medium text-richblack-50 ">
            {video.description}
          </p>
        </div>
        
      </div>
    </div>
  )
}

export default ViewCourse
