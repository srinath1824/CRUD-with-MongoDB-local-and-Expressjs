// const mongoose  = require('mongoose');

//     mongoose.connect('mongodb://localhost:27017/playground')
//     .then(() => console.log('connected to mongoDB...'))
//     .catch((err) => console.log('could not connect to mongo DB...'. err));

//     const courseSchema = new mongoose.Schema({
//     _id: String,
//     name: String,
//     author: String,
//     tags: [String],
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     isPublished: Boolean
// });

// module.exports = mongoose.model('Course', courseSchema);

//--------------------------------------------------------------------------------------------------

const mongoose  = require('mongoose');

    mongoose.connect('mongodb://localhost:27017/userData')
    .then(() => console.log('connected to mongoDB...'))
    .catch((err) => console.log('could not connect to mongo DB...'. err));

    const courseSchema = new mongoose.Schema({
        name: {type: String, required: true, minlength: 3},
        username: String,
        email: String,
        address: {
            street: String,
            suite: String,
            city: String,
            zipcode: String,
            geo: {
                lat: String,
                lng: String
            },
        },
        isPublished: Boolean,
        phone: {
            type: String,
            required: function() { return this.isPublished }
        },
        website: String,
        company: {
            name: String,
            catchPhrase: String,
            bs: String
        }
});

module.exports = mongoose.model('User', courseSchema);

