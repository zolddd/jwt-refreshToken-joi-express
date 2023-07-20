import jwt  from "jsonwebtoken";

const auth=(req,res,next)=>{

    const token=req.header("x-access-token")
    if(!token){
        return res.status(403).json({error:true,message:"Access token provided"})
    }

    try {
        const tokenDetails=jwt.verify(token,process.env.ACCESS_TOKEN_PRIVATE_KEY);
        req.user=tokenDetails
        next();
    } catch (error) {
        res.status(403).json({error:true,message:"Invalid token"});
    }
}

export default auth;