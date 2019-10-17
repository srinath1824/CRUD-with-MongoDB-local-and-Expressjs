const Model =  require('./mongo');
const express =  require('express');
const bodyParser = require("body-parser");
const app = express();
const jwt = require('jsonwebtoken');
const auth = require('./auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/token', async(req,res) => {
    let token = jwt.sign({id: "srinath"}, 'bwqifuqweufivgashvxywgutqfwtey3f5rf76y3fevduacgyjb');
    res.send(token);
})

//Create
app.post('/api/user', async(req,res) => {
    
    const userData = req.body;
    console.log(userData.name, userData.address.street);

    const course = new Model({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        address: {
        street: req.body.address.street,
        suite: req.body.address.suite,
        city: req.body.address.city,
        zipcode: req.body.address.zipcode,
        geo: {
            lat: req.body.address.geo.lat,
            lng: req.body.address.geo.lng,
        }
        },
        isPublished: req.body.isPublished,
        phone: req.body.phone,
        website: req.body.website,
        company: {
            name: req.body.company.name,
            catchPhrase: req.body.company.catchPhrase,
            bs: req.body.company.bs,
        }
    });
    try{
    const result = await course.save();
    res.send(result);
    
} catch(err) {
    console.log(err.message)
    res.send(err.message)
}
})

// Read
app.get('/api/list', auth, async (req,res) => {
    const courses = await Model
    .find({})
    .sort({name: 1}) // 1 assending  -1 desending
    // .select({names: 1, tags: 1, date:1})
    res.send(courses);
});

//Update
app.put('/api/list', async (req,res) => {

    // const id = await Model
    // .findOne({username: "nodejs"})
    // .select({_id: 1});
    // console.log(id);
    const id = req.body.id;

    const courses = await Model
    .findByIdAndUpdate(id, {
        $set: {
            username: "mongodb"
        }
    }, {new: true});
    res.send(courses);
});

//Delete
app.delete('/api/list/:id', async(req,res) => {
    const id = req.params.id;
    const result = await Model.deleteOne({_id: id});
    
    //const result = await Course.findByIdAndRemove(id);
    res.send(result);
    console.log(result);
})


app.listen(8888, ()=>{console.log("Server is running on port 8888")})