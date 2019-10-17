const mongoose  = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-exercises')
.then(() => console.log('connected to mongoDB...'))
.catch((err) => console.log('could not connect to mongo DB...'. err));

const courseSchema = new mongoose.Schema({
    _id: String,
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('course', courseSchema);

async function updateCourse(id) {

    //Query first
    // const course = await Course.findById(id);
    // if(!course) return;

    // course.isPublished = true;
    // course.author = "John philips";

    // const result = await course.save();
    // console.log(result);
//-----------------------------------------------------------------

    //update search for mongoDB update operators
    // const result = await Course.update({_id:id}, {
    //     $set: {
    //         author: "Tom",
    //         isPublished: false
    //     }
    // });
    // console.log(result);

//--------------------------------------------------------------------
    const result = await Course.findByIdAndUpdate(id, {
        $set: {
            author: "Tom John",
            isPublished: false
        }
    }, {new: true});
    console.log(result);
}



updateCourse('5a68fdd7bee8ea64649c2777');

// Course.findById(id, async(err, courses) => {
    //     courses.set({
    //         isPublished: true,
    //         author: "Another Author"
    //     });
    //     const result = await courses.save();
    //     console.log(result)
    // })