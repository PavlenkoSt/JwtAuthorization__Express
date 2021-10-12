const userService = require('../services/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
    async registration (req, res, next) {
        try{
            const errors = validationResult(req);

            if (errors) {
                throw ApiError.badRequest('Ошибка при валидации', errors);
            }

            const { email, password } = req.body;

            const userData = await userService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.json(userData);
        }catch(e){
            next(e);
        }
    }

    async login (req, res, next) {
        try{
            const errors = validationResult(req);
            
            if (errors) {
                throw ApiError.badRequest('Ошибка при валидации', errors);
            }
            
            const { email, password } = req.body;
            const userData = await userService.login(email, password);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.json(userData);
        }catch(e){
            next(e);
        }
    }
    
    logout (req, res, next) {
        try{

        }catch(e){
            next(e);
        }
    }

    refresh (req, res, next) {
        try{

        }catch(e){
            next(e);
        }
    }

    getUsers (req, res, next) {
        try{

        }catch(e){
            next(e);
        }
    }

}

module.exports = new UserController()