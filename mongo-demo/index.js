const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Node.js Course",
    author: "Mosh",
    tags: ["node", "backendend"],
    isPublished: true,
  });

  const result = await course.save();
  //   console.log(result);
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });

  console.log(courses);
}
async function updateCourse(id) {
  // Approach: Quesry first
  // findById()
  // Modufy properties
  // save()
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jason",
        isPublished: false,
      },
    },
    { new: true }
  );
  //   if (!course) return;

  //   course.isPublished = true;
  //   course.author = "Another Author";

  // course.set({
  //     isPublished: true,
  //     author: 'Another Author'
  // })
  //   const result = await course.save();
  console.log(result);
}

async function removeCourse(id) {
  //   const result = await Course.deleteMany({ _id: id });
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}
removeCourse("60e1fdcbf520a879302ed853");
