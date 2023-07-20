import UserToken from "../models/UserToken.js";
import jwt  from "jsonwebtoken";

const verifyRefreshToken=(refreshToken)=>{
 const privateKey=process.env.REFRESH_TOKEN_PRIVATE_KEY

 return new Promise((resolve,reject)=>{
   UserToken.findOne({token:refreshToken},(error,doc)=>{
    if(!doc) return reject({error:true, message:"Invalid refresh token"})
  
    jwt.verify(refreshToken,privateKey,(error,tokenDetails)=>{
        if(error) return reject({error:true, message:"Invalid refresh token"});
        resolve({
            tokenDetails,
            error:false,
            message:"valid refresh token"
        })
    });


   })
 })
}
export default verifyRefreshToken;