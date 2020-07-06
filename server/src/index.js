const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const config = require('./config/key');

const {User} = require('./models/user');

const {auth} = require('./middleware/auth');

const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        cb(null,file.filename)
    }
})



const upload = multer({storage:storage})

app.use(cors());


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());



mongoose.connect(config.mongoURI,{useUnifiedTopology:true, useNewUrlParser:true,useFindAndModify:false,useCreateIndex: true }).then( ()=>
console.log('DBconnected')).catch(err => console.err)



app.post('/addcar',upload.single('CarImage'),(req, res) => {
    console.log(req.file)
    res.json(req.file)


})



app.get('/',(req,res)=>{
    res.json({"hello":"I'm happy to deploy our app!!"})

})

app.get('/api/user/auth', auth , (req,res) => {

   
    res.status(200).json({
        _id:req._id,
        isAuth:true,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname,
        role:req.user.role

    })

})

app.post('/api/user/register',(req,res)=>{
    const user = new User(req.body)
    user.save((err,doc) => {
        if(err) return res.json({success:false,err})
        return res.status(200).json({success:true,userData:doc})
    })
    
})

app.post('/api/user/login',(req,res)=>{

User.findOne({email:req.body.email},(err,user)=>{
    if (!user){ 
    return res.json(
        {loginSuccess:false,
        message:"Auth failed, email not found"}
        )
    }
    else{
    let match = true;
    user.comparePassword(req.body.password, (err,isMatch)=> {
        
        if(err){
            console.log(err)
        }

        if (!isMatch){
            match = false
            return res.json({loginSuccess:false,message:"wrong pasword"})
            
        }

        
            
        })
    setTimeout(()=>{    
    if (match){    
    user.generateToken((err,user)=>{
        // if (err) return res.status(400).send(err)
        if (err) console.log(err)
        res.cookie('oneAuth',user.token)
           .status(200)
           .json({
               loginSuccess:true
           })
    })
}
    },3000)
    
}
}

 )
 
})

app.get('/api/user/logout',auth,(req,res)=>{
    User.findOneAndUpdate({_id:req.user._id},{token:''},(err,doc)=>{
        if (err) return res.json({success:false,err})
        res.status(200).send({success:true})
    })
})





app.get('/api/user/users',(req,res)=>{

    User.find({},{role:0}).then(
        doc => res.json({success:true,users:doc})
    )
    
})

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`server is up and running at ${port}`)
})