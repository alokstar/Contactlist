/**
 * Created by Alok on 6/30/2016.
 */
var express=require('express');
var app=express();
var mongojs=require('mongojs');
var db=mongojs('persons',['persons']);
var bodyParser=require('body-parser');

// app.get('/',function(req,res){
//     res.send("hello from the server")
// });

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist1',function (req,res) {
    console.log("i received the get req");

    // var contacts=[{name:'abc',number:'1234567899',email:'abc@test.com'},
    //     {name:'ssc',number:'1232367899',email:'sdc@test.com'},
    //     {name:'asbc',number:'12sjkd34567899',email:'abc@tesjxst.com'}
    // ]
    // res.json(contacts);

    db.persons.find(function (err,docs) {
        console.log(docs);
        res.json(docs);
    })
});

app.post('/contactlist1',function (req,res) {
    console.log(req.body);
    db.persons.insert(req.body,function (err,doc) {          //This line is inserting data in json format using body-parser into db & responding with the same to UI
        res.json(doc);
    })
});

app.delete('/contactlist1/:id',function (req,res) {
    var id=req.params.id;
    console.log(id);
    db.persons.remove({_id: mongojs.ObjectId(id)},function (err,doc) {
        res.json(doc);
    })
});

app.get('/contactlist1/:id',function (req,res) {
    var id=req.params.id;
    console.log(id);
    db.persons.findOne({_id: mongojs.ObjectId(id)},function (err,doc) {
        res.json(doc);
    })
});

app.put('/contactlist1/:id',function (req,res) {
    var id=req.params.id;
    console.log(req.body.name);
    db.persons.findAndModify({query:{_id: mongojs.ObjectId(id)},
        update: {$set: {name:req.body.name,email:req.body.email,number:req.body.number}},
        new: true},function (err,doc) {
        res.json(doc);
    // };

    })
})

app.listen(3000);
console.log("server is running on port 3000");