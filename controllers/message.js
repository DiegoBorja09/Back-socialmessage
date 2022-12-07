const { endpointResponse } = require("../helpers/success");
const createHttpError = require("http-errors");
const {message,user} = require("../models");
const { catchAsync } = require("../helpers/catchAsync");


module.exports={

create:catchAsync(async (req, res, next) =>{

    const { title, contents,iduser } = req.body
    
    try {

        const result= await user.findOne({
            where: {
                id:iduser
            },
           
        })
        if(!result){
            const httpError = createHttpError(
                statusCode = 400,
                `[Error creating user] - [message - create]: unregistered user Id ${iduser} `,
            )
            next(httpError)
        }
       
        const response = await message.create({
            title: title,
            contents: contents,
            iduser: iduser,
        })
        endpointResponse({
            res,
            message: 'message created successfully',
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

get: catchAsync(async (req, res, next) =>{
    try {
        const result = await message.findAll({
            attributes: ['id','title', 'contents','iduser','createdAt']
        })
        endpointResponse({
            res,
            message: 'list the user successfully',
            body:result,
        })
    } catch (error) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error creating user] - [Users - create]: ${error.message} `,
        )
        next(httpError)
    }
}),

 update:catchAsync(async (req, res, next) => {

    const { title, contents,id } = req.body
    try {
        const datanew = message.update({
            title: title,
            contents:contents,
        },{
        where: {
                id:id
            }
        })
        endpointResponse({
            res,
            message: 'message update successfully',
            body:datanew,
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