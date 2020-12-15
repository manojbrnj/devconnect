const {connection,Schema} = require('mongoose')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const profileSchema = new Schema({

user:{
    type:Schema.Types.ObjectId,
    ref:"users"
},
handle:{
    type:String,required:true,max:40
},
company:{
    type:String,

},
website:{
    type:String
},
location:{
    type:String
},
status:{
    type:String
},
skills:{
    type:[String]
},
bio:{
    type:String
},
gitusername:{
    type:String
},
experience:[{

    title:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    from:{
        type:Date,
        required:true
        },
    to:{
        type:Date,
        required:true
    },
    current:{
        type:Boolean,default:false
    },
    description:{
        type:String,
        required:true
    }
}
],
education:[{

    school:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    fieldofstudy:{
        type:String,
        required:true
    },
    from:{
        type:Date,
        required:true
        },
    to:{
        type:Date,
        required:true
    },
    current:{
        type:Boolean,default:false
    },
    description:{
        type:String,
        required:true
    }
}
],
social:{
    youtube:{
        type:String,
       
    },
    twitter:{
type:String
    },
    linkdin:{
        type:String,
        
    },
    instagram:{
        type:String,
       
    },
    facebook:{
        type:String,
       
    },
},
date:{
    type:Date,
    default:Date.now()
}
    


})


const Profile = connection.model('profile',profileSchema)

module.exports = Profile