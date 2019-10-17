const mongoose  = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground')
    .then(() => console.log('connected to mongoDB...'))
    .catch((err) => console.log('could not connect to mongo DB...'. err));

// Create a schema this is specific to mongoose
//this is to define shape of document
const courseSchema = new mongoose.Schema({
    //validation
    name: {type: String, required: true, minlength: 5, maxlength: 255},
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: 'A course should have atleast 1 tag'
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean
});

//compile to model which gives us class
const Course = mongoose.model('Course', courseSchema);

//validate
//Course.validate();

async function createCourse() {
    //creates document in mongodb
const course = new Course({
    name: 'demo course',
    author: 'demo',
    tags: ['abc'],
    isPublished: true
});

//or
// try{
// course.validate();
// }
// catch(ex) {
//     console.log(ex.message);
// }

//saving a document async operation
try{
const result = await course.save();
console.log(result);
} catch(ex) {
    console.log(ex.message);
}
}

createCourse();


// async function getCourses() {
//     const courses = await Course
//     .find({author: 'Srinath', name:'Nodejs Course'})
//     .limit(10)
//     .sort({name: 1}) // 1 assending  -1 desending
//     .select({names: 1, tags: 1, date:1})
//     console.log(courses)
// }

// getCourses();
//createCourse();

//More complex filtering
//comparision operator
// async function getCourses() {
//     //eq equal
//     //ne not equal
//     //gt greater than
//     //get
//     //lt
//     //lte
//     //in
//     //nin not in

//     const courses = await Course
//     //.find({author: 'Srinath', name:'Nodejs Course'})
//     //.find({price: { $gte: 10, $lte: 20 }})
//     .find({price: { $in: [10,15,20] }})
//     .limit(10)
//     .sort({name: 1}) // 1 assending  -1 desending
//     .select({names: 1, tags: 1})
//     console.log(courses)
// }

//Logical operators
// async function getCourses() {
//     // or
//     //and

//     const courses = await Course
//     // .find({author: 'Srinath', name:'Nodejs Course'})
//     .find()
//     .or([{author: 'Srinath'},{name:'Nodejs Course'}])
//     .and([{author: 'Srinath'},{name:'Nodejs Course'}])
//     .limit(10)
//     .sort({name: 1}) // 1 assending  -1 desending
//     .select({names: 1, tags: 1})
//     console.log(courses)
// }

// Regular expression
// async function getCourses() {
//     const courses = await Course
//     .find({author: '/pattern/'})
//     //Starts with srinath
//     .find({author: /^Srinath/})
//     //ends with john case sensitive
//     .find({author: /john$/})
//     //case insensitive
//     .find({author: /john$/i})

//     // Contains Srinath 0 or more characters
//     .find({author: /.*Srinath.*/i})

//     .limit(10)
//     .sort({name: 1}) // 1 assending  -1 desending
//     .select({names: 1, tags: 1})
//     console.log(courses)
// }

// getCourses();