const { checkSchema } = require("express-validator");
const { ValidationResult } = require("../helpers/validate");


const validateCreate = [
    checkSchema({
        name: {
            in: ['body'],
            exists: { errorMessage: 'name is required' },
        }
    }),
    checkSchema({
        fullname: {
            in: ['body'],
            exists: { errorMessage: 'fullname is required' },               
        }
    }),
    checkSchema({
        email: {
            in: ['body'],
            exists: { errorMessage: 'email is required' },                            
            isEmail:{ errorMessage: 'Dijite un email valido' },                            
        }
    }),
    checkSchema({
        password: {
            in: ['body'],
            exists: { errorMessage: 'password is required' },                           
        }
    }),
    (req, res, next) => {
        ValidationResult(req, res, next)
    }
];

const validatemessage = [
    checkSchema({
        title: {
            in: ['body'],
            exists: { errorMessage: 'title is required' },                         
        }
    }),
    checkSchema({
        contents: {
            in: ['body'],
            exists: { errorMessage: 'contents is required'},                         
        }
    }),
    checkSchema({
        iduser: {
            in: ['body'],
            exists: { errorMessage: 'iduser is required' },                                      
        }
    }),

    (req, res, next) => {
        ValidationResult(req, res, next)
    }
];


module.exports = { validateCreate, validatemessage }