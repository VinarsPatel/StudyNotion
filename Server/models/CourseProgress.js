const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
   couresID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
   },
   completedVideos: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection"
   }

});

module.exports = mongoose.model("CourseProgress", courseProgressSchema);