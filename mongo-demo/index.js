const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    // uppercase:true
    trim: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          //do some async work
          const result = v && v.length > 0;
          callback(result);
        }, 4000);
      },
      message: "Course should have at least 1 tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Node.js Course",
    category: "Web",
    author: "Mosh",
    tags: ["backend"],
    isPublished: true,
    price: 15.8,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ _id: "60e2d6c7bba99846489e946c" })
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, price: 1 });

  console.log(courses[0].price);
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
getCourses();
