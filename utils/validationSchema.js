import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
export const signUpBodyValidation=(body)=>{
    const schema=Joi.object({
        userName:Joi.string().required().label("User Name"),
        email:Joi.string().email().required().label("Email"),
        password:passwordComplexity().required().label("Password"),
    })
    return schema.validate(body)
}

export const loginBodyValidation=(body)=>{
    const schema=Joi.object({
        email:Joi.string().email().required().label("Email"),
        password:passwordComplexity().required().label("Password"),
    })
    return schema.validate(body)

}

export const refreshTokenValidation=(body)=>{
    const schema=Joi.object({
        refreshToken:Joi.string().required().label("refresh Token"),
       
    })
    return schema.validate(body)
}