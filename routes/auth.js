import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"
import { signUpBodyValidation,loginBodyValidation } from "../utils/validationSchema.js";
import genertateTokens from "../utils/generateToke.js";

const router=Router();
router.post("/signUp",async(req,res)=>{
    try {
        const {error}=signUpBodyValidation(req.body);
        if(error)
        return res.status(400).json({error: error,message:error.details[0].message});

        const user=await User.findOne({email:req.body.email});
        const salt= await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword= await bcrypt.hash(req.body.password,salt);
        await new User({ ...req.body, password: hashPassword }).save();

        res.status(201).json({error:false,message:"Acount created succesfuly!"});
        

    } catch (error) {
        console.log(error);
		res.status(500).json({ error: true, message: "Internal Server Error!!!" });
    }
});

router.post("/login",async(req, res) => {
    try {
        const {error}=loginBodyValidation(req.body);
        if(error)
        return res.status(400).json({error: error,message:error.details[0].message});

        const user=await User.findOne({email:req.body.email});

        if(!user)
        return res.status(401).json({error:true,message:"Invalid email or password"});

        const verifiedPassword= await bcrypt.compare(req.body.password,user.password);
        if(!verifiedPassword) return res.status(401).json({error:true,message:"Invalid email or password"});

       //genrando accesso y refresh token
       const {accessToken,refreshToken}=await genertateTokens(user);
      res.status(200).json({
        error:false,
        accessToken,
        refreshToken,
        message:"Logged in successfully"
      });


    } catch (error) {
        console.log(error);
		res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

export default router;

