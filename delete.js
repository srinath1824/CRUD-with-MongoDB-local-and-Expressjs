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

async function removeCourse(id) {
    //find first one and delete that
    // Course.deleteOne({isPublished: false})
    
    const result = await Course.deleteOne({_id: id});
    
    //const result = await Course.findByIdAndRemove(id);
    console.log(result);
}

removeCourse('5a68ff090c553064a218a547')