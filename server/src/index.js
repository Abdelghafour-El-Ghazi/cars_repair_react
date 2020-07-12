const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');

const config = require('./config/key');

const {User} = require('./models/user');

const {auth} = require('./middleware/auth');

const multer = require('multer')

let gfs

// const storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'../client/src/components/static/images')
//     },
//     filename:function(req,file,cb){
        
//         cb(null,file.originalname)
//     }
// })

// const fileFilter = (req,file,cb)=>{

//     if(file.mimetype==='image/jpeg' || file.mimetype === 'image/png'){
//         cb(null,true)
//     }else{
//         cb(null,false)
//     }

// }



// const upload = multer({
//    storage:storage,
//    limits:{
//        fileSize:1024 * 1024 * 5

// },
//     fileFilter:fileFilter
// })

app.use(cors());


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());



const conn = mongoose.connect(config.mongoURI,{useUnifiedTopology:true, useNewUrlParser:true,useFindAndModify:false,useCreateIndex: true }).then( ()=> {
console.log('DBconnected')


gfs = Grid(conn.users, mongoose.mongo);

gfs.collection('uploads');
console.log(gfs)

}
).catch(err => console.err)


const storage = new GridFsStorage({
    url: config.mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });


  const upload = multer({ storage });




// conn.once('open', function () {
//   const gfs = Grid(conn.users, mongoose.mongo);

//   // all set!
// })



app.post('/api/user/addcar',upload.single('CarImage'),(req,res) => {
    // console.log(req.id)
    // User.update({_id:req.id},{$push:{cars:[{image:req.file.path}]}})
    const id_image = req.file.id
    const id = req.body.id
    const brand = req.body.brand
    const state = req.body.state
    const comments = req.body.comments
    const parts = req.body.parts
    const price = req.body.additionalPrice
    console.log(req.body.user_id)
    

    User.update({_id:req.body.user_id},{$push:{cars:
        {
            id_image:id_image,
            id:id,
            brand:brand,
            state:state,
            comments:comments,
            CarParts:parts,
            price:price
        }}},{ upsert: true }).then(
        doc => console.log(doc)
    )
    

    // User.findById({_id:req.body.user_id}).update({$push:{cars:{something:'something'}}})


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
               ,userId: user._id,
               message:"Connected"
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


app.get('/api/user/users/:id',(req,res)=>{

    

    // User.findById(req.params.id).then(
    //     doc => {
    //         res.json({success:true,user:doc})
    //         gfs.files.find().toArray((err,files)=> {
    //             if (!file || file.length === 0) {
    //                 return res.status(404).json({
    //                   err: 'No file exists',
    //                 })
    //               }
    //             return   res.json({success:true,user:{doc,files}})

    //         })
    //         return

    //     }
    // )

    // gfs.files.find().toArray((err,files)=> {
    //     if (!file || file.length === 0) {
    //         return res.status(404).json({
    //           err: 'No file exists',
    //         })
    //       }
    //     return   res.json({success:true,user:{doc,files}})

    // })

    console.log('okay')
    
})


app.get('/api/user/delete/:id',(req,res)=>{
    console.log(req.params.id)
    User.deleteOne({_id:req.params.id}).then(doc => console.log(doc))
}
)

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`server is up and running at ${port}`)
})