
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const { text } = require("express");
const { stringify } = require("querystring");


app.use(bodyParser.urlencoded({extended :true}));

var mongoDBURL= "mongodb+srv://astha1:asthadeo@cluster0.zohw2.mongodb.net/Form"

mongoose.connect(mongoDBURL , {useUnifiedTopology:true , useNewUrlParser:true})
var dbconnect = mongoose.connection

dbconnect.on('error' , ()=>{
    console.log(`Mongo DB Connection Failed`);
})

dbconnect.on('connected' , ()=>{
    console.log(`Mongo DB Connection Successfull`);
})

//crete a data schema

const FormSchema = {
    name:String,
    email:String,
    phone:Number
}




const Form= new mongoose.model("Form", FormSchema);

app.use(express.static(path.resolve(__dirname, 'public')));



app.get("/",function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/",function(req,res){
    let newForm = new Form({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.Number

    });
    newForm.save();
    res.redirect('/');
})

app.listen(8000,function(){
    console.log("server is running on 8000");
})