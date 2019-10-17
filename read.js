const mongoose  = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-exercises')
    .then(() => console.log('connected to mongoDB...'))
    .catch((err) => console.log('could not connect to mongo DB...'. err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

//Exercise - 1
// get all courses
//sort them by name
// pick only their name and author
//display them

// async function getCourses() {
//     const courses = await Course
//     .find({author: 'Srinath'})
//     // .find({author: /Srinath/i})
//     .sort({name: 1}) // 1 assending  -1 desending
//     .select({names: 1, author: 1})
//     console.log(courses)
// }


//Exercise -2
//Get all published frontend and backend courses
//sort them by there price in a descending order
//pick only there name and author
//display them

// async function getCourses() {
//     const courses = await Course
//     .find({isPublished: true, tags: {$in: [/frontend/i, /backend/i]}})
//     .sort({price: -1}) // 1 assending  -1 desending
//     //.sort('-price')
//     .select({names: 1, author: 1})
//     // .select('name author')
//     console.log(courses)
// }

//Exercise 3
//Get all the published courses that are having price $15 or more
//or have the word 'by' in their name

async function getCourses() {
    const courses = await Course
    .find({isPublished: true})
    .or([{price: { $gte: 15 }}, {name: /.*by*./}])
    .select({name: 1, author: 1, price: 1})
    console.log(courses)
}


// getCourses();

