import { Schema,model } from "mongoose";
const userSchema= new Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true, //requerido
        unique: true,  //unico
    },
    password:{
        type:String,
        required:true,
    },
    roles:{
        type:[String],
        enum:["user","admin","super_admin"],
        default:["user"],
    }
})

const User= model("User",userSchema)
export default User;