const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');




 const userSchema = mongoose.Schema({
     name:{
         type:String,
         maxlength:50
     },
     email:{
         type:String,
         trim:true,
         unique:1
     },
     password:{
         type:String,
         minlength:5
     },
     lastname:{
         type:String,
         maxlength:50
     },
     role:{
         type:Number,
         default:0
     },
     token:{
         type:String,

     },
     tokenExp:{
         type:Number
     },
     cars:[
        {
            id_image:String,
            id:Number,
            brand:String,
            state:String,
            comments:String,
            CarParts:[],
            price:Number,
            progress:{
               type:Number,
               default:0
           }
        
            
        }
     ]
 })

userSchema.pre('save',function(next){
    var user = this;
    console.log(user)
    if (user.isModified('password')){
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();

        })
    })}else{
        next();
    }
})
userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) {return cb(err);
        }else{
        return cb(null,isMatch)
        }

    })


}

userSchema.methods.generateToken = function(cb){

    var user = this;
    var token = jwt.sign(user._id.toHexString(),'secret');
    user.token = token
    user.save(function(err,user){
        if(err) return cb(err)
        return cb(null,user)
    })
}



// userSchema.methods.FindUsers = function(username, callback) {
//     Blog.find().where("name", username).
//           exec(function(err, users) {
//              // docs contains an array of MongooseJS Documents
//              // so you can return that...
//              // reverse does an in-place modification, so there's no reason
//              // to assign to something else ...
             
//              callback(err,users);
//           });
// };

userSchema.statics.findByToken = function(token,cb){
    var user = this;
    jwt.verify(token,'secret',function(err, decoded) {
        user.findOne({"_id":decoded,"token":token},function(err,user){
            if(err) return cb(err)
            cb(null,user)
        })
      })
}




const User = mongoose.model('User',userSchema)

 module.exports= {User}