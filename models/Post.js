const {connection,Schema} = require('mongoose')




const PostSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"users"

         },

         text:{
             type:String
           
         },

name:{
    type:String,
    
},
avatar:{
    type:String,
   
},


         comment:[{
            user:{
                type:Schema.Types.ObjectId,
                ref:"users"
        
                 },
        
                 text:{
                     type:String,
                     
                 }
         }],

   likes:[
       {
        user:{
            type:Schema.Types.ObjectId,
            ref:"users"
    
             }
    
           
       }
   ]


})


const post = connection.model('post',PostSchema)

module.exports = post