const { endpointResponse } = require("../helpers/success");
const createHttpError = require("http-errors");
const {user} = require("../models");
const { jwtcreate } = require("../middleware/tokens");
const { catchAsync } = require("../helpers/catchAsync");
const { encrypt, compare} = require("../middleware/encrypt");




module.exports={
    
    login:catchAsync(async (req, res, next) =>{
        try {
            const {email,password} = req.body

            const usuario = await user.findOne({
                where: {
                    email: email
                }
            })
           
            if(!usuario){
                return res.status(400).json({
                    code : 400,
                    message: `[Error Login user] - [Users - Login]: the user does not exist in the database ${email} `,}
                )
                next(httpError)
            }
            const result = await compare(password,usuario.password)
            if(!result){
                return res.status(400).json({
                    code :400,
                    message:`[Error Login user] - [Users - Login]: Password is incorrect `,}
                )
                
            }
            const userData = {
                id:usuario.id,
                firstName:usuario.name,
                fullname:usuario.fullname,
                email:usuario.email
            }

            const login = await jwtcreate(userData)
            return res.json({message: 'Login successfully',userData,token:login.token})
                
           
        } catch (error) {
            return res.status(400).json({
                code:error.statusCode,
                message:`[Error Login user] - [Users - Login]: ${error.message} `,}
            )
           
        }
       
    }),

signup: catchAsync(async (req, res, next) => {
    const { name, fullname, email } = req.body
    
    try {
        const usuario = await user.findOne({
            where: {
                email: email
            }
        })
       
        if (usuario) {
            const httpError = createHttpError(
                statusCode = 400,
                `[Error creating user] - [Users - create]: There is already a user with that email ${email} `,
            )
            next(httpError)


        }
       
        const password = await encrypt(req.body.password)
        const response = await user.create({
            name: name,
            fullname: fullname,
            email: email,
            password: password

        })
        endpointResponse({
            res,
            message: 'user created successfully',
            body: response,
        })


    } catch (error) {

        const httpError = createHttpError(
            error.statusCode,
            `[Error creating user] - [Users - create]: ${error.message} `,
        )
        next(httpError)


    }
}),

}
